from fastapi import HTTPException
from backend.models.register_model import RegisterModel
from backend.db.connection import register_col, graduates_col
from fastapi.encoders import jsonable_encoder


async def register_project_controller(data: RegisterModel):
    # ✅ Only allow graduates from the correct year
    allowed_ids = [
        grad["student_id"].strip().upper()
        for grad in graduates_col.find({"graduation_year": data.year})
    ]

    for sid in data.student_ids:
        if sid.strip().upper() not in allowed_ids:
            raise HTTPException(
                status_code=400,
                detail=f"Student ID {sid} is not eligible for graduation year {data.year}",
            )