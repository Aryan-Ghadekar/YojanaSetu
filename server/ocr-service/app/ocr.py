"""Text extraction from uploaded documents.

Order of operations (cheapest/most-accurate first):
1. PDF with a real text layer -> pull the text directly via PyMuPDF. No OCR needed.
2. Anything else (images, scanned/flattened PDFs) -> rasterize (PDFs) then run
   PaddleOCR, which has solid multilingual support (English + Devanagari-script
   Hindi, the closest available model to Marathi — PaddleOCR ships no dedicated
   Marathi model).
"""

import io
from typing import Optional

import cv2
import fitz  # PyMuPDF
import numpy as np

from app.config import settings

_PADDLE_OCR_INSTANCE = None

# A digital PDF page is considered to "have" a text layer once it clears this
# many extracted characters — short enough to not miss a sparse form, long
# enough that a handful of stray glyph artifacts don't trigger a false positive.
MIN_TEXT_LAYER_CHARS = 20


def _get_paddle_ocr():
    global _PADDLE_OCR_INSTANCE
    if _PADDLE_OCR_INSTANCE is None:
        from paddleocr import PaddleOCR

        _PADDLE_OCR_INSTANCE = PaddleOCR(lang=settings.ocr_lang)
    return _PADDLE_OCR_INSTANCE


def extract_pdf_text_layer(pdf_bytes: bytes) -> Optional[str]:
    """Returns the PDF's selectable text if there's enough of it, else None."""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    try:
        text = "\n".join(page.get_text() for page in doc)
    finally:
        doc.close()

    if len(text.strip()) >= MIN_TEXT_LAYER_CHARS:
        return text.strip()
    return None


def rasterize_pdf_first_page(pdf_bytes: bytes, dpi: int = 200) -> np.ndarray:
    """Renders page 1 of a (scanned/image-only) PDF to a BGR image array,
    for quality-checking and OCR the same way a photographed document is."""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    try:
        page = doc[0]
        pixmap = page.get_pixmap(dpi=dpi)
        image_bytes = pixmap.tobytes("png")
    finally:
        doc.close()

    array = np.frombuffer(image_bytes, dtype=np.uint8)
    return cv2.imdecode(array, cv2.IMREAD_COLOR)


def decode_image(image_bytes: bytes) -> np.ndarray:
    array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(array, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Could not decode image — unsupported or corrupt file.")
    return image


def run_paddle_ocr(image_bgr: np.ndarray) -> str:
    ocr = _get_paddle_ocr()
    results = ocr.predict(image_bgr)

    lines: list[str] = []
    for page in results or []:
        lines.extend(text for text in page.get("rec_texts", []) if text)
    return "\n".join(lines)
