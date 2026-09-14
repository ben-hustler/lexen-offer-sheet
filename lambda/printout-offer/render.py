"""Offer sheet PDF renderer.

Uses ReportLab Platypus flowables so page breaks and spacing recompute
automatically when sections are hidden via the display block.
"""

import io
import os
import urllib.request
from datetime import datetime

from reportlab.lib import colors
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas as _rl_canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    HRFlowable,
    Image,
    KeepTogether,
    PageTemplate,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

# ---------------------------------------------------------------------------
# Colors (matched from Offer_Rachel_Customer reference PDF)
# ---------------------------------------------------------------------------
ACCENT_RED = HexColor("#E53935")
ACCENT_GREEN = HexColor("#35BB9C")
TEAL = HexColor("#26A69A")
TEXT_DARK = HexColor("#333333")
TEXT_GREY = HexColor("#999999")
TEXT_MID = HexColor("#666666")
DIVIDER = HexColor("#DDDDDD")
HEADER_BG = HexColor("#F0F0F0")
PLACEHOLDER_BG = HexColor("#E0E0E0")

# ---------------------------------------------------------------------------
# Font registration
# ---------------------------------------------------------------------------
_ROBOTO_AVAILABLE = False
try:
    _roboto_dir = os.path.expanduser("~/Library/Fonts")
    pdfmetrics.registerFont(TTFont("Roboto", os.path.join(_roboto_dir, "Roboto-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("Roboto-Bold", os.path.join(_roboto_dir, "Roboto-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Roboto-Italic", os.path.join(_roboto_dir, "Roboto-Italic.ttf")))
    pdfmetrics.registerFontFamily("Roboto", normal="Roboto", bold="Roboto-Bold", italic="Roboto-Italic")
    _ROBOTO_AVAILABLE = True
except Exception:
    pass

# Active font — swapped at render time when Roboto is requested
_FONT = "Helvetica"
_FONT_BOLD = "Helvetica-Bold"

# ---------------------------------------------------------------------------
# Page geometry
# ---------------------------------------------------------------------------
PAGE_W, PAGE_H = letter  # 612 x 792
MARGIN_LR = 54   # 0.75 in
MARGIN_TB = 42   # 0.58 in
MARGIN_B  = 64   # 0.89 in — extra bottom clearance for page numbers
CONTENT_W = PAGE_W - 2 * MARGIN_LR  # 504 pt

# ---------------------------------------------------------------------------
# Paragraph styles
# ---------------------------------------------------------------------------
_base = getSampleStyleSheet()

STYLE_OFFER_AMOUNT = ParagraphStyle(
    "OfferAmount",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=28,
    leading=34,
    textColor=black,
)

STYLE_VEHICLE = ParagraphStyle(
    "Vehicle",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=15,
    leading=19,
    textColor=TEXT_MID,
)

STYLE_VALIDITY = ParagraphStyle(
    "Validity",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=10,
    leading=14,
    textColor=ACCENT_RED,
)

STYLE_HEADER_DETAIL = ParagraphStyle(
    "HeaderDetail",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=9,
    leading=13,
    textColor=TEXT_GREY,
)

STYLE_DEALER_NAME = ParagraphStyle(
    "DealerName",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=13,
    textColor=black,
    alignment=TA_RIGHT,
)

STYLE_DEALER_INFO = ParagraphStyle(
    "DealerInfo",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=9,
    leading=12,
    textColor=TEXT_DARK,
    alignment=TA_RIGHT,
)

STYLE_SECTION_HEADER = ParagraphStyle(
    "SectionHeader",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=14,
    leading=18,
    textColor=black,
    spaceBefore=16,
    spaceAfter=6,
    alignment=TA_LEFT,
)

STYLE_SUB_HEADER = ParagraphStyle(
    "SubHeader",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=11,
    leading=14,
    textColor=TEAL,
    spaceAfter=4,
    alignment=TA_LEFT,
)

STYLE_LABEL = ParagraphStyle(
    "Label",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=12,
    textColor=black,
)

STYLE_VALUE = ParagraphStyle(
    "Value",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=9,
    leading=12,
    textColor=TEXT_DARK,
)

STYLE_VALUE_RIGHT = ParagraphStyle(
    "ValueRight",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=9,
    leading=12,
    textColor=TEXT_DARK,
    alignment=TA_RIGHT,
)

STYLE_BOLD_RIGHT = ParagraphStyle(
    "BoldRight",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=12,
    textColor=black,
    alignment=TA_RIGHT,
)

STYLE_SMALL = ParagraphStyle(
    "Small",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=8,
    leading=10,
    textColor=TEXT_GREY,
)

STYLE_SMALL_BOLD = ParagraphStyle(
    "SmallBold",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8,
    leading=10,
    textColor=TEXT_DARK,
)

STYLE_FOOTNOTE = ParagraphStyle(
    "Footnote",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=8,
    leading=10,
    textColor=TEXT_MID,
    spaceBefore=8,
)

STYLE_SUBTITLE = ParagraphStyle(
    "Subtitle",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=9,
    leading=12,
    textColor=TEXT_GREY,
)

STYLE_FOOTER = ParagraphStyle(
    "Footer",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=9,
    leading=13,
    textColor=TEXT_DARK,
    spaceBefore=12,
)

STYLE_TABLE_HEADER = ParagraphStyle(
    "TableHeader",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=12,
    textColor=black,
)

STYLE_TABLE_HEADER_RIGHT = ParagraphStyle(
    "TableHeaderRight",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=12,
    textColor=black,
    alignment=TA_RIGHT,
)

STYLE_PHOTO_LABEL = ParagraphStyle(
    "PhotoLabel",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=12,
    textColor=black,
)

STYLE_PHOTO_CAPTION = ParagraphStyle(
    "PhotoCaption",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=8,
    leading=10,
    textColor=TEXT_GREY,
)

STYLE_STAT_VALUE = ParagraphStyle(
    "StatValue",
    parent=_base["Normal"],
    fontName="Helvetica-Bold",
    fontSize=16,
    leading=20,
    textColor=TEXT_DARK,
    alignment=TA_CENTER,
)

STYLE_STAT_LABEL = ParagraphStyle(
    "StatLabel",
    parent=_base["Normal"],
    fontName="Helvetica",
    fontSize=8,
    leading=11,
    textColor=TEXT_GREY,
    alignment=TA_CENTER,
)


# ---------------------------------------------------------------------------
# Formatting helpers
# ---------------------------------------------------------------------------

def _fmt_price(amount):
    """23400 -> '$23,400'"""
    if amount is None:
        return ""
    return f"${amount:,.0f}" if isinstance(amount, (int, float)) else str(amount)


def _fmt_km(km):
    """50000 -> '50,000 KM'"""
    if km is None:
        return ""
    return f"{km:,.0f} KM" if isinstance(km, (int, float)) else str(km)


def _fmt_scenario_km(value):
    """Market Scenarios' avgMileage arrives as a raw number (or numeric string),
    unlike the rest of the scenarios block which is pre-formatted by Bubble.
    Coerce to the same '45,913 KM' shape as _fmt_km."""
    if value is None or value == "":
        return ""
    if isinstance(value, (int, float)):
        return _fmt_km(value)
    try:
        return _fmt_km(float(str(value).replace(",", "")))
    except (TypeError, ValueError):
        return str(value)


def _fmt_days(days):
    """63 -> '63 days', 1 -> '1 day', None -> ''"""
    if days is None or days == "":
        return ""
    days = int(days)
    return f"{days} day" if days == 1 else f"{days} days"


def _fmt_date(iso_str):
    """'2026-04-30' -> 'Apr 30, 2026'"""
    if not iso_str:
        return ""
    dt = datetime.strptime(iso_str, "%Y-%m-%d")
    return dt.strftime("%b %d, %Y").replace(" 0", " ")


def _vehicle_desc(v):
    """Build 'YYYY Make Model Trim (Color)' string."""
    parts = [str(v.get("year", "")), v.get("make", ""), v.get("model", "")]
    if v.get("trim"):
        parts.append(v["trim"])
    desc = " ".join(p for p in parts if p)
    if v.get("color"):
        desc += f" ({v['color']})"
    return desc


# ---------------------------------------------------------------------------
# Scenario KPI field definitions — shared by _get_display and _build_scenario_kpi_grid
# ---------------------------------------------------------------------------

# (key, label template, value formatter). "{basis}" in a label is filled with
# the comparison_basis passed to _build_scenario_kpi_grid ("MARKET"/"SELECTED").
SCENARIO_FIELD_DEFS = [
    ("vehicles", "VEHICLES", None),
    ("avgRetail", "AVERAGE RETAIL", None),
    ("avgMileage", "AVERAGE MILEAGE", "km"),
    ("listedDays", "LISTED DAYS", None),
    ("prcMkt", "PRICE TO {basis}", None),
    ("prcMktAdj", "ADJ. PRICE TO {basis}", None),
    ("costMkt", "COST TO {basis}", None),
    ("priceRank", "PRICE RANK", None),
    ("mileageRank", "MILEAGE RANK", None),
    ("perception", "PERCEPTION", None),
    ("retail", "RETAIL", None),
    ("ACV", "ACTUAL CASH VALUE", None),
]


# ---------------------------------------------------------------------------
# Display flag resolution
# ---------------------------------------------------------------------------

def _get_display(p):
    """Extract display flags from payload, defaulting missing keys to True."""
    display = p.get("display") or {}
    val = display.get("valuation") or {}
    sec = display.get("sections") or {}
    gen = display.get("general") or {}
    scn = display.get("scenarios") or {}
    scn_market = scn.get("market") or {}
    scn_selected = scn.get("selected") or {}
    return {
        "valuation": {
            "retail_value": val.get("retail_value", True),
            "recon": val.get("recon", True),
            "fixed_overhead": val.get("fixed_overhead", True),
            "target_profit": val.get("target_profit", True),
            "tax_savings": val.get("tax_savings", True),
        },
        "sections": {
            "valuation": sec.get("valuation", True),
            "disclosures": sec.get("disclosures", True),
            "disclosures_horizontal": sec.get("disclosures_horizontal", True),
            "disclosures_signature": sec.get("disclosures_signature", True),
            "observations": sec.get("observations", True),
            "observations_highlights": sec.get("observations_highlights", True),
            "observations_comments": sec.get("observations_comments", True),
            "market_summary": sec.get("market_summary", True),
            "market_comparables": sec.get("market_comparables", True),
            # New section — default False so records/clients predating it don't suddenly show it.
            "market_scenarios": sec.get("market_scenarios", False),
            "selected_scenarios": sec.get("selected_scenarios", False),
            "recon_breakdown": sec.get("recon_breakdown", True),
            "photos": sec.get("photos", True),
        },
        "general": {
            "offer_label": gen.get("offer_label", True),
            "condition": gen.get("condition", True),
            "value_display": gen.get("value_display", "offer"),
        },
        "scenarios": {
            "market": {key: scn_market.get(key, True) for key, _, _ in SCENARIO_FIELD_DEFS},
            "selected": {key: scn_selected.get(key, True) for key, _, _ in SCENARIO_FIELD_DEFS},
        },
        # "tiles" (KPI grid, default) or "rows" (label/value rows, like Valuation).
        "scenario_layout": display.get("scenario_layout", "tiles"),
    }


# ---------------------------------------------------------------------------
# Custom flowables
# ---------------------------------------------------------------------------

class PhotoPlaceholder(Flowable):
    """Grey rectangle placeholder for unavailable photos."""

    def __init__(self, width, height, label="Photo", radius=2, color=None):
        super().__init__()
        self.width = width
        self.height = height
        self.label = label
        self.radius = radius
        self.color = color or PLACEHOLDER_BG

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 0, self.width, self.height, self.radius, fill=1, stroke=0)
        self.canv.setFillColor(TEXT_GREY)
        self.canv.setFont(_FONT, 8)
        self.canv.drawCentredString(
            self.width / 2, self.height / 2 - 3, self.label
        )


class RoundedImage(Flowable):
    """Image flowable with rounded-corner clipping."""

    def __init__(self, img_buf, width, height, radius=5):
        super().__init__()
        self.width = width
        self.height = height
        self.radius = radius
        self._reader = ImageReader(img_buf)

    def draw(self):
        self.canv.saveState()
        p = self.canv.beginPath()
        p.roundRect(0, 0, self.width, self.height, self.radius)
        self.canv.clipPath(p, stroke=0)
        self.canv.drawImage(self._reader, 0, 0, self.width, self.height)
        self.canv.restoreState()



class _NumberedCanvas(_rl_canvas.Canvas):
    """Defers 'N of M' page numbers until total page count is known."""

    _watermark = False  # set to True via subclass for preview PDFs
    _font_size_delta = 0  # set via subclass to match renderer delta

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            if self._watermark:
                self.saveState()
                self.setFillColor(HexColor("#888888"))
                self.setFillAlpha(0.18)
                self.setFont("Helvetica-Bold", 90)
                self.translate(PAGE_W / 2, PAGE_H / 2)
                self.rotate(45)
                self.drawCentredString(0, 0, "PREVIEW")
                self.restoreState()
            self.setFont(_FONT, 8 + self._font_size_delta)
            self.setFillColor(TEXT_GREY)
            self.drawRightString(
                PAGE_W - MARGIN_LR, MARGIN_TB / 2 + 16,
                f"{self._pageNumber} of {total}",
            )
            super().showPage()
        super().save()


class ColorLine(Flowable):
    """Thin horizontal line with a specific color."""

    def __init__(self, width, color=ACCENT_RED, thickness=2):
        super().__init__()
        self.width = width
        self.height = thickness
        self._color = color
        self._thickness = thickness

    def draw(self):
        self.canv.setStrokeColor(self._color)
        self.canv.setLineWidth(self._thickness)
        self.canv.line(0, 0, self.width, 0)


# ---------------------------------------------------------------------------
# Section builders — each returns a list of Flowable objects
# ---------------------------------------------------------------------------

def _build_header(p):
    """Page 1 header: offer amount, vehicle, validity, dealer block."""
    offer = p["offer"]
    vehicle = p["vehicle"]
    customer = p.get("customer", {})
    dealer = p.get("dealer", {})
    employee = p.get("employee", {})
    disp = _get_display(p)["general"]
    _d = p.get("_font_size_delta", 0)

    # Left column content
    show_label = disp["offer_label"]
    valuation = p.get("valuation") or {}
    ts = valuation.get("tax_savings") or {}
    if disp["value_display"] == "tax_savings" and ts.get("gross_value") is not None:
        display_amount = _fmt_price(ts["gross_value"]) + "*"
    else:
        display_amount = _fmt_price(offer["amount"])
    amount_text = display_amount + (" Offer" if show_label else "")
    vehicle_text = _vehicle_desc(vehicle)

    # Validity badge — light red background, rounded
    badge_style = ParagraphStyle(
        "_validity_badge",
        parent=_base["Normal"],
        fontName="Helvetica",
        fontSize=9 + _d,
        leading=12 + _d,
        textColor=ACCENT_RED,
    )
    badge_text = f"Valid until {_fmt_date(offer['valid_until'])}"
    badge_w = stringWidth(badge_text, "Helvetica", 9 + _d) + 14  # 7px padding each side
    left_col_w = CONTENT_W * 0.60
    badge_tbl = Table(
        [[Paragraph(badge_text, badge_style)]],
        colWidths=[badge_w],
    )
    badge_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (0, 0), HexColor("#FFEBEE")),
        ("ROUNDEDCORNERS", [2, 2, 2, 2]),
        ("LEFTPADDING",   (0, 0), (-1, -1), 7),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 7),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))

    # Amount + badge side by side — size amount col to actual text width
    amount_col_w = stringWidth(amount_text, _FONT_BOLD, 28) + 4
    amount_badge = Table(
        [[Paragraph(amount_text, STYLE_OFFER_AMOUNT), Spacer(6, 1), badge_tbl]],
        colWidths=[amount_col_w, 6, badge_w],
    )
    amount_badge.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "BOTTOM"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    left_content = [
        amount_badge,
        Spacer(1, 2),
        Paragraph(vehicle_text, STYLE_VEHICLE),
        Spacer(1, 4),
    ]

    # Overview detail lines (no labels)
    vin = vehicle.get("vin", "")
    mileage = _fmt_km(vehicle["mileage_km"]) if vehicle.get("mileage_km") is not None else ""
    condition = offer.get("classification") if disp["condition"] else ""
    detail_parts = list(filter(None, [vin, mileage, condition]))
    if detail_parts:
        left_content.append(Paragraph(" · ".join(detail_parts), _adj_style(STYLE_HEADER_DETAIL, _d)))
    if customer.get("name"):
        left_content.append(Paragraph(customer["name"], _adj_style(STYLE_HEADER_DETAIL, _d)))

    # Show tax savings footnote in header when valuation section is hidden but
    # the header amount is displaying tax savings
    valuation = p.get("valuation") or {}
    ts = valuation.get("tax_savings") or {}
    ds_sections = _get_display(p)["sections"]
    valuation_hidden = not ds_sections.get("valuation", True)
    value_display = disp.get("value_display", "offer")
    if valuation_hidden and value_display == "tax_savings" and ts.get("gross_value") is not None:
        left_content.append(Spacer(1, 8))
        left_content.append(Paragraph(
            "* Applies when trading in a vehicle. A trade-in reduces the taxes "
            "on the new purchase by the trade-in value * tax rate.",
            _adj_style(STYLE_FOOTNOTE, _d),
        ))

    left_cell = list(left_content)

    # Right column: logo placeholder + dealer info
    right_parts = []

    # Logo — real image when preview=True, else placeholder
    right_col_w = CONTENT_W * 0.40
    logo_w = 90
    logo_visual = None
    if p.get("_preview_logo", False):
        logo_url = dealer.get("logo_url") or ""
        if logo_url and (os.path.isfile(logo_url) or logo_url.startswith(("http://", "https://"))):
            try:
                buf, logo_h_pt = _load_logo_buf(logo_url, logo_w)
                logo_visual = RoundedImage(buf, logo_w, logo_h_pt, radius=5)
            except Exception:
                pass
    if logo_visual is None:
        logo_visual = PhotoPlaceholder(logo_w, 50, "Logo", radius=5)

    logo_table = Table(
        [[Spacer(right_col_w - logo_w, 1), logo_visual]],
        colWidths=[right_col_w - logo_w, logo_w],
    )
    logo_table.setStyle(TableStyle([
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
    ]))
    right_parts.append(logo_table)
    right_parts.append(Spacer(1, 12))

    # Dealer name and address
    loc_name = dealer.get("location") or dealer.get("name", "")
    right_parts.append(Paragraph(f"<b>{loc_name}</b>", _adj_style(STYLE_DEALER_NAME, _d)))
    addr = dealer.get("address", "")
    for line in addr.split("\n"):
        right_parts.append(Paragraph(line, _adj_style(STYLE_DEALER_INFO, _d)))

    right_parts.append(Spacer(1, 4))

    # Employee
    if employee.get("name"):
        right_parts.append(Paragraph(employee["name"], _adj_style(STYLE_DEALER_INFO, _d)))
    if employee.get("phone"):
        right_parts.append(Paragraph(employee["phone"], _adj_style(STYLE_DEALER_INFO, _d)))

    # Two-column table for header layout
    header_tbl_style = [
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]
    header_table = Table(
        [[left_cell, right_parts]],
        colWidths=[CONTENT_W * 0.60, CONTENT_W * 0.40],
    )
    header_table.setStyle(TableStyle(header_tbl_style))

    return [
        header_table,
        Spacer(1, 12),
        HRFlowable(width="100%", thickness=0.5, color=DIVIDER),
    ]


def _build_appraisal_summary(p):
    """Appraisal Summary: Valuation table."""
    offer = p["offer"]
    valuation = p.get("valuation") or {}
    tp = valuation.get("target_profit") or {}
    ts = valuation.get("tax_savings") or {}

    elements = [
        Paragraph("Valuation", STYLE_SECTION_HEADER),
    ]

    _d = p.get("_font_size_delta", 0)

    # -- Valuation sub-table --
    dv = _get_display(p)["valuation"]
    valuation_hidden = not any(dv.values())

    if not valuation_hidden:
        _lbl = ParagraphStyle("_vl", parent=_base["Normal"], fontName=_FONT_BOLD,
                              fontSize=8 + _d, leading=11 + _d, textColor=black)
        _val = ParagraphStyle("_vv", parent=_base["Normal"], fontName=_FONT,
                              fontSize=8 + _d, leading=11 + _d, textColor=TEXT_DARK, alignment=TA_RIGHT)
        _alt = HexColor("#F8F8F8")
        cw = [CONTENT_W * 0.65, CONTENT_W * 0.35]

        _base_style = [
            ("VALIGN",        (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING",   (0, 0), (-1, -1), 6),
            ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
            ("TOPPADDING",    (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]

        def _row_tbl(label_para, value_para, bg):
            t = Table([[label_para, value_para]], colWidths=cw)
            t.setStyle(TableStyle(_base_style + [
                ("BACKGROUND",     (0, 0), (-1, 0), bg),
                ("ROUNDEDCORNERS", [2, 2, 2, 2]),
            ]))
            return t

        data_rows = []
        if dv["retail_value"] and valuation.get("retail_value") is not None:
            data_rows.append(("Retail Value", valuation["retail_value"]))
        if dv["recon"] and valuation.get("recon_total") is not None:
            data_rows.append(("Recon", valuation["recon_total"]))
        if dv["fixed_overhead"] and valuation.get("fixed_overhead") is not None:
            data_rows.append(("Fixed Overhead", valuation["fixed_overhead"]))
        if dv["target_profit"] and tp.get("amount") is not None:
            data_rows.append((tp.get("label", "Target Profit"), tp["amount"]))
        data_rows.append(("Offer Amount", p["offer"]["amount"]))
        if dv["tax_savings"] and ts.get("amount") is not None:
            rate = ts.get("rate_pct", 0)
            sav = _fmt_price(ts["amount"])
            data_rows.append((f"Tax Savings ({rate:.1f}% = {sav})*", ts.get("gross_value")))

        for i, (label, amount) in enumerate(data_rows):
            bg = _alt if i % 2 == 1 else white
            elements.append(Spacer(1, 3))
            elements.append(_row_tbl(
                Paragraph(label, _lbl),
                Paragraph(_fmt_price(amount), _val),
                bg,
            ))

    # Footnote — shown when tax savings row is visible, or value_display = tax_savings
    value_display = _get_display(p)["general"]["value_display"]
    show_footnote = (
        (not valuation_hidden and dv["tax_savings"] and ts.get("amount") is not None)
        or (value_display == "tax_savings" and ts.get("gross_value") is not None)
    )
    if show_footnote:
        elements.append(Paragraph(
            "* Applies when trading in a vehicle. A trade-in reduces the taxes "
            "on the new purchase by the trade-in value * tax rate.",
            _adj_style(STYLE_FOOTNOTE, _d),
        ))

    return elements


def _build_disclosures(p):
    """Disclosures: Q&A pairs styled like comparables rows. Vertical or horizontal layout."""
    disclosures = p.get("disclosures", [])
    obs = p.get("observations", {})
    claims = obs.get("claims", {})

    if not disclosures and not claims:
        return []

    ds = _get_display(p)["sections"]
    horizontal = ds["disclosures_horizontal"]

    _d = p.get("_font_size_delta", 0)
    _q = ParagraphStyle("_dq", parent=_base["Normal"], fontName="Helvetica-Bold",
                        fontSize=8 + _d, leading=11 + _d, textColor=black)
    _a = ParagraphStyle("_da", parent=_base["Normal"], fontName="Helvetica",
                        fontSize=8 + _d, leading=11 + _d, textColor=TEXT_DARK)
    _a_r = ParagraphStyle("_dar", parent=_a, alignment=TA_RIGHT)

    _alt   = HexColor("#F8F8F8")
    _base_style = [
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]

    half_w = CONTENT_W / 2

    def _row_tbl(items, bg):
        """items: list of cell contents (1 cell for vertical, 2 for horizontal)."""
        cw = [half_w, half_w] if horizontal else [CONTENT_W]
        t = Table([items], colWidths=cw)
        t.setStyle(TableStyle(_base_style + [
            ("BACKGROUND",     (0, 0), (-1, 0), bg),
            ("ROUNDEDCORNERS", [2, 2, 2, 2]),
        ]))
        return t

    # Build all entries (disclosures + claims)
    entries = []
    for d in disclosures:
        entries.append((d["question"], d.get("description", ""), d["answer"]))
    if claims:
        claims_count = claims.get("count", 0)
        claims_amount = claims.get("amount", 0)
        entries.append((f"Claims ({claims_count})", "", _fmt_price(claims_amount)))

    elements = [Paragraph("Disclosures", STYLE_SECTION_HEADER), Spacer(1, 4)]

    for i, (question, description, answer) in enumerate(entries):
        bg = _alt if i % 2 == 1 else white
        if horizontal:
            if description:
                q_para = Paragraph(f'{question}<br/><font face="Helvetica-Oblique">{description}</font>', _q)
            else:
                q_para = Paragraph(question, _q)
            row = [q_para, Paragraph(str(answer), _a_r)]
        else:
            if description:
                text = f'<b>{question}</b><br/><font face="Helvetica-Oblique">{description}</font><br/>{answer}'
            else:
                text = f'<b>{question}</b><br/>{answer}'
            row = [Paragraph(text, _a)]
        elements.append(_row_tbl(row, bg))
        elements.append(Spacer(1, 3))

    return elements


def _build_observations(p):
    """Observations: Highlights, Comments — each individually togglable."""
    obs = p.get("observations", {})
    ds = _get_display(p)["sections"]
    show_highlights = ds["observations_highlights"]
    show_comments = ds["observations_comments"]

    highlights = obs.get("highlights") if show_highlights else None
    comments = obs.get("comments") if show_comments else None

    if not highlights and not comments and not show_highlights and not show_comments:
        return []

    _d = p.get("_font_size_delta", 0)
    _lbl = _adj_style(STYLE_LABEL, _d)
    _val = _adj_style(STYLE_VALUE, _d)
    _none = _adj_style(STYLE_LABEL, _d)  # same style, italic-ish via content

    highlights_text = highlights or ("No highlights" if show_highlights else None)
    comments_text = comments or ("No comments" if show_comments else None)

    first_content = []
    if show_highlights:
        first_content = [Paragraph("<b>Highlights</b>", _lbl), Paragraph(highlights_text, _val)]
    elif show_comments:
        first_content = [Paragraph("<b>Comments</b>", _lbl), Paragraph(comments_text, _val)]

    elements = [KeepTogether([Paragraph("Observations", STYLE_SECTION_HEADER)] + first_content)]

    if show_highlights and show_comments:
        elements.append(Spacer(1, 12))
        elements.append(Paragraph("<b>Comments</b>", _lbl))
        elements.append(Paragraph(comments_text, _val))
        elements.append(Spacer(1, 6))
    elif show_highlights:
        elements.append(Spacer(1, 12))
    elif show_comments:
        elements.append(Spacer(1, 6))

    return elements


def _build_market_summary(p):
    """Market Summary: stats bar — large value + small uppercase label."""
    market = p.get("market", {})
    summary = market.get("summary", {})

    if not summary:
        return []

    _lbl_style = STYLE_STAT_LABEL
    col_w = CONTENT_W / 4
    tbl = Table([[
        [Paragraph(str(summary.get("comparables_count", "")), STYLE_STAT_VALUE),
         Paragraph("VEHICLES", _lbl_style)],
        [Paragraph(f"{round(summary['avg_days'])} Days" if summary.get('avg_days') is not None else "— Days", STYLE_STAT_VALUE),
         Paragraph("AVG LISTED", _lbl_style)],
        [Paragraph(_fmt_km(summary.get("avg_mileage_km")), STYLE_STAT_VALUE),
         Paragraph("AVG MILEAGE", _lbl_style)],
        [Paragraph(_fmt_price(summary.get("avg_price")), STYLE_STAT_VALUE),
         Paragraph("AVG PRICE", _lbl_style)],
    ]], colWidths=[col_w] * 4)
    tbl.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("ALIGN",         (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))

    return [KeepTogether([Paragraph("Market Summary", STYLE_SECTION_HEADER), tbl])]


def _build_scenario_kpi_grid(scenarios, title, field_flags, comparison_basis="MARKET", _d=0, show_footnote=True):
    """KPI grid, 4 tiles per row — large value + small uppercase label, same
    tile style as _build_market_summary. Shared by market and selected
    scenarios blocks.

    field_flags gates each of the 12 fields on/off individually (per-field
    pills in the customizer) — hidden fields are dropped and the remaining
    ones reflow, rather than leaving a gap in a fixed grid.

    comparison_basis names what the price/cost ratios are computed against
    ("MARKET" for the full comparables set, "SELECTED" for the
    salesperson-chosen subset) — the underlying fields (prcMkt, costMkt, ...)
    keep their names either way, only the label changes.
    """
    if not scenarios:
        return []

    def _tile(value, label):
        text = value if value not in (None, "") else "—"
        return [Paragraph(str(text), STYLE_STAT_VALUE), Paragraph(label, STYLE_STAT_LABEL)]

    tiles = []
    for key, label_tpl, fmt in SCENARIO_FIELD_DEFS:
        if not field_flags.get(key, True):
            continue
        label = label_tpl.format(basis=comparison_basis) if "{basis}" in label_tpl else label_tpl
        raw = scenarios.get(key)
        value = _fmt_scenario_km(raw) if fmt == "km" else raw
        # Vehicles count excludes the appraised vehicle itself — flagged with
        # an asterisk, explained in the footnote appended below.
        if key == "vehicles" and value not in (None, ""):
            value = f"{value}*"
        tiles.append(_tile(value, label))

    if not tiles:
        return []

    # Orphan-protected row split: greedily fill rows of `cols`, remainder
    # trails on the last row — except when that remainder is a lone orphan
    # of 1, in which case borrow one tile from the row before it (4+1 -> 3+2).
    # E.g. 9 tiles -> [4, 3, 2], not [4, 4, 1]; 6 tiles stays [4, 2] (no orphan).
    cols = 4
    n = len(tiles)
    num_rows = (n + cols - 1) // cols
    row_sizes = [cols] * num_rows
    row_sizes[-1] = n - cols * (num_rows - 1)
    if row_sizes[-1] == 1 and num_rows > 1:
        row_sizes[-2] -= 1
        row_sizes[-1] += 1

    col_w = CONTENT_W / cols
    row_style = TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("ALIGN",         (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 4),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 4),
        ("TOPPADDING",    (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ])

    row_tables = []
    idx = 0
    for size in row_sizes:
        row_tbl = Table([tiles[idx:idx + size]], colWidths=[col_w] * size)
        row_tbl.setStyle(row_style)
        row_tbl.hAlign = "CENTER"
        row_tables.append(row_tbl)
        idx += size

    elements = [Paragraph(title, STYLE_SECTION_HEADER), *row_tables]
    if field_flags.get("vehicles", True) and show_footnote:
        elements.append(Paragraph(
            "* Number of vehicles being compared, not including your vehicle. "
            "Mileage, price, and perception rankings include your vehicle.",
            _adj_style(STYLE_FOOTNOTE, _d),
        ))

    return [KeepTogether(elements)]


def _build_scenario_rows(scenarios, title, field_flags, comparison_basis="MARKET", _d=0, show_footnote=True):
    """Label/value row layout — same styling as the Valuation table (bold
    label left, value right, alternating row background). Alternative to
    _build_scenario_kpi_grid for the same 12 scenario fields."""
    if not scenarios:
        return []

    _lbl = ParagraphStyle("_scnl", parent=_base["Normal"], fontName=_FONT_BOLD,
                          fontSize=8, leading=11, textColor=black)
    _val = ParagraphStyle("_scnv", parent=_base["Normal"], fontName=_FONT,
                          fontSize=8, leading=11, textColor=TEXT_DARK, alignment=TA_RIGHT)
    _alt = HexColor("#F8F8F8")
    cw = [CONTENT_W * 0.65, CONTENT_W * 0.35]
    row_style = [
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]

    def _row_tbl(label_para, value_para, bg):
        t = Table([[label_para, value_para]], colWidths=cw)
        t.setStyle(TableStyle(row_style + [
            ("BACKGROUND",     (0, 0), (-1, 0), bg),
            ("ROUNDEDCORNERS", [2, 2, 2, 2]),
        ]))
        return t

    elements = [Paragraph(title, STYLE_SECTION_HEADER)]
    idx = 0
    for key, label_tpl, fmt in SCENARIO_FIELD_DEFS:
        if not field_flags.get(key, True):
            continue
        label = label_tpl.format(basis=comparison_basis) if "{basis}" in label_tpl else label_tpl
        raw = scenarios.get(key)
        value = _fmt_scenario_km(raw) if fmt == "km" else raw
        if key == "vehicles" and value not in (None, ""):
            value = f"{value}*"
        text = value if value not in (None, "") else "—"
        bg = _alt if idx % 2 == 1 else white
        elements.append(Spacer(1, 3))
        elements.append(_row_tbl(Paragraph(label, _lbl), Paragraph(str(text), _val), bg))
        idx += 1

    if idx == 0:
        return []

    if field_flags.get("vehicles", True) and show_footnote:
        elements.append(Paragraph(
            "* Number of vehicles being compared, not including your vehicle. "
            "Mileage, price, and perception rankings include your vehicle.",
            _adj_style(STYLE_FOOTNOTE, _d),
        ))

    return [KeepTogether(elements)]


def _build_market_scenarios(p, show_footnote=True):
    """Market Scenarios: KPI grid computed over the full comparables set."""
    scenarios = p.get("scenarios", {}).get("market", {})
    display = _get_display(p)
    field_flags = display["scenarios"]["market"]
    _d = p.get("_font_size_delta", 0)
    if display.get("scenario_layout") == "rows":
        return _build_scenario_rows(scenarios, "Market Scenarios", field_flags, _d=_d, show_footnote=show_footnote)
    return _build_scenario_kpi_grid(scenarios, "Market Scenarios", field_flags, _d=_d, show_footnote=show_footnote)


def _build_selected_scenarios(p):
    """Selected Scenarios: KPI grid computed over the salesperson-selected comparables."""
    scenarios = p.get("scenarios", {}).get("selected", {})
    display = _get_display(p)
    field_flags = display["scenarios"]["selected"]
    _d = p.get("_font_size_delta", 0)
    if display.get("scenario_layout") == "rows":
        return _build_scenario_rows(scenarios, "Selected Scenarios", field_flags, comparison_basis="SELECTED", _d=_d)
    return _build_scenario_kpi_grid(scenarios, "Selected Scenarios", field_flags, comparison_basis="SELECTED", _d=_d)


def _build_market_comparables(p):
    """Market Comparables: full table of comparable vehicles."""
    market = p.get("market", {})
    comps = market.get("comparables", [])
    summary = market.get("summary", {})

    if not comps:
        return []

    count = summary.get("comparables_count", len(comps))

    # Local compact styles
    _d = p.get("_font_size_delta", 0)
    _hdr = ParagraphStyle("_ch", parent=_base["Normal"], fontName="Helvetica-Bold",
                          fontSize=8 + _d, leading=11 + _d, textColor=black)
    _hdr_r = ParagraphStyle("_chr", parent=_hdr, alignment=TA_RIGHT)
    _val = ParagraphStyle("_cv", parent=_base["Normal"], fontName="Helvetica",
                          fontSize=8 + _d, leading=11 + _d, textColor=TEXT_DARK)
    _val_r = ParagraphStyle("_cvr", parent=_val, alignment=TA_RIGHT)
    _avg = ParagraphStyle("_ca", parent=_base["Normal"], fontName="Helvetica-Bold",
                          fontSize=8 + _d, leading=11 + _d, textColor=TEXT_DARK)
    _avg_r = ParagraphStyle("_car", parent=_avg, alignment=TA_RIGHT)

    cw = [CONTENT_W - 62 - 65 - 58, 62, 65, 58]

    _teal  = HEADER_BG
    _alt   = HexColor("#F8F8F8")
    _avgbg = HexColor("#F5F5F5")

    _base_style = [
        ("VALIGN",         (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",    (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",   (0, 0), (-1, -1), 6),
        ("TOPPADDING",     (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING",  (0, 0), (-1, -1), 4),
        ("RIGHTPADDING",   (2, 0), (2, 0),   2),
        ("LEFTPADDING",    (3, 0), (3, 0),   2),
    ]

    def _row_tbl(row_data, bg):
        t = Table([row_data], colWidths=cw)
        t.setStyle(TableStyle(_base_style + [
            ("BACKGROUND",     (0, 0), (-1, 0), bg),
            ("ROUNDEDCORNERS", [2, 2, 2, 2]),
        ]))
        return t

    hdr_tbl = _row_tbl([
        Paragraph("Vehicle",  _hdr),
        Paragraph("Listed",   _hdr_r),
        Paragraph("Mileage",  _hdr_r),
        Paragraph("Price",    _hdr_r),
    ], _teal)

    avg_tbl = _row_tbl([
        Paragraph(f"<b>Avg. of {count}</b>", _avg),
        Paragraph(f"<b>{_fmt_days(round(summary['avg_days'])) if summary.get('avg_days') is not None else '—'}</b>", _avg_r),
        Paragraph(f"<b>{_fmt_km(summary.get('avg_mileage_km'))}</b>", _avg_r),
        Paragraph(f"<b>{_fmt_price(summary.get('avg_price'))}</b>", _avg_r),
    ], _avgbg)

    # Build all data row flowables as [Spacer, tbl] pairs
    row_pairs = []
    for i, comp in enumerate(comps):
        year = comp.get("year", "")
        desc = comp.get("description", "")
        vehicle_html = f"<b>{year} {desc}</b>".strip()
        sub = []
        if comp.get("trim"):
            sub.append(comp["trim"])
        dealer = comp.get("dealer", "")
        distance = comp.get("distance_km")
        if dealer and distance is not None:
            dealer = f"{dealer} ({_fmt_km(distance)} away)"
        meta = " · ".join(filter(None, [comp.get("vin", ""), dealer]))
        if meta:
            sub.append(f"<font color='#{TEXT_GREY.hexval()[2:]}'>{meta}</font>")
        if sub:
            vehicle_html += "<br/>" + "<br/>".join(sub)

        price = comp.get("price")
        row_pairs.append([
            Spacer(1, 3),
            _row_tbl([
                Paragraph(vehicle_html, _val),
                Paragraph(_fmt_days(comp.get("days_on_market")), _val_r),
                Paragraph(_fmt_km(comp.get("mileage_km")), _val_r),
                Paragraph(_fmt_price(price) if price else "—", _val_r),
            ], _alt if i % 2 == 1 else white),
        ])

    n = len(row_pairs)

    # Anchor: header + avg + first data row (all n rows if n <= 2)
    anchor_count = min(n, 1) if n >= 3 else n
    anchor = [
        Paragraph("Market Comparables", STYLE_SECTION_HEADER),
        Spacer(1, 4),
        hdr_tbl,
        Spacer(1, 3),
        avg_tbl,
    ]
    for pair in row_pairs[:anchor_count]:
        anchor.extend(pair)

    elements = [KeepTogether(anchor)]

    if n >= 3:
        # Middle rows flow freely
        for pair in row_pairs[1:-2]:
            elements.extend(pair)
        # Last two rows kept together
        tail = []
        for pair in row_pairs[-2:]:
            tail.extend(pair)
        elements.append(KeepTogether(tail))
    elif n == 2:
        # Both rows already in anchor; nothing left
        pass

    return elements


def _build_recon(p):
    """Recon breakdown: itemized table with total."""
    recon = p.get("recon", {})
    items = recon.get("items", [])
    recon_adjustment = (p.get("valuation") or {}).get("recon_total") or 0

    if not items and not recon_adjustment:
        return []

    items_sum = sum(item.get("amount", 0) for item in items)
    total = items_sum + recon_adjustment

    _d = p.get("_font_size_delta", 0)
    _hdr = ParagraphStyle("_rh",  parent=_base["Normal"], fontName="Helvetica-Bold",
                          fontSize=8 + _d, leading=11 + _d, textColor=black)
    _hdr_r = ParagraphStyle("_rhr", parent=_hdr, alignment=TA_RIGHT)
    _val = ParagraphStyle("_rv",  parent=_base["Normal"], fontName="Helvetica",
                          fontSize=8 + _d, leading=11 + _d, textColor=TEXT_DARK)
    _val_r = ParagraphStyle("_rvr", parent=_val, alignment=TA_RIGHT)
    _tot = ParagraphStyle("_rt",  parent=_base["Normal"], fontName="Helvetica-Bold",
                          fontSize=8 + _d, leading=11 + _d, textColor=TEXT_DARK)
    _tot_r = ParagraphStyle("_rtr", parent=_tot, alignment=TA_RIGHT)

    cw = [CONTENT_W - 100, 100]
    _alt   = HexColor("#F8F8F8")
    _totbg = HexColor("#F5F5F5")

    _base_style = [
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]

    def _row_tbl(row_data, bg):
        t = Table([row_data], colWidths=cw)
        t.setStyle(TableStyle(_base_style + [
            ("BACKGROUND",     (0, 0), (-1, 0), bg),
            ("ROUNDEDCORNERS", [2, 2, 2, 2]),
        ]))
        return t

    col_hdr = _row_tbl([
        Paragraph("Description", _hdr),
        Paragraph("Amount",      _hdr_r),
    ], HEADER_BG)

    row_pairs = []
    for i, item in enumerate(items):
        row_pairs.append([Spacer(1, 3), _row_tbl([
            Paragraph(item.get("description", ""), _val),
            Paragraph(_fmt_price(item.get("amount")), _val_r),
        ], _alt if i % 2 == 1 else white)])

    # Recon Adjustment row (always last item row, before total)
    adj_row_pair = [Spacer(1, 3), _row_tbl([
        Paragraph("Recon Adjustment", _val),
        Paragraph(_fmt_price(recon_adjustment), _val_r),
    ], _alt if len(items) % 2 == 1 else white)]

    total_pair = [Spacer(1, 3), _row_tbl([
        Paragraph("<b>Total</b>", _tot),
        Paragraph(f"<b>{_fmt_price(total)}</b>", _tot_r),
    ], _totbg)]

    all_rows = row_pairs + [adj_row_pair]
    n = len(all_rows)

    if n <= 2:
        anchor = [Paragraph("Recon", STYLE_SECTION_HEADER), col_hdr]
        for pair in all_rows:
            anchor.extend(pair)
        anchor.extend(total_pair)
        return [KeepTogether(anchor)]

    # Anchor: heading + col header + first 2 item rows
    anchor = [Paragraph("Recon", STYLE_SECTION_HEADER), col_hdr]
    for pair in all_rows[:2]:
        anchor.extend(pair)

    elements = [KeepTogether(anchor)]

    # Middle rows flow freely
    for pair in all_rows[2:-1]:
        elements.extend(pair)

    # Last row + total kept together
    tail = list(all_rows[-1]) + list(total_pair)
    elements.append(KeepTogether(tail))

    return elements



def _open_image_src(src):
    """Return a BytesIO for src, which may be a local path or an http(s) URL."""
    if isinstance(src, str) and src.startswith(("http://", "https://")):
        import re, urllib.parse
        if re.search(r'%25[0-9A-Fa-f]{2}', src):
            src = urllib.parse.unquote(src)
        with urllib.request.urlopen(src, timeout=10) as resp:
            return io.BytesIO(resp.read())
    return src  # local path — PIL can open it directly


def _load_image_buf(path, display_w_pt, display_h_pt, dpi=150):
    """Scale-to-fill + center-crop image to exact display dimensions, return JPEG buffer."""
    from PIL import Image as PILImage
    px_w = int(display_w_pt / 72 * dpi)
    px_h = int(display_h_pt / 72 * dpi)
    with PILImage.open(_open_image_src(path)) as im:
        im = im.convert("RGB")
        src_ratio = im.width / im.height
        tgt_ratio = px_w / px_h
        if src_ratio > tgt_ratio:
            # Image is wider than target — scale to height, crop width
            scale_h = px_h
            scale_w = int(im.width * px_h / im.height)
        else:
            # Image is taller than target — scale to width, crop height
            scale_w = px_w
            scale_h = int(im.height * px_w / im.width)
        im = im.resize((scale_w, scale_h), PILImage.LANCZOS)
        left = (scale_w - px_w) // 2
        top = (scale_h - px_h) // 2
        im = im.crop((left, top, left + px_w, top + px_h))
        buf = io.BytesIO()
        im.save(buf, format="JPEG", quality=85)
        buf.seek(0)
    return buf


def _load_logo_buf(path, display_w_pt, dpi=150):
    """Load a raster logo, composite RGBA onto white, return PNG bytes + height in pts."""
    from PIL import Image as PILImage
    px_w = int(display_w_pt / 72 * dpi)
    with PILImage.open(_open_image_src(path)) as im:
        ratio = px_w / im.width
        px_h = int(im.height * ratio)
        im = im.resize((px_w, px_h), PILImage.LANCZOS)
        if im.mode == "RGBA":
            bg = PILImage.new("RGBA", im.size, (255, 255, 255, 255))
            bg.alpha_composite(im)
            im = bg.convert("RGB")
        else:
            im = im.convert("RGB")
        buf = io.BytesIO()
        im.save(buf, format="PNG")
        buf.seek(0)
    return buf, px_h / dpi * 72


def _build_photo_cell(photo, cell_w, preview=False, font_delta=0, show_label=True):
    """Build a single photo cell: image (real or placeholder) + category + caption."""
    img_w = cell_w
    img_h = img_w * 0.70
    label = photo.get("category", "")
    url = photo.get("url", "")

    if preview and url and url != "placeholder" and (os.path.isfile(url) or url.startswith(("http://", "https://"))):
        try:
            buf = _load_image_buf(url, img_w, img_h)
            visual = RoundedImage(buf, img_w, img_h, radius=5)
        except Exception:
            visual = PhotoPlaceholder(img_w, img_h, "", radius=5)
    else:
        visual = PhotoPlaceholder(img_w, img_h, "", radius=5)

    parts = [visual]
    if show_label and label:
        parts.append(Paragraph(f"<b>{label}</b>", _adj_style(STYLE_PHOTO_LABEL, font_delta)))
    caption = photo.get("caption") or photo.get("description")
    if caption:
        lines = caption.split('\n', 1)
        # When a label is already the bold title, caption lines are subtitles (not bold)
        line0_style = STYLE_PHOTO_CAPTION if label else STYLE_PHOTO_LABEL
        parts.append(Paragraph(lines[0], _adj_style(line0_style, font_delta)))
        if len(lines) > 1 and lines[1]:
            parts.append(Paragraph(lines[1], _adj_style(STYLE_PHOTO_CAPTION, font_delta)))
    return parts


def _build_photos(p):
    """Photos: N-per-row grid with category labels."""
    photos = list(p.get("photos") or [])

    if not photos:
        return []

    count = len(photos)
    cols = p.get("_photos_per_row", 3)

    col_gap = 10  # gap between images
    cell_w = (CONTENT_W - (cols - 1) * col_gap) / cols

    def _photo_cell(photo):
        return _build_photo_cell(
            photo, cell_w,
            preview=p.get("_preview_photos", False),
            font_delta=p.get("_font_size_delta", 0),
        )

    # Column widths embed the gap so the table spans exactly CONTENT_W:
    # first (cols-1) columns = cell_w + col_gap, last = cell_w
    col_widths = [cell_w + col_gap] * (cols - 1) + [cell_w]

    # Build all photo row tables first
    row_tbls = []
    for i in range(0, len(photos), cols):
        chunk = photos[i : i + cols]
        row = []
        for photo in chunk:
            row.append(_photo_cell(photo))
        while len(row) < cols:
            row.append([Spacer(1, 1)])

        tbl = Table([row], colWidths=col_widths)
        tbl.setStyle(TableStyle([
            ("VALIGN",        (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING",   (0, 0), (-1, -1), 0),
            ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
            ("TOPPADDING",    (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ]))
        row_tbls.append(tbl)

    # Header kept with first photo row
    elements = [KeepTogether([
        Paragraph("Photos", STYLE_SECTION_HEADER),
        Paragraph(f"{count} photos", STYLE_SUBTITLE),
        Spacer(1, 6),
        row_tbls[0],
    ])]
    elements.extend(row_tbls[1:])

    return elements



def _build_footer(p):
    """Footer: thank you message, validity, disclaimer."""
    dealer = p.get("dealer", {})
    offer = p["offer"]
    disclaimer = p.get("disclaimer", "")
    _d = p.get("_font_size_delta", 0)

    loc_name = dealer.get("location") or dealer.get("name", "")
    valid_date = _fmt_date(offer.get("valid_until", ""))
    text = (
        f"Thank you for choosing {loc_name}, we appreciate the opportunity "
        f"to serve you. <b>This offer is valid until {valid_date}{disclaimer}.</b>"
    )
    return [
        Spacer(1, 8),
        HRFlowable(width="100%", thickness=0.5, color=DIVIDER),
        Spacer(1, 4),
        Paragraph(text, _adj_style(STYLE_FOOTER, _d)),
    ]


def _build_signature(p):
    """Signature / date block — printed at the very end of the PDF."""
    ds = _get_display(p)["sections"]
    if not ds.get("disclosures_signature", True):
        return []
    _d = p.get("_font_size_delta", 0)
    _sig_lbl = ParagraphStyle("_sl", parent=_base["Normal"], fontName="Helvetica-Bold",
                               fontSize=9 + _d, leading=12 + _d, textColor=black)
    gap = 28
    sig_col_w = (CONTENT_W - 20) / 2

    def _sig_cell(label):
        class _SigLine(Flowable):
            def wrap(self, aw, ah): return aw, gap + 6
            def draw(self):
                self.canv.setStrokeColor(black)
                self.canv.setLineWidth(0.75)
                self.canv.line(0, 6, sig_col_w, 6)
        return [Paragraph(label, _sig_lbl), _SigLine()]

    sig_tbl = Table(
        [[_sig_cell("Customer Signature"), Spacer(20, 1), _sig_cell("Date (MM-DD-YYYY)")]],
        colWidths=[sig_col_w, 20, sig_col_w],
    )
    sig_tbl.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return [Spacer(1, 16), sig_tbl]


# ---------------------------------------------------------------------------
# Style helpers
# ---------------------------------------------------------------------------

def _adj_style(base, delta):
    """Return a ParagraphStyle with fontSize/leading shifted by delta."""
    if delta == 0:
        return base
    return ParagraphStyle(
        base.name + "_adj",
        parent=base,
        fontSize=base.fontSize + delta,
        leading=base.leading + delta,
    )


# ---------------------------------------------------------------------------
# Font switching
# ---------------------------------------------------------------------------

def _apply_font(normal: str, bold: str):
    """Swap all module-level ParagraphStyle fontNames to the given family."""
    global _FONT, _FONT_BOLD
    _FONT = normal
    _FONT_BOLD = bold
    import sys
    for obj in vars(sys.modules[__name__]).values():
        if isinstance(obj, ParagraphStyle):
            if obj.fontName in ("Helvetica", "Roboto"):
                obj.fontName = normal
            elif obj.fontName in ("Helvetica-Bold", "Roboto-Bold"):
                obj.fontName = bold
            elif obj.fontName in ("Helvetica-Oblique", "Roboto-Italic"):
                obj.fontName = "Helvetica-Oblique" if normal == "Helvetica" else "Roboto-Italic"


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------

_DEFAULT_SECTION_ORDER = ["valuation", "disclosures", "observations", "market", "market_scenarios", "selected_scenarios", "recon", "photos"]


def render_offer(payload: dict, preview_logo: bool = False, preview_photos: bool = False, font_roboto: bool = False, font_size_delta: int = 0, photos_per_row: int = 3, section_order: list = None, watermark: bool = False) -> bytes:
    """Render an offer sheet PDF from a structured payload.

    Returns the PDF as bytes.
    """
    payload = dict(payload)  # shallow copy — don't mutate caller's dict
    payload["_preview_logo"] = preview_logo
    payload["_preview_photos"] = preview_photos
    payload["_font_size_delta"] = max(-2, min(3, font_size_delta))
    payload["_photos_per_row"] = max(2, min(4, photos_per_row))

    if font_roboto and _ROBOTO_AVAILABLE:
        _apply_font("Roboto", "Roboto-Bold")

    buf = io.BytesIO()

    doc = BaseDocTemplate(
        buf,
        pagesize=letter,
        leftMargin=MARGIN_LR,
        rightMargin=MARGIN_LR,
        topMargin=MARGIN_TB,
        bottomMargin=MARGIN_B,
        title="Offer Sheet",
    )
    frame = Frame(
        MARGIN_LR, MARGIN_B,
        CONTENT_W, PAGE_H - MARGIN_TB - MARGIN_B,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        id="normal",
    )
    doc.addPageTemplates([PageTemplate(id="normal", frames=[frame])])

    # Resolve display flags (missing = True)
    ds = _get_display(payload)["sections"]

    def _build_section(name):
        if name == "valuation":
            return _build_appraisal_summary(payload) if ds["valuation"] else []
        if name == "disclosures":
            return _build_disclosures(payload) if ds["disclosures"] else []
        if name == "observations":
            return _build_observations(payload) if ds["observations"] else []
        if name == "market":
            return (
                (_build_market_summary(payload) if ds["market_summary"] else []) +
                (_build_market_comparables(payload) if ds["market_comparables"] else [])
            )
        if name == "market_scenarios":
            if not ds["market_scenarios"]:
                return []
            # Both scenario blocks share the same "vehicles" footnote — when
            # selected scenarios is also showing, it prints there instead so
            # the note isn't duplicated on the page.
            show_footnote = not ds["selected_scenarios"]
            return _build_market_scenarios(payload, show_footnote=show_footnote)
        if name == "selected_scenarios":
            return _build_selected_scenarios(payload) if ds["selected_scenarios"] else []
        if name == "recon":
            return _build_recon(payload) if ds["recon_breakdown"] else []
        if name == "photos":
            return _build_photos(payload) if ds["photos"] else []
        return []

    order = list(section_order) if section_order else list(_DEFAULT_SECTION_ORDER)

    # market_scenarios/selected_scenarios used to render as a fixed part of the
    # "market" section rather than independent, orderable ones — a section_order
    # saved before that change won't list them. Backfill them right after
    # "market" (their old position) so enabling the flag always renders
    # something, even against a stale/short order list.
    insert_at = order.index("market") + 1 if "market" in order else len(order)
    for extra in ("market_scenarios", "selected_scenarios"):
        if extra not in order:
            order.insert(insert_at, extra)
            insert_at += 1

    # Assemble sections — header and footer always render
    story = []
    story.extend(_build_header(payload))
    for sec in order:
        story.extend(_build_section(sec))
    story.extend(_build_footer(payload))
    story.extend(_build_signature(payload))

    _delta = payload.get("_font_size_delta", 0)
    if watermark:
        class _PreviewCanvas(_NumberedCanvas):
            _watermark = True
            _font_size_delta = _delta
        canvasmaker = _PreviewCanvas
    elif _delta:
        class _DeltaCanvas(_NumberedCanvas):
            _font_size_delta = _delta
        canvasmaker = _DeltaCanvas
    else:
        canvasmaker = _NumberedCanvas
    doc.build(story, canvasmaker=canvasmaker)

    if font_roboto and _ROBOTO_AVAILABLE:
        _apply_font("Helvetica", "Helvetica-Bold")

    return buf.getvalue()
