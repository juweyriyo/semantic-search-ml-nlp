from fastapi import APIRouter
from backend.db.connection import collection
from bson import json_util
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/api/report", tags=["Report"])
async def get_report():
    try:
        data = list(collection.find({}, {"_id": 0, "vector": 0, "cleaned_title": 0}))
        return JSONResponse(content=json_util.loads(json_util.dumps(data)))
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})