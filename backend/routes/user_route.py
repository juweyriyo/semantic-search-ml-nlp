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

@router.put("/update-user/{user_id}")
def update_user(user_id: str, user: User):
    update_data = user.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["password"] = hash_password(update_data["password"])
    result = user_collection.update_one({"ID": user_id}, {"$set": update_data})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not updated")
    return {"message": "User updated"}

class LoginRequest(BaseModel):
    user_id: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    return login_user(data.user_id, data.password)