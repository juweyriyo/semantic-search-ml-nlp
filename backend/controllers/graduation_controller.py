from fastapi import HTTPException
from backend.db.connection import graduates_col
from backend.models.graduates_model import Graduate

def register_graduate(data: Graduate):
    if graduates_col.find_one({"student_id": data.student_id}):
        raise HTTPException(status_code=400, detail="Graduate already exists.")
    graduates_col.insert_one(data.dict())
    return {"message": "Graduate registered successfully."}