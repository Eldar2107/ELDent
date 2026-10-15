import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "ELDent Stomatoloji Rezervasiya Sistemi"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "eldent_super_secret_jwt_key_change_in_production_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 gün

    class Config:
        case_sensitive = True


settings = Settings()
