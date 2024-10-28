from enum import Enum
import os
from dotenv import load_dotenv

from pydantic import BaseSettings, PostgresDsn

# Load .env file first
load_dotenv()


class EnvironmentType(str, Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"
    TEST = "test"


class BaseConfig(BaseSettings):
    class Config:
        case_sensitive = True
        # Tell pydantic to use environment variables
        env_file = ".env"
        env_file_encoding = "utf-8"


class Config(BaseConfig):
    DEBUG: int = int(os.getenv("DEBUG", "0"))
    DEFAULT_LOCALE: str = os.getenv("DEFAULT_LOCALE", "en_US")
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", EnvironmentType.DEVELOPMENT)
    POSTGRES_URL: PostgresDsn = os.getenv(
        "POSTGRES_URL",
        "postgresql+asyncpg://pandasai:password123@127.0.0.1:5430/pandasai-db"
    )
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    RELEASE_VERSION: str = os.getenv("RELEASE_VERSION", "0.1.0")
    SHOW_SQL_ALCHEMY_QUERIES: int = int(
        os.getenv("SHOW_SQL_ALCHEMY_QUERIES", "0"))
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRE_MINUTES: int = int(
        os.getenv("JWT_EXPIRE_MINUTES", "1440"))  # 60 * 24
    EMAIL = os.getenv("EMAIL", "test@pandabi.ai")
    PASSWORD = os.getenv("PASSWORD", "12345")
    DEFAULT_ORGANIZATION = os.getenv("DEFAULT_ORGANIZATION", "PandaBI")
    DEFAULT_SPACE = os.getenv("DEFAULT_SPACE", "pandasai")


config: Config = Config()
