# ✅ backend/models/register_model.py
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class RegisterModel(BaseModel):
    group_number: str
    supervisor: str
    student_ids: List[str]
    title: str
    area: str
    year: int
    status: str = "pending"  # ✅ Add this
    timestamp: datetime = Field(default_factory=datetime.utcnow)