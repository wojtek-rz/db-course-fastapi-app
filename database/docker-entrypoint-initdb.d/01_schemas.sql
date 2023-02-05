create table users
(
    id              serial
        primary key,
    username        varchar,
    email           varchar,
    hashed_password varchar,
    last_login      date
);

create table tags
(
    id   serial
        primary key,
    name varchar
);


create table ingredients
(
    id   serial
        primary key,
    name varchar
);

create table recipes
(
    id             serial
        primary key,
    contributor_id integer
        references users,
    title          varchar,
    minutes        integer,
    description    varchar,
    date_added     date,
    likes          integer,
    calorie_level  integer
);

create table user_observe_users
(
    user_id          integer not null
        references users,
    observed_user_id integer not null
        references users,
    primary key (user_id, observed_user_id)
);

create table user_recipe_likes
(
    user_id   integer not null
        references users,
    recipe_id integer not null
        references recipes,
    primary key (user_id, recipe_id)
); 


create table recipe_ingredients
(
    recipe_id     integer not null
        references recipes,
    ingredient_id integer not null
        references ingredients,
    quantity      varchar,
    primary key (recipe_id, ingredient_id)
);

create table recipe_steps
(
    recipe_id    integer not null
        references recipes,
    step_number  integer not null,
    step_content varchar,
    primary key (recipe_id, step_number)
);


create table recipe_tags
(
    recipe_id integer not null
        references recipes,
    tag_id    integer not null
        references tags,
    primary key (recipe_id, tag_id)
);
