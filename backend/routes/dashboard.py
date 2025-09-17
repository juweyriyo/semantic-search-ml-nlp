from fastapi import APIRouter
from backend.db.connection import collection
from collections import Counter

router = APIRouter()

@router.get("/top3")
def top_3_categories():
    docs = list(collection.find({}, {"category": 1, "_id": 0}))
    print("DOCS:", docs[:5])  # ← waxyaabaha la helay
    categories = [doc["category"] for doc in docs if "category" in doc]
    print("CATEGORIES:", categories[:5])  # ← hubi haddii ay buuxaan
    count = Counter(categories)
    top3 = count.most_common(3)
    return [{"category": cat, "count": cnt} for cat, cnt in top3]

