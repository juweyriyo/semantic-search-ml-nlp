from fastapi import HTTPException
from backend.db.connection import graduates_col
from backend.models.graduates_model import Graduate

def register_graduate(data: Graduate):
    if graduates_col.find_one({"student_id": data.student_id}):
        raise HTTPException(status_code=400, detail="Graduate already exists.")
    graduates_col.insert_one(data.dict())
    return {"message": "Graduate registered successfully."}

def get_all_graduates():
    return list(graduates_col.find({}, {"_id": 0}))

def update_graduate(student_id: str, data: Graduate):
    result = graduates_col.update_one({"student_id": student_id}, {"$set": data.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Graduate not found.")
    return {"message": "Graduate updated successfully."}

def delete_graduate(student_id: str):
    result = graduates_col.delete_one({"student_id": student_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Graduate not found.")
    return {"message": "Graduate deleted successfully."}