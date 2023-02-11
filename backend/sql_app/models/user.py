from sqlalchemy import Column, ForeignKey, Integer, PrimaryKeyConstraint, String, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, index=True)
    hashed_password = Column(String)
    last_login = Column(Date, index=True, default=Date())

    recipes = relationship("Recipe", back_populates="contributor", cascade="all, delete")
    liked_recipes = relationship("Recipe", secondary="user_recipe_likes", cascade="all, delete")
    observed_users = relationship("User", secondary="user_observe_users",
                                    primaryjoin="User.id==user_observe_users.c.user_id",
                                    secondaryjoin="User.id==user_observe_users.c.observed_user_id",
                                    backref="observers", cascade="all, delete")

    @hybrid_property
    def recipes_number(self):
        return len(self.recipes)



class UserRecipeLike(Base):
    __tablename__ = "user_recipe_likes"
    __table_args__ = (PrimaryKeyConstraint('user_id', 'recipe_id'),)

    user_id = Column(ForeignKey("users.id"))
    recipe_id = Column(ForeignKey("recipes.id"))


class UserObserveUser(Base):
    __tablename__ = "user_observe_users"
    __table_args__ = (PrimaryKeyConstraint('user_id', 'observed_user_id'),)

    user_id = Column(ForeignKey("users.id"))
    observed_user_id = Column(ForeignKey("users.id"))
