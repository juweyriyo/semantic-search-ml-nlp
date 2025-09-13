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