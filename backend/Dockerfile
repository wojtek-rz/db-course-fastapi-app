FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./sql_app /code/sql_app

CMD ["sh", "-c", "uvicorn sql_app.main:app --host 0.0.0.0 --port $PORT"]