from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime

from backend.models.register_model import RegisterModel
from backend.db.connection import register_col, graduates_col
from backend.controllers.register_controller import register_project_controller
from backend.controllers.accept_controller import accept_project_controller
from backend.auth.auth_bearer import JWTBearer, get_current_user

router = APIRouter()

# Register New Project 
@router.post("/register-project")
async def register_project(data: RegisterModel):
    try:
        return await register_project_controller(data)
    except HTTPException as e:
        print("❌ ERROR:", e.detail)
        raise e
    
# Check Student Group 
@router.get("/check-student/{student_id}")
async def check_student_group(student_id: str):
    submissions = list(register_col.find({"student_ids": student_id}, {"_id": 0}))
    if not submissions:
        return {"message": "Student not registered in any group"}

    accepted = next((s for s in submissions if s.get("status") == "accepted"), None)
    if accepted:
        accepted["status"] = "accepted"
        return accepted

    return submissions[0]