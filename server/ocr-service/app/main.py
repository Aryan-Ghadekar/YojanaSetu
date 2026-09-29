"""Document intake microservice: quality check -> OCR -> LLM field extraction.

Called server-to-server by the YojanaSetu Express API (never by the browser).
"""

import hmac

from fastapi import Depends, FastAPI, File, Form, Header, HTTPException, UploadFile

from app.config import settings
from app.errors import ApiError
from app.processing import process_document

app = FastAPI(title="YojanaSetu OCR service")


def require_token(authorization: str = Header(default="")) -> None:
    if not settings.ocr_service_token:
        return
    expected = f"Bearer {settings.ocr_service_token}"
    if not hmac.compare_digest(authorization, expected):
        raise HTTPException(status_code=401, detail="Invalid service token")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/process", dependencies=[Depends(require_token)])
async def post_process(file: UploadFile = File(...), document_type: str = Form(...)):
    file_bytes = await file.read()
    if not file_bytes:
        raise ApiError(400, "Uploaded file is empty.")
    if len(file_bytes) > settings.max_upload_mb * 1024 * 1024:
        raise ApiError(400, f"File exceeds the {settings.max_upload_mb}MB upload limit.")

    return process_document(
        file_bytes=file_bytes,
        content_type=file.content_type or "",
        filename=file.filename or "",
        document_type=document_type,
    )
