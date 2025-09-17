from fastapi import APIRouter
from backend.models.graduates_model import Graduate
from backend.controllers import graduation_controller
from backend.db.connection import graduates_col
from fastapi import APIRouter, HTTPException
from bson import ObjectId

router = APIRouter()

@router.post("/register-graduate")
def register(data: Graduate):
    return graduation_controller.register_graduate(data)

@router.get("/graduates")
def get_all():
    return graduation_controller.get_all_graduates()

@router.put("/update-graduate/{student_id}")
def update(student_id: str, data: Graduate):
    return graduation_controller.update_graduate(student_id, data)

@router.delete("/delete-graduate/{user_id}")
def delete_user(user_id: str):
    result = graduates_col.delete_one({"ID": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}