from sql_app.database import Session
from sqlalchemy import func
from ..models.ingredient import Ingredient


def get_ingredients_from_names(db: Session, names: list[str]):
    db_ingredients: list[Ingredient] = []
    for name in names:
        # Check if ingredient already exists in ingredients table
        db_ingredient = db.query(Ingredient).filter_by(name=name).first()
        if not db_ingredient:
            # If ingredient does not exist, add it to the ingredients table
            db_ingredient = Ingredient(name=name, id=db.query(func.max(Ingredient.id)).scalar() + 1)
            db.add(db_ingredient)
        db_ingredients.append(db_ingredient)
    db.commit()
    return db_ingredients


def get_ingredient_ids_from_names(db: Session, names: list[str]):
    ingredient_ids: list[int] = []
    for name in names:
        db_ingredient = db.query(Ingredient).filter_by(name=name).first()
        if not db_ingredient:
            raise ValueError(f"Ingredient {name} does not exist")
        ingredient_ids.append(db_ingredient.id)
    return ingredient_ids


def get_ingredients(db: Session = Session(), skip: int = 0, limit: int = 50, contains: str = None):
    query = db.query(Ingredient)
    if contains is not None:
        query = query.filter(Ingredient.name.contains(contains))

    return query.order_by(Ingredient.name).offset(skip).limit(limit).all()