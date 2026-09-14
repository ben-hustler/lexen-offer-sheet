"""Local dev harness for the printout-offer Lambda's PDF renderer.

Renders sample_payload.json straight through render.render_offer() — no AWS,
no Lambda, no deploy. Re-run after every render.py edit to see the change.

Usage:
    python dev/render_local.py                      # uses sample_payload.json
    python dev/render_local.py my_payload.json       # or a payload of your own
    python dev/render_local.py --no-open             # skip auto-opening the PDF

Requires: pip install -r ../requirements.txt  (reportlab, Pillow)
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from render import render_offer  # noqa: E402

DEV_DIR = os.path.dirname(os.path.abspath(__file__))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    auto_open = "--no-open" not in sys.argv

    payload_path = args[0] if args else os.path.join(DEV_DIR, "sample_payload.json")
    with open(payload_path, "r", encoding="utf-8") as f:
        payload = json.load(f)

    pdf_bytes = render_offer(
        payload,
        preview_logo=False,
        preview_photos=True,
        font_roboto=False,
        font_size_delta=0,
        photos_per_row=payload.get("_photos_per_row", 3),
        section_order=payload.get("section_order"),
        watermark=False,
    )

    out_path = os.path.join(DEV_DIR, "output.pdf")
    with open(out_path, "wb") as f:
        f.write(pdf_bytes)

    print(f"Wrote {out_path} ({len(pdf_bytes):,} bytes)")

    if auto_open:
        if sys.platform == "win32":
            os.startfile(out_path)
        elif sys.platform == "darwin":
            os.system(f'open "{out_path}"')
        else:
            os.system(f'xdg-open "{out_path}"')


if __name__ == "__main__":
    main()
