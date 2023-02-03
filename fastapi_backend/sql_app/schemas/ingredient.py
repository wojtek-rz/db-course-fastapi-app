from pydantic import BaseModel
from typing import Optional

class IngredientBase(BaseModel):
    name: str


class IngredientInRecipe(IngredientBase):
    quantity: Optional[str]

    class Config:
        orm_mode = True


class Ingredient(IngredientBase):
    id: int

    class Config:
        orm_mode = True