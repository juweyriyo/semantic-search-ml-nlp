from fastapi import APIRouter
from backend.models.notebook_model import NoteCreate, NoteUpdate
from backend.controllers import notebook_controller as ctrl

router = APIRouter(prefix="/api/notes", tags=["Notebook"])

