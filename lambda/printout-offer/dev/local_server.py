"""Local HTTP stand-in for the printout-offer Lambda + API Gateway.

Wraps index.handler() (the real Lambda entry point) behind a plain HTTP
server, so the web component (lxn-pdf-generator, `npm run dev`) can hit a
local endpoint instead of the deployed AWS stack. Gives you the full loop:
customizer UI -> fetch() -> this server -> index.handler() -> render.py ->
PDF back in the actual iframe preview.

Usage:
    python dev/local_server.py [port]     # default port 8787

Then, in the dev harness (index.html running via `npm run dev`), set
"API Base URL" to http://localhost:<port> — it defaults there already.

Requires: pip install -r ../requirements.txt boto3   (render deps + boto3,
since index.py constructs an S3 client at import time — unused for payloads
that only reference "placeholder" photos / no logo_url, as in the sample).
"""

import base64
import json
import os
import sys
import traceback
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import index  # noqa: E402 - the real Lambda handler module (index.py)

# Python buffers stdout when it isn't a real terminal (e.g. piped to a log file) —
# force line buffering so request logs show up as they happen, not just at exit.
sys.stdout.reconfigure(line_buffering=True)

DEFAULT_PORT = 8787


class Handler(BaseHTTPRequestHandler):
    def _send(self, status, headers, body_bytes):
        self.send_response(status)
        for k, v in headers.items():
            self.send_header(k, v)
        self.send_header("Content-Length", str(len(body_bytes)))
        self.end_headers()
        self.wfile.write(body_bytes)

    def do_OPTIONS(self):
        # CORS preflight — the dev harness runs on a different origin (vite's
        # localhost:5173) than this server, and a JSON POST body forces one.
        self._send(204, index.CORS_HEADERS, b"")

    def do_POST(self):
        if self.path.split("?")[0].rstrip("/") != "/printout-offer":
            body = json.dumps({"error": "not found"}).encode("utf-8")
            self._send(404, {**index.CORS_HEADERS, "Content-Type": "application/json"}, body)
            return

        length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(length).decode("utf-8") if length else "{}"
        event = {"body": raw_body}

        try:
            result = index.handler(event, None)
        except Exception as e:
            traceback.print_exc()
            body = json.dumps({"error": str(e)}).encode("utf-8")
            self._send(500, {**index.CORS_HEADERS, "Content-Type": "application/json"}, body)
            return

        status = result.get("statusCode", 200)
        headers = dict(result.get("headers") or {})
        raw = result.get("body") or ""
        body_bytes = base64.b64decode(raw) if result.get("isBase64Encoded") else raw.encode("utf-8")

        print(f"POST /printout-offer -> {status} ({len(body_bytes):,} bytes)")
        self._send(status, headers, body_bytes)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"printout-offer local server: http://127.0.0.1:{port}")
    print("Point the dev harness's API Base URL at that (apiMode is set to 'binary' there already).")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
