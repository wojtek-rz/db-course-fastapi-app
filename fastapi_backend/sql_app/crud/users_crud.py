from sqlalchemy import column, func
from sql_app.database import Session
from ..models.user import User
from ..models.recipe import Recipe
from ..schemas.user import UserCreate as UserCreateSchema
from sqlalchemy.orm import noload


def get_user(db: Session, user_id: int):
    return db.query(User).options().filter(User.id == user_id).first()


def update_last_login(db: Session, user: User):
    user.last_login = func.now()
    db.commit()
    db.refresh(user)
    return user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreateSchema, hashed_password: str):
    db_user = User(
        email=user.email, hashed_password=hashed_password,
        username=user.username, last_login="2021-01-01 00:00:00")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def remove_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    db.delete(user)
    db.commit()
    return user


def get_top_users(db: Session):
    return db.query(User, func.sum(Recipe.likes), func.count()).options(noload(User.recipes), noload(User.observed_users), noload(User.liked_recipes))\
            .join(Recipe).group_by(User.id).order_by(func.sum(Recipe.likes).desc()).limit(20).all()


def add_observed_user(db: Session, user: User, observed_user: User):
    user.observed_users.append(observed_user)
    db.commit()
    db.refresh(user)
    return observed_user


def remove_observed_user(db: Session, user: User, observed_user: User):
    user.observed_users.remove(observed_user)
    db.commit()
    db.refresh(user)
    return observed_user