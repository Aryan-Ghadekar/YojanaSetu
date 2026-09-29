from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Google AI Studio API key: https://aistudio.google.com/apikey
    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.5-flash"

    # OCR language for PaddleOCR (e.g. "en", "hi"). PaddleOCR has no dedicated
    # Marathi model; Hindi's Devanagari-script model is the closest available.
    ocr_lang: str = "en"

    max_upload_mb: int = 15

    # Shared secret the Express API sends as `Authorization: Bearer <token>`.
    # Leave empty only for local development.
    ocr_service_token: str = ""


settings = Settings()
