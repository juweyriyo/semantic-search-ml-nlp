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

# 3. graduates
db.graduates.insert_one({"student_id": "G0001", "name": "Test Graduate", "year": 2025})

# 4. users
db.users.insert_one({"id": "U0001", "name": "Test User", "role": "student", "password": "test123"})

# 5. registersTitle
db.registersTitle.insert_one({"title": "Dummy Title", "group_id": "GR001", "status": "pending"})

print("✅ Test documents inserted into all collections!")
