from fastapi import APIRouter, Query, Depends, HTTPException

from sql_app.security import get_current_user
from ..crud import recipes_crud
from ..schemas.recipe import Recipe, RecipeCreate, RecipeInList
from ..database import get_db, Session

router = APIRouter()


@router.get("/", response_model=list[RecipeInList])
def read_recipes(
    skip: int = 0, limit: int = 20, name: str | None = None, calorie_level: int | None = None,
    sorted_by_latest: bool = False, sorted_by_likes: bool = False,
    tags: list[str] = Query(default=[]), ingredients: list[str] = Query(default=[]),
    db: Session = Depends(get_db)):
    recipes_query = {
        "skip": skip,
        "limit": limit,
        "name": name,
        "calorie_level": calorie_level,
        "sorted_by_latest": sorted_by_latest,
        "sorted_by_likes": sorted_by_likes,
        "tags": tags,
        "ingredients": ingredients
    }
    try:
        recipes = recipes_crud.get_recipes(db, recipes_query)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return recipes


@router.post("/", response_model=Recipe)
def create_recipe_for_user(
        recipe: RecipeCreate, user = Depends(get_current_user), db: Session = Depends(get_db)
):
    return recipes_crud.create_recipe(db=db, recipe=recipe, user_id=user.id)


@router.get("/{recipe_id}", response_model=Recipe)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = recipes_crud.get_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe


@router.delete("/{recipe_id}")
def remove_recipe(
    recipe_id: int, user = Depends(get_current_user), db: Session = Depends(get_db)):
    db_recipe = recipes_crud.get_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if db_recipe.contributor_id != user.id:
        raise HTTPException(status_code=403, detail="You are not allowed to delete this recipe")
    db_recipe = recipes_crud.remove_recipe(db, recipe_id=recipe_id)
    return


@router.post("/{recipe_id}/likes", response_model=Recipe)
def add_recipe_like(
        recipe_id: int, user = Depends(get_current_user),  db: Session = Depends(get_db)
):
    db_recipe = recipes_crud.get_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if db_recipe in user.liked_recipes:
        raise HTTPException(status_code=403, detail="You already liked this recipe")

    return recipes_crud.add_recipe_like(db=db, recipe=db_recipe, user=user)


@router.delete("/{recipe_id}/likes", response_model=Recipe)
def remove_recipe_like(
        recipe_id: int, user = Depends(get_current_user),  db: Session = Depends(get_db)
):
    db_recipe = recipes_crud.get_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if db_recipe not in user.liked_recipes:
        raise HTTPException(status_code=403, detail="You didn't like this recipe")
    
    return recipes_crud.remove_recipe_like(db=db, recipe=db_recipe, user=user)