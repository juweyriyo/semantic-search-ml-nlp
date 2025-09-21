from pymongo import MongoClient
from dotenv import load_dotenv
import os

# ✅ Load .env file
load_dotenv()
mongo_uri = os.getenv("MONGO_URI")

# ✅ Connect to MongoDB
client = MongoClient(mongo_uri)
db = client["semantic"]

# 1. notebookStd
db.notebookStd.insert_one({"note": "Test note", "student_id": "T0001"})

# 2. projects
db.projects.insert_one({"title": "Test Project", "category": "AI", "year": 2025, "vector": [0.0]*384})