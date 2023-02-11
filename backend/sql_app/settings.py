from typing import Optional

from pydantic import BaseSettings


class Settings(BaseSettings):
    LOCALHOST = '127.0.0.1'
    POSTGRES_HOST: str
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_PORT = 5432

    class Config:
        env_file = '.env'
        case_sensitive = True


settings = Settings()
