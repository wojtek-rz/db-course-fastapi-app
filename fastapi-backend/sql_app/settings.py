from typing import Optional

from pydantic import BaseSettings


class Settings(BaseSettings):
    LOCALHOST = '127.0.0.1'
    POSTGRESS_HOST: str
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str

    USED_FROM_LK_NETWORK: bool
    POSTGRES_PORT = 5432

    class Config:
        case_sensitive = True


settings = Settings()
