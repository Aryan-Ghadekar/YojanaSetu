from app.errors import ApiError
from app import quality
from app import ocr
from app.extraction import extract_fields_from_text

PDF_CONTENT_TYPES = {"application/pdf"}
IMAGE_CONTENT_TYPES = {"image/jpeg", "image/jpg", "image/png", "image/webp"}


def process_document(
    file_bytes: bytes, content_type: str, filename: str, document_type: str
) -> dict:
    warnings: list[str] = []
    is_pdf = content_type in PDF_CONTENT_TYPES or filename.lower().endswith(".pdf")
    is_image = content_type in IMAGE_CONTENT_TYPES or filename.lower().endswith(
        (".jpg", ".jpeg", ".png", ".webp")
    )

    if not is_pdf and not is_image:
        raise ApiError(400, "Unsupported file type. Upload a PDF, JPG, PNG, or WEBP.")

    if is_pdf:
        text_layer = ocr.extract_pdf_text_layer(file_bytes)
        if text_layer is not None:
            # Selectable-text PDF: no image to score, no OCR needed.
            quality_report = quality.not_applicable_report()
            ocr_text = text_layer
            ocr_source = "pdf_text_layer"
        else:
            image = ocr.rasterize_pdf_first_page(file_bytes)
            quality_report = quality.assess_image_quality(image)
            ocr_text = ocr.run_paddle_ocr(image)
            ocr_source = "paddleocr"
    else:
        image = ocr.decode_image(file_bytes)
        quality_report = quality.assess_image_quality(image)
        ocr_text = ocr.run_paddle_ocr(image)
        ocr_source = "paddleocr"

    if quality_report["applicable"]:
        if quality_report["blur_classification"] == "Blurry":
            warnings.append(
                f"Image is Blurry (Laplacian variance {quality_report['laplacian_variance']} "
                f"< {quality.BLUR_THRESHOLD_BLURRY_BELOW}). Re-upload a sharper photo/scan."
            )
        elif quality_report["blur_classification"] == "Borderline":
            warnings.append(
                f"Image sharpness is Borderline (Laplacian variance "
                f"{quality_report['laplacian_variance']}). OCR results may be unreliable."
            )
        if quality_report["resolution_classification"] == "Too Low":
            warnings.append(
                f"Resolution {quality_report['width']}x{quality_report['height']}px is Too Low "
                f"for OCR (minimum {quality.MIN_WIDTH_PX}x{quality.MIN_HEIGHT_PX}px)."
            )

    if not ocr_text.strip():
        warnings.append("No text could be read from this document.")

    extracted = extract_fields_from_text(ocr_text, document_type)

    return {
        "document_type": document_type,
        "ocr_source": ocr_source,
        "ocr_text": ocr_text,
        "quality": quality_report,
        "extracted_fields": extracted.model_dump(),
        "warnings": warnings,
    }
