from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.controllers.user_controller import register_user, login_user
from backend.models.user import User
from backend.db.connection import user_collection
from backend.auth.utils import hash_password

router = APIRouter()

@router.post("/register-user")
def create_user(user: User):
    return register_user(user)

@router.get("/users")
def get_all_users():
    users = list(user_collection.find({}, {"_id": 0, "password": 0}))
    return users