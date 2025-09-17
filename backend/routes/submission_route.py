# backend/routes/submission_route.py
from fastapi import APIRouter
from backend.controllers.submission_controller import get_all_submissions_grouped, accept_submission

router = APIRouter()

@router.get("/submissions")
async def get_submissions():
    return get_all_submissions_grouped()

@router.post("/submissions/accept")
async def accept_title(data: dict):
    title = data.get("title")
    group = data.get("group_number")
    if not title or not group:
        return {"message": "Missing title or group_number"}
    return accept_submission(title, group)
