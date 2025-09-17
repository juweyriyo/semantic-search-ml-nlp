from fastapi import APIRouter
from backend.models.notebook_model import NoteCreate, NoteUpdate
from backend.controllers import notebook_controller as ctrl

router = APIRouter(prefix="/api/notes", tags=["Notebook"])

@router.get("/{student_id}")
def get_notes(student_id: str):
    return ctrl.get_notes_by_student(student_id)

@router.post("/")
def create_note(note: NoteCreate):
    return ctrl.create_note(note)

@router.put("/{note_id}")
def update_note(note_id: str, note: NoteUpdate):
    return ctrl.update_note(note_id, note)