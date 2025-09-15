from pydantic import BaseModel

class Graduate(BaseModel):
    student_id: str
    name: str
    department: str
    graduation_year: int
