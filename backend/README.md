# FastApi backend

## Installation

1. Clone repo to desired location.
2. Create (only once) venv at desired location (change VENV_LOCATION, ex. "./venv"): 
    ```bash
    python3 -m venv VENV_LOCATION
    ```
3. Activate venv:
    ```bash
    source VENV_LOCATION/bin/activate
    ```
4. Install requirements:
    ```bash
    pip install -r requirements.txt
    ```
5. Test run app: 
    ```bash
    uvicorn sql_app.main:app   
    ```

## Configuration

1. Set environmental variables in the `.env` file.
2. Mandatory fields:
   
    - `PORT` - port on which the application will be available
    - `POSTGRES_HOST` - host of the database
    - `POSTGRES_USER` - login to postgresql
    - `POSTGRES_PASSWORD` - password to postgresql
    - `POSTGRES_DB` - database name
    - `POSTGRES_PORT` - port of the database

## Development

To run the application and reload on changes, you can add the `--reload` flag:
```bash
uvicorn --reload sql_app.main:app   
```

## File structure

```.
├── __init__.py
├── main.py         # start of the app
├── api_router.py   # router for api endpoints
├── database.py     # connection with database
├── security.py     # passwords hashing and verifying users
├── crud            # database queries
│   ├── __init__.py
│   ├── ingredients_crud.py
│   ├── recipes_crud.py
│   ├── tags_crud.py
│   └── users_crud.py
├── models          # models for the database
│   ├── __init__.py
│   ├── ingredient.py
│   ├── recipe.py
│   ├── tag.py
│   └── user.py
├── routes          # api endpoints
│   ├── __init__.py
│   ├── ingredients.py
│   ├── login.py
│   ├── recipes.py
│   ├── tags.py
│   └── users.py
├── schemas         # api schemas
│   ├── __init__.py
│   ├── ingredient.py
│   ├── recipe.py
│   ├── tag.py
│   ├── token.py
│   └── user.py
└── settings.py     # .env and app variables
```
