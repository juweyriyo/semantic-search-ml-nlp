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