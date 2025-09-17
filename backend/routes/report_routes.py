from fastapi import APIRouter
from backend.controllers import report_controller

router = APIRouter()
router.include_router(report_controller.router)
