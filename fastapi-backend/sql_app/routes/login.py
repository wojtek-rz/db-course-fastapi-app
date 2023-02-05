from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sql_app.crud import users_crud
from sql_app.schemas import token
from sql_app.models.user import User
from sql_app.database import Session, get_db
from sql_app.security import create_access_token, verify_password

router = APIRouter()


def authenticate_user(db: Session, username: str, password: str):
    user: User = users_crud.get_user_by_email(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


@router.post("/access-token", response_model=token.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    users_crud.update_last_login(db, user)
    access_token = create_access_token(username=user.username, email=user.email)
    return {"access_token": access_token, "token_type": "bearer"}
