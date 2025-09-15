from pydantic import BaseModel
from typing import Literal

class User(BaseModel):
    id: str
    name: str
    password: str
    role: Literal["admin", "student"]
