from pydantic import BaseModel
from typing import Optional

class Tag(BaseModel):
    name: Optional[str]
    id: int

    class Config:
        orm_mode = True