from fastapi import APIRouter, Query
from backend.core.semantic_engine import search_titles

router = APIRouter(prefix="/api")

@router.get("/search-title")
def search_title(query: str = Query(...)):
    results = search_titles(query, top_k=5, threshold=0.5)
    if not results:
        return {
            "query": query,
            "message": "❌ Lama helin natiijo u eg!",
            "results": []
        }
    return {
        "query": query,
        "results": results
    }

