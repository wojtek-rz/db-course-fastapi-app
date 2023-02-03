from fastapi import APIRouter, Depends, HTTPException
from ..crud import users_crud
from ..schemas.user import User, UserCreate, UserMe, UserInList
from ..database import get_db, Session
from ..security import get_password_hash, get_current_user

router = APIRouter()


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = users_crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return users_crud.create_user(db=db, user=user, hashed_password=get_password_hash(user.password))


@router.get("/", response_model=list[UserInList])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = users_crud.get_users(db, skip=skip, limit=limit)
    return users


@router.get("/me", response_model=UserMe)
def read_user_me(user=Depends(get_current_user)):
    return user

@router.get("/top-users", response_model=list[tuple[UserInList, int, int]])
def read_user_me(db: Session = Depends(get_db)):
    return [(user, likes, count) for user, likes, count in users_crud.get_top_users(db)]


@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = users_crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# prone to errors
@router.delete("/{user_id}", response_model=User)
def remove_user(user_id: int, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    db_user = users_crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user != current_user:
        raise HTTPException(status_code=403, detail="You can't delete other user")
    return users_crud.remove_user(db=db, user_id=user_id)


@router.post("/{user_id}/observe", response_model=UserInList)
def add_oberved_user(
        user_id: int, user_me = Depends(get_current_user),  db: Session = Depends(get_db)
):
    print(user_id)
    db_user = users_crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user in user_me.observed_users:
        raise HTTPException(status_code=400, detail="User already observed")
    
    return users_crud.add_observed_user(db=db, user=user_me, observed_user=db_user)


@router.delete("/{user_id}/observe", response_model=UserInList)
def remove_oberved_user(
        user_id: int, user_me = Depends(get_current_user),  db: Session = Depends(get_db)
):
    db_user = users_crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user not in user_me.observed_users:
        raise HTTPException(status_code=400, detail="User not observed")
    
    return users_crud.remove_observed_user(db=db, user=user_me, observed_user=db_user)