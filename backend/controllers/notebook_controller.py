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

def update_note(note_id: str, update: NoteUpdate):
    res = notebook_col.update_one(
        {"_id": ObjectId(note_id)},
        {"$set": {"note": update.note}}
    )
    if res.modified_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"msg": "Note updated"}

def delete_note(note_id: str):
    res = notebook_col.delete_one({"_id": ObjectId(note_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"msg": "Note deleted"}