# backend/controllers/submission_controller.py
from backend.db.connection import register_col
from fastapi import HTTPException

def get_all_submissions_grouped():
    data = list(register_col.find({}, {"_id": 0}))
    if not data:
        return {}
    
    grouped = {}
    for entry in data:
        group = entry["group_number"]
        grouped.setdefault(group, []).append(entry)
    return grouped

def accept_submission(title: str, group_number: str):
    existing = list(register_col.find({"group_number": group_number}))
    for doc in existing:
        if doc["title"] == title:
            register_col.update_one({"title": title}, {"$set": {"status": "accepted"}})
        else:
            register_col.delete_one({"_id": doc["_id"]})
    return {"message": f"✅ '{title}' has been accepted for group {group_number}."}