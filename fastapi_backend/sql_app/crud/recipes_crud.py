from sql_app.database import Session
from sqlalchemy import func
from .tags_crud import get_tags_from_names, get_tag_ids_from_names
from ..models.recipe import Recipe, RecipeIngredient, RecipeStep, RecipeTag
from ..models.tag import Tag
from ..models.user import User
from .ingredients_crud import get_ingredients_from_names, get_ingredient_ids_from_names
from ..schemas.recipe import RecipeCreate as RecipeCreateSchema
from sqlalchemy.orm import noload, joinedload


def get_recipes(db: Session, query_dict: dict):
    skip = query_dict["skip"]
    limit = query_dict["limit"]
    name = query_dict["name"]
    calorie_level = query_dict["calorie_level"]
    sorted_by_latest = query_dict["sorted_by_latest"]
    sorted_by_likes = query_dict["sorted_by_likes"]
    tags = query_dict["tags"]
    ingredients = query_dict["ingredients"]

    query = db.query(Recipe).options(joinedload(Recipe.tags))
    if name is not None:
        query = query.filter(Recipe.title.contains(name))
    if calorie_level is not None:
        query = query.filter(Recipe.calorie_level == calorie_level)
    if sorted_by_latest:
        query = query.order_by(Recipe.date_added.desc())
    if sorted_by_likes:
        query = query.order_by(Recipe.likes.desc())
    if len(tags) > 0:
        tag_ids = get_tag_ids_from_names(db, tags)
        for tag_id in tag_ids:
            query = query.filter(Recipe.tags.any(RecipeTag.tag_id == tag_id))
    if len(ingredients) > 0:
        query = query.options(joinedload(Recipe.ingredients))
        ingredient_ids = get_ingredient_ids_from_names(db, ingredients)
        for ingredient_id in ingredient_ids:
            query = query.filter(Recipe.ingredients.any(RecipeIngredient.ingredient_id == ingredient_id))
    
    return query.offset(skip).limit(limit).all()


def get_recipe(db: Session, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()


def create_recipe(db: Session, recipe: RecipeCreateSchema, user_id: int):
    recipe_dict = recipe.dict()
    del recipe_dict["ingredients"]
    del recipe_dict["tags"]
    del recipe_dict["steps"]
    db_recipe = Recipe(**recipe_dict, 
    contributor_id=user_id, date_added=func.now(),
    id=db.query(func.max(Recipe.id)).scalar() + 1)

    db_ingredients = get_ingredients_from_names(db, [ingredient.name for ingredient in recipe.ingredients])
    for db_ingredient, recipe_ingredient in zip(db_ingredients, recipe.ingredients):
        db.add(RecipeIngredient(recipe=db_recipe, ingredient=db_ingredient, quantity=recipe_ingredient.quantity))

    for db_tag in get_tags_from_names(db, recipe.tags):
        db.add(RecipeTag(recipe=db_recipe, tag=db_tag))

    for i, step in enumerate(recipe.steps):
        step_db = RecipeStep(recipe=db_recipe, step_content=step, step_number=i)
        db.add(step_db)

    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)

    return db_recipe


def remove_recipe(db: Session, recipe_id: int):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    db.delete(recipe)
    db.commit()
    return recipe


def add_recipe_like(db: Session, recipe: Recipe, user: User):
    user.liked_recipes.append(recipe)
    recipe.likes += 1
    db.commit()
    db.refresh(recipe)
    return recipe


def remove_recipe_like(db: Session, recipe: Recipe, user: User):
    user.liked_recipes.remove(recipe)
    recipe.likes -= 1
    db.commit()
    db.refresh(recipe)
    return recipe