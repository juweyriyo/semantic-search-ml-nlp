from fastapi import APIRouter, HTTPException
from backend.db.connection import collection
from backend.utils.embedding import get_similar_titles

router = APIRouter()

@router.post("/semantic-search")
async def semantic_search(payload: dict):
    title = payload.get("title")
    threshold = payload.get("threshold", 0.55)

    if not title:
        raise HTTPException(status_code=400, detail="Title is required")

    raw_docs = list(collection.find({}, {"_id": 0, "title": 1, "category": 1, "year": 1, "vector": 1}))
    if not raw_docs:
        return {"matches": [], "max_score": 0.0, "match_found": False}

    results, max_score = get_similar_titles(title, raw_docs, threshold)

    return {
        "matches": results,
        "max_score": max_score,
        "match_found": bool(results)
    }

