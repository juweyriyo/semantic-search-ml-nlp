from fastapi import APIRouter
from backend.db.connection import collection
from collections import Counter

router = APIRouter()

@router.get("/category/top3")
def get_top3():
    docs = list(collection.find({}, {"category": 1, "_id": 0}))
    print("ciwanka🥰",docs[:5])
    counter = Counter([doc["category"] for doc in docs if "category" in doc])
    top3 = counter.most_common(3)
    return [{"category": cat, "count": cnt} for cat, cnt in top3]