from backend.db.connection import graduates_col
from datetime import datetime

def is_graduating_this_year(student_id: str):
    doc = graduates_col.find_one({"student_id": student_id})
    if not doc:
        return False, f"❌ Student ID {student_id} not found in graduation list."
    
    current_year = datetime.now().year
    if doc["graduation_year"] in {current_year - 1, current_year, current_year + 1}:
        return True, ""
    else:
        return False, f"❌ Student ID {student_id} is not allowed (Graduation Year: {doc['graduation_year']})."
