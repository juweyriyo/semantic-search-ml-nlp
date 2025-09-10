from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import re

SECRET_KEY = "a-string-secret-at-least-256-bits-long"
ALGORITHM = "HS256"