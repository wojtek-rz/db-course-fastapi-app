from fastapi import APIRouter, Depends, HTTPException
from ..schemas.ingredient import Ingredient
from ..database import get_db, Session
from ..crud import ingredients_crud

router = APIRouter()

@router.get("/", response_model=list[Ingredient])
def get_ingredients(skip: int = 0, limit: int = 100, contains: str = None, db: Session = Depends(get_db)):
    return ingredients_crud.get_ingredients(db, skip=skip, limit=limit, contains=contains)