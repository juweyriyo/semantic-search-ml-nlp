from fastapi import HTTPException
from backend.models.register_model import RegisterModel
from backend.db.connection import register_col, graduates_col
from fastapi.encoders import jsonable_encoder


