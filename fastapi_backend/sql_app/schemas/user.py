import datetime
from pydantic import BaseModel, constr
from sql_app.schemas.recipe import RecipeInList


class UserBase(BaseModel):
    username: str
    email: str


class UserCreate(BaseModel):
    username: constr(min_length=3, max_length=20)
    email: constr(min_length=3, max_length=30)
    password: constr(min_length=8, max_length=30)


class UserInList(UserBase):
    id: int
    last_login: datetime.date
    recipes_number: int

    class Config:
        orm_mode = True

class User(UserInList):
    recipes: list[RecipeInList] = []

    class Config:
        orm_mode = True


class UserMe(User):
    liked_recipes: list[RecipeInList] = []
    observed_users: list[UserInList] = []

    class Config:
        orm_mode = True
