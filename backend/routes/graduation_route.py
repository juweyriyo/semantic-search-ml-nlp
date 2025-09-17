from fastapi import APIRouter
from backend.models.graduates_model import Graduate
from backend.controllers import graduation_controller
from backend.db.connection import graduates_col
from fastapi import APIRouter, HTTPException
from bson import ObjectId

router = APIRouter()

