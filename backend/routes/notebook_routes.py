from fastapi import APIRouter
from backend.models.notebook_model import NoteCreate, NoteUpdate
from backend.controllers import notebook_controller as ctrl

router = APIRouter(prefix="/api/notes", tags=["Notebook"])

@router.get("/{student_id}")
def get_notes(student_id: str):
    return ctrl.get_notes_by_student(student_id)