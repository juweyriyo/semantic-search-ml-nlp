import numpy as np
from sentence_transformers import util
from backend.models.semantic_model import model

def get_similar_titles(title: str, db_vectors: list, threshold: float = 0.55):
    title_vector = model.encode(title, convert_to_tensor=True)
    vectors = [np.array(doc["vector"], dtype=np.float32) for doc in db_vectors]

    similarities = util.cos_sim(title_vector, vectors)[0].cpu().numpy()
    for i, score in enumerate(similarities):
        db_vectors[i]["score"] = float(score)

    results = [doc for doc in db_vectors if doc["score"] >= threshold]
    results.sort(key=lambda x: x["score"], reverse=True)