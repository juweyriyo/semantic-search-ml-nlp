import numpy as np
from sentence_transformers import util
from backend.models.semantic_model import model

def get_similar_titles(title: str, db_vectors: list, threshold: float = 0.55):
    title_vector = model.encode(title, convert_to_tensor=True)
    vectors = [np.array(doc["vector"], dtype=np.float32) for doc in db_vectors]