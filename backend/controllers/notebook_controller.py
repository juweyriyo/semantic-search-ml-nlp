from fastapi import HTTPException
from backend.db.connection import notebook_col
from backend.models.notebook_model import NoteCreate, NoteUpdate
from bson import ObjectId
from datetime import datetime
