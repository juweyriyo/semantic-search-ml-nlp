# backend/routes/submission_route.py
from fastapi import APIRouter
from backend.controllers.submission_controller import get_all_submissions_grouped, accept_submission

router = APIRouter()


