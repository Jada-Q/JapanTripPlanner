from pathlib import Path

from pydantic_settings import BaseSettings

_ENV_FILE = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    google_api_key: str = ""
    cors_origins: list[str] = ["http://localhost:5173"]
    gemini_model: str = "gemini-2.5-flash"
    max_trip_days: int = 21

    # Kimi (Moonshot AI) — OpenAI-compatible
    ai_provider: str = "kimi"  # "gemini" or "kimi"
    kimi_api_key: str = ""
    kimi_base_url: str = "https://api.moonshot.cn/v1"
    kimi_model: str = "moonshot-v1-32k"

    model_config = {"env_file": str(_ENV_FILE)}


settings = Settings()
