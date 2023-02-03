from fastapi import FastAPI, Request
from . import models
from .database import create_tables
from sql_app import api_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

create_tables(models)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router.api_router, prefix="/api")


app.mount("/assets", StaticFiles(directory="assets"), name="static files for frontend")

templates = Jinja2Templates(directory="templates")


# catch all possible paths, it's a single page application
@app.get("/{full_path:path}")
async def catch_all(request: Request, full_path: str):
    print("full_path: "+full_path)
    return templates.TemplateResponse("index.html", {"request": request})
