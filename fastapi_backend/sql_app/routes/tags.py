from fastapi import APIRouter, Depends, HTTPException
from ..schemas.tag import Tag
from ..database import get_db, Session
from ..crud import tags_crud

router = APIRouter()

@router.get("/", response_model=list[Tag])
def get_tags(skip: int = 0, limit: int = 100, contains: str = None, db: Session = Depends(get_db)):
    return tags_crud.get_tags(db, skip=skip, limit=limit, contains=contains)