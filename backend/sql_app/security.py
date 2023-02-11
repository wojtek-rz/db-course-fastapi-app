from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import JWTError, jwt
from pydantic import ValidationError
from sql_app.crud import users_crud
from sql_app.database import get_db, Session
from sql_app.schemas.token import TokenPayload

oauth2_scheme = OAuth2PasswordBearer('/api/login/access-token')
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "552c41be489c0bdf06ff0826ec790f27a5a9b5fb47ab0a90545d4d810a82d437"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(username: str, email: str):
    to_encode = {"username": username, "email": email}
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_token_data(token: str) -> TokenPayload:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        email: str = payload.get("email")
        return TokenPayload(username=username, email=email)
    except (JWTError, ValidationError):
        return False


async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = get_token_data(token)
    if not payload:
        raise credentials_exception
    user = users_crud.get_user_by_email(db, payload.email)
    if user is None:
        raise credentials_exception
    return user
