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

@router.delete("/delete-user/{user_id}")
def delete_user(user_id: str):
    result = user_collection.delete_one({"ID": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}