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

#  Check Graduate Eligibility 
@router.get("/check-graduate/{student_id}")
async def check_graduate_eligibility(student_id: str):
    student = graduates_col.find_one({"student_id": student_id})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found in graduates list")

    grad_year = student.get("graduation_year")
    current_year = datetime.now().year

    if grad_year not in {current_year - 1, current_year, current_year + 1}:
        raise HTTPException(
            status_code=403,
            detail=f"Student not eligible to register (Grad Year: {grad_year})"
        )

    return {"eligible": True, "graduation_year": grad_year}