import datetime
from typing import Optional
from .tag import Tag
from .ingredient import IngredientInRecipe
from pydantic import BaseModel, constr
from enum import IntEnum


class CalorieLevel(IntEnum):
    LOW = 0
    MEDIUM = 1
    HIGH = 2


class RecipeBase(BaseModel):
    title: str
    description: Optional[str] = None
    calorie_level: CalorieLevel
    minutes: int

    class Config:
        orm_mode = True


class RecipeCreate(RecipeBase):
    ingredients: list[IngredientInRecipe]
    steps: list[str]
    tags: list[Optional[str]]


class RecipeStep(BaseModel):
    step_number: int
    step_content: str

    class Config:
        orm_mode = True

class Recipe(RecipeBase):
    id: int
    likes: int
    date_added: datetime.date
    contributor_id: int

    ingredients: list[IngredientInRecipe]
    steps: list[RecipeStep]
    tags: list[Tag]

    class Config:
        orm_mode = True


class RecipeInList(RecipeBase):
    id: int
    likes: int
    date_added: datetime.date
    contributor_id: int
    tags: list[Tag]

    class Config:
        orm_mode = True
