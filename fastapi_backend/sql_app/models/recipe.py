from sqlalchemy import Column, ForeignKey, Integer, PrimaryKeyConstraint, String, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from ..database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    contributor_id = Column(ForeignKey("users.id"))
    title = Column(String, index=True)
    minutes = Column(Integer, index=True)
    description = Column(String)
    date_added = Column(Date, index=True)
    likes = Column(Integer, index=True, default=0)
    calorie_level = Column(Integer, index=True)

    contributor = relationship("User", back_populates="recipes")
    ingredients = relationship("RecipeIngredient", back_populates="recipe", cascade="all, delete")
    tags = relationship("Tag", secondary='recipe_tags', cascade="all, delete")
    steps = relationship("RecipeStep", cascade="all, delete")


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"
    __table_args__ = (PrimaryKeyConstraint('recipe_id', 'ingredient_id'),)

    recipe_id = Column(ForeignKey("recipes.id"), index=True)
    ingredient_id = Column(ForeignKey("ingredients.id"), index=True)
    quantity = Column(String)

    recipe = relationship("Recipe", back_populates="ingredients")
    ingredient = relationship("Ingredient")

    @hybrid_property
    def name(self):
        return self.ingredient.name


class RecipeStep(Base):
    __tablename__ = "recipe_steps"
    __table_args__ = (PrimaryKeyConstraint('recipe_id', 'step_number'),)

    recipe_id = Column(ForeignKey("recipes.id"), index=True)
    step_number = Column(Integer)
    step_content = Column(String)

    recipe = relationship("Recipe", back_populates="steps")


class RecipeTag(Base):
    __tablename__ = "recipe_tags"
    __table_args__ = (PrimaryKeyConstraint('recipe_id', 'tag_id'),)

    recipe_id = Column(ForeignKey("recipes.id"), index=True)
    tag_id = Column(ForeignKey("tags.id"), index=True)

    # recipe = relationship("Recipe", back_populates="tags")
    tag = relationship("Tag")
