"""Blur and resolution checks for uploaded document images.

Thresholds used (tuned for document/ID photos, not general photography):

- Sharpness — variance of the Laplacian (`cv2.Laplacian(gray, cv2.CV_64F).var()`).
  A low variance means few sharp edges, i.e. a blurry image. This is the standard
  "variance of Laplacian" blur metric (Pech-Pacheco et al., 2000; popularized for
  document scans by the pyimagesearch blur-detection method):
    < 100         -> Blurry
    100 - 500     -> Borderline
    >= 500        -> Sharp

- Resolution — raw pixel dimensions. For reliable OCR on a photographed ID/ration
  card/passbook page, we require at least 1000px on one side and 700px on the
  other (roughly the pixel count a 300 DPI scan of a credit-card-sized document
  would produce, and comfortably above what typical phone cameras produce even
  at a normal distance):
    width/height both below the minimums -> Too Low
    otherwise                             -> Adequate
"""

import cv2
import numpy as np

BLUR_THRESHOLD_BLURRY_BELOW = 100.0
BLUR_THRESHOLD_SHARP_AT_OR_ABOVE = 500.0

MIN_WIDTH_PX = 1000
MIN_HEIGHT_PX = 700


def classify_blur(variance: float) -> str:
    if variance < BLUR_THRESHOLD_BLURRY_BELOW:
        return "Blurry"
    if variance < BLUR_THRESHOLD_SHARP_AT_OR_ABOVE:
        return "Borderline"
    return "Sharp"


def classify_resolution(width: int, height: int) -> str:
    long_edge, short_edge = max(width, height), min(width, height)
    if long_edge >= MIN_WIDTH_PX and short_edge >= MIN_HEIGHT_PX:
        return "Adequate"
    return "Too Low"


def assess_image_quality(image_bgr: np.ndarray) -> dict:
    """image_bgr: an OpenCV-loaded (BGR) image array."""
    height, width = image_bgr.shape[:2]
    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    variance = float(cv2.Laplacian(gray, cv2.CV_64F).var())

    return {
        "applicable": True,
        "laplacian_variance": round(variance, 2),
        "blur_classification": classify_blur(variance),
        "width": int(width),
        "height": int(height),
        "resolution_classification": classify_resolution(width, height),
        "blur_threshold_blurry_below": BLUR_THRESHOLD_BLURRY_BELOW,
        "blur_threshold_sharp_at_or_above": BLUR_THRESHOLD_SHARP_AT_OR_ABOVE,
        "min_width_px": MIN_WIDTH_PX,
        "min_height_px": MIN_HEIGHT_PX,
    }


def not_applicable_report() -> dict:
    """Used for digital PDFs with a real text layer — there is no rasterized
    image to score, so blur/resolution simply don't apply."""
    return {
        "applicable": False,
        "laplacian_variance": None,
        "blur_classification": None,
        "width": None,
        "height": None,
        "resolution_classification": None,
        "blur_threshold_blurry_below": BLUR_THRESHOLD_BLURRY_BELOW,
        "blur_threshold_sharp_at_or_above": BLUR_THRESHOLD_SHARP_AT_OR_ABOVE,
        "min_width_px": MIN_WIDTH_PX,
        "min_height_px": MIN_HEIGHT_PX,
    }
