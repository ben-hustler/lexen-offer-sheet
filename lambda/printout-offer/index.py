import json
import base64
import urllib.request
import urllib.parse
import boto3

from render import render_offer

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
}

s3_client = boto3.client('s3')


def _fix_urls(obj):
    if isinstance(obj, dict):
        return {k: _fix_urls(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_fix_urls(item) for item in obj]
    if isinstance(obj, str) and obj.startswith("//"):
        return "https:" + obj
    return obj


def _is_plain_s3_url(url):
    if not isinstance(url, str):
        return False
    try:
        parsed = urllib.parse.urlparse(url)
        return '.s3.' in parsed.netloc and 'X-Amz-Signature' not in parsed.query
    except Exception:
        return False


def _s3_fetch_to_tmp(url, idx):
    parsed = urllib.parse.urlparse(url)
    bucket = parsed.netloc.split('.s3.')[0]
    key = urllib.parse.unquote(parsed.path.lstrip('/'))
    ext = '.png' if parsed.path.lower().endswith('.png') else '.jpg'
    tmp_path = f'/tmp/img_{idx}{ext}'
    s3_client.download_file(bucket, key, tmp_path)
    return tmp_path


def _prefetch_s3_images(payload):
    """Replace plain S3 URLs anywhere in the payload with /tmp/ local paths."""
    counter = [0]

    def _walk(obj):
        if isinstance(obj, dict):
            return {k: _walk(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [_walk(item) for item in obj]
        if _is_plain_s3_url(obj):
            counter[0] += 1
            try:
                return _s3_fetch_to_tmp(obj, counter[0])
            except Exception:
                return obj
        return obj

    return _walk(payload)


def _prefetch_logo(payload):
    """Fetch non-S3 logo URLs (e.g. Bubble CDN) to /tmp/."""
    dealer = payload.get("dealer", {})
    logo_url = dealer.get("logo_url", "")
    if not logo_url or not logo_url.startswith(("http://", "https://")):
        return payload, None
    try:
        req = urllib.request.Request(logo_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=2) as resp:
            data = resp.read()
            content_type = resp.headers.get("Content-Type", "")
        ext = ".png" if "png" in content_type else ".jpg"
        tmp_path = "/tmp/dealer_logo" + ext
        with open(tmp_path, "wb") as f:
            f.write(data)
        return {**payload, "dealer": {**dealer, "logo_url": tmp_path}}, None
    except Exception as e:
        return {**payload, "dealer": {**dealer, "logo_url": ""}}, str(e)


def handler(event, context):
    try:
        body = json.loads(event.get("body") or "{}")

        raw_payload = body.get("raw_payload")
        if not raw_payload:
            return {
                "statusCode": 400,
                "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
                "body": json.dumps({"error": "No payload specified"}),
            }

        display = body.get("display")
        if display:
            raw_payload["display"] = display

        raw_payload = _fix_urls(raw_payload)
        raw_payload = _prefetch_s3_images(raw_payload)
        raw_payload, logo_error = _prefetch_logo(raw_payload)

        pdf_bytes = render_offer(
            raw_payload,
            preview_logo=bool(body.get("preview_logo", False)),
            preview_photos=bool(body.get("preview_photos", False)),
            font_roboto=bool(body.get("font_roboto", False)),
            font_size_delta=int(body.get("font_size_delta", 0)),
            photos_per_row=int(body.get("photos_per_row", 3)),
            section_order=body.get("section_order") or None,
            watermark=bool(body.get("watermark", False)),
        )

        response_headers = {**CORS_HEADERS, "Content-Type": "application/pdf"}
        if logo_error:
            response_headers["X-Logo-Error"] = logo_error[:200]

        return {
            "statusCode": 200,
            "headers": response_headers,
            "body": base64.b64encode(pdf_bytes).decode("utf-8"),
            "isBase64Encoded": True,
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)}),
        }
