from fastapi import HTTPException
from backend.auth.utils import hash_password, verify_password, create_access_token
from backend.models.user import User
from backend.db.connection import user_collection

