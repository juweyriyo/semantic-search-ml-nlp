from pydantic import BaseModel
from datetime import datetime

class NoteCreate(BaseModel):
    student_id: str
    note: str

class NoteUpdate(BaseModel):
    note: str

class NoteResponse(BaseModel):
    id: str
    note: str
    timestamp: datetime
