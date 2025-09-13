from backend.db.connection import collection
from sentence_transformers import SentenceTransformer, util
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

docs = []
vectors = None

def load_documents():
    global docs, vectors
    docs_raw = list(collection.find({}, {"_id": 0, "title": 1, "vector": 1, "year": 1, "category": 1}))
    docs = [doc for doc in docs_raw if "vector" in doc and isinstance(doc["vector"], list) and len(doc["vector"]) == 384]
    vectors = np.array([np.array(doc["vector"], dtype=np.float32) for doc in docs])

    print("📥 Loaded documents from MongoDB...")
    print("✅ Total documents:", len(docs_raw))
    print("✅ Valid vectors:", len(docs))
    print("✅ Vectors shape:", vectors.shape)

# 🟢 Auto-load markaa file-ka la import-gareeyo
load_documents()

def search_titles(query: str, top_k=5, threshold=0.5):
    if vectors is None or len(docs) == 0:
        print("❌ No vectors loaded.")
        return []
    
    query_vec = model.encode(query)
    print("🔍 Query shape:", query_vec.shape)
    print("🔍 DB vector shape:", vectors.shape)

    scores = util.cos_sim(query_vec, vectors)[0]

    # ✅ Extract all matches above threshold
    filtered = [
        {
            "title": docs[i]["title"],
            "year": docs[i].get("year", "Unknown"),
            "category": docs[i].get("category", "Unknown"),
            "score": float(scores[i])
        }
        for i in range(len(scores))
        if float(scores[i]) >= threshold
    ]