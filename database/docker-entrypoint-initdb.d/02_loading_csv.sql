copy users
from '/docker-entrypoint-initdb.d/users.csv'
delimiter ','
csv header;

copy ingredients
from '/docker-entrypoint-initdb.d/ingredients.csv'
delimiter ','
csv header;

copy tags
from '/docker-entrypoint-initdb.d/tags.csv'
delimiter ','
csv header;

copy recipes
from '/docker-entrypoint-initdb.d/recipes.csv'
delimiter ','
csv header;

copy recipe_ingredients
from '/docker-entrypoint-initdb.d/recipe_ingredients.csv'
delimiter ','
csv header;

copy recipe_tags
from '/docker-entrypoint-initdb.d/recipe_tags.csv'
delimiter ','
csv header;

copy recipe_steps
from '/docker-entrypoint-initdb.d/recipe_steps.csv'
delimiter ','
csv header;
