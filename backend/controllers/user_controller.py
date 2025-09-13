from fastapi import HTTPException
from backend.auth.utils import hash_password, verify_password, create_access_token
from backend.models.user import User
from backend.db.connection import user_collection

def register_user(user: User):
    if user_collection.find_one({"ID": user.id}):
        raise HTTPException(status_code=400, detail="User already exists")
    
    new_user = {
        "ID": user.id,
        "name": user.name,
        "password": hash_password(user.password),
        "role": user.role
    }