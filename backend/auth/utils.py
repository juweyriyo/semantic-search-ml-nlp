from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import re

SECRET_KEY = "a-string-secret-at-least-256-bits-long"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
