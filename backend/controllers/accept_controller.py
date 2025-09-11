from sentence_transformers import SentenceTransformer
from backend.auth.utils import clean_text
from backend.db.connection import register_col, collection
from bson import ObjectId

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')  # ✅ Load once globally

async def accept_project_controller(group_id: str):
    print("📥 Received group_id:", group_id)

    # ✅ Find group using group_number (not _id)
    group = register_col.find_one({"group_number": group_id})
    if not group:
        raise Exception("❌ Group not found")
    
    # ✅ Use existing vector or generate new
    vector = group.get("vector")
    if not vector or len(vector) != 384:
        vector = model.encode(group["title"]).tolist()

    # ✅ Generate new project ID
    last = collection.find_one(sort=[("id", -1)])
    last_id = int(last["id"].replace("TH", "")) if last else 0
    new_id = f"TH{str(last_id + 1).zfill(3)}"

    # ✅ Insert into `projects`
    project_doc = {
        "id": new_id,
        "title": group["title"],
        "cleaned_title": clean_text(group["title"]),
        "category": group["area"],
        "year": group["year"],
        "vector": vector,
    }
    collection.insert_one(project_doc)

    # ✅ Update status to accepted
    register_col.update_one({"group_number": group_id}, {"$set": {"status": "accepted"}})

    # ✅ Delete other pending in same group
    register_col.delete_many({
        "group_number": group["group_number"],
        "_id": {"$ne": group["_id"]}
    })

    return {"success": True, "project_id": new_id}