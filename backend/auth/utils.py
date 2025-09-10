from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import re

SECRET_KEY = "a-string-secret-at-least-256-bits-long"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
