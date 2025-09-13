# backend/controllers/submission_controller.py
from backend.db.connection import register_col
from fastapi import HTTPException

def get_all_submissions_grouped():
    data = list(register_col.find({}, {"_id": 0}))
    if not data:
        return {}