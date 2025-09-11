from fastapi import HTTPException
from backend.db.connection import notebook_col
from backend.models.notebook_model import NoteCreate, NoteUpdate
from bson import ObjectId
from datetime import datetime

def get_notes_by_student(student_id: str):
    notes = notebook_col.find({"student_id": student_id}).sort("timestamp", -1)
    return [
        {"id": str(note["_id"]), "note": note["note"], "timestamp": note["timestamp"]}
        for note in notes
    ]

def create_note(note: NoteCreate):
    notebook_col.insert_one({
        "student_id": note.student_id,
        "note": note.note,
        "timestamp": datetime.now()
    })
    return {"msg": "Note saved"}