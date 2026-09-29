"""Maps raw OCR text onto the beneficiary intake's canonical field schema using Gemini.

The OCR text is often noisy (misread characters, jumbled line order), so the model
is instructed to only fill in a field when it is reasonably confident, and to leave
everything else null rather than guess.
"""

import time
from typing import Optional

import httpx
from google import genai
from google.genai import errors as genai_errors
from google.genai import types
from pydantic import BaseModel, Field

from app.config import settings
from app.errors import ApiError

# Transient failures worth a retry: dropped connections and Gemini-side 5xx —
# not 4xx (bad request/invalid key), which retrying can't fix.
_TRANSIENT_ERRORS = (httpx.TransportError, genai_errors.ServerError)
_MAX_ATTEMPTS = 3
_RETRY_DELAY_SECONDS = 1.5

_client: Optional[genai.Client] = None


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        if not settings.gemini_api_key:
            raise ApiError(500, "GEMINI_API_KEY is not configured on the server.")
        _client = genai.Client(api_key=settings.gemini_api_key)
    return _client


class LLMExtractedFields(BaseModel):
    full_name: Optional[str] = Field(None, description="Full legal name as printed on the document")
    date_of_birth: Optional[str] = Field(None, description="ISO date YYYY-MM-DD if a full date is present")
    gender: Optional[str] = Field(None, description="M, F, or as printed")
    phone_number: Optional[str] = Field(None, description="10-digit mobile number")
    aadhaar: Optional[str] = Field(None, description="12-digit Aadhaar UID, digits only")
    pan: Optional[str] = Field(None, description="10-character PAN, format ABCDE1234F")
    village: Optional[str] = Field(None, description="Village or town name")
    district: Optional[str] = Field(None, description="District name")
    state: Optional[str] = Field(None, description="State name")
    address: Optional[str] = Field(None, description="Full postal address as printed")
    pincode: Optional[str] = Field(None, description="6-digit postal PIN code")
    ration_card_number: Optional[str] = Field(None, description="Ration card number, if this is a ration card")
    ration_card_category: Optional[str] = Field(None, description="e.g. BPL, APL, AAY, Priority")
    bank_name: Optional[str] = Field(None, description="Bank name, if this is a passbook")
    bank_account_number: Optional[str] = Field(None, description="Bank account number")
    bank_ifsc: Optional[str] = Field(None, description="IFSC code")
    annual_income: Optional[float] = Field(None, description="Annual income in INR, numeric only")
    occupation: Optional[str] = Field(None, description="Stated occupation")


SYSTEM_PROMPT = (
    "You extract structured beneficiary data from OCR text of Indian government and "
    "financial documents (Aadhaar card, PAN card, ration card, bank passbook, land "
    "record, income/domicile certificates) for a welfare-scheme intake form.\n\n"
    "The OCR text may contain misread characters, broken words, or scrambled line "
    "order. Only populate a field when the value is clearly present in the text — "
    "leave a field null rather than guess or infer a value that isn't stated. "
    "Never fabricate an ID number. Normalize dates to YYYY-MM-DD when a complete "
    "date is present."
)


def extract_fields_from_text(ocr_text: str, document_type: str) -> LLMExtractedFields:
    if not ocr_text.strip():
        return LLMExtractedFields()

    client = _get_client()

    last_error: Exception = ApiError(502, "Could not reach the LLM.")
    for attempt in range(1, _MAX_ATTEMPTS + 1):
        try:
            response = client.models.generate_content(
                model=settings.gemini_model,
                contents=(
                    f"Document type: {document_type}\n\n"
                    f"OCR text:\n---\n{ocr_text}\n---\n\n"
                    "Extract the fields you can confidently read from this text."
                ),
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    response_mime_type="application/json",
                    response_schema=LLMExtractedFields,
                ),
            )
            if response.parsed is None:
                raise ApiError(502, "The LLM did not return a parseable response for this document.")
            return response.parsed
        except _TRANSIENT_ERRORS as e:
            last_error = e
            if attempt < _MAX_ATTEMPTS:
                time.sleep(_RETRY_DELAY_SECONDS)

    raise ApiError(502, f"The LLM was unreachable after {_MAX_ATTEMPTS} attempts: {last_error}")
