from fastapi import APIRouter
from backend.db.connection import collection
from bson import json_util
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/api/report", tags=["Report"])
