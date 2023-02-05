# https://gist.github.com/danallison/7217d76d944ea4d8dabd0ba3041ebefc
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from sql_app import settings
from sql_app.ssh_tunnel import tunnel

engine = create_engine('postgresql://{user}:{password}@{host}:{port}/{db}'.format(
    user=settings.POSTGRES_USER,
    password=settings.POSTGRES_PASSWORD,
    host=settings.POSTGRESS_HOST,
    port=settings.POSTGRES_PORT,
    db=settings.POSTGRES_DB,
))

Session = sessionmaker(bind=engine)


def get_db():
    # Hat tip: https://stackoverflow.com/a/38001815
    db = Session()
    try:
        yield db
    finally:
        db.close()


Base = declarative_base()


def create_tables(models):
    Base.metadata.create_all(bind=engine)
