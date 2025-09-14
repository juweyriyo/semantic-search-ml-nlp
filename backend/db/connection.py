# ✅ db/connection.py

from dotenv import load_dotenv
import os
from pymongo import MongoClient

# ✅ Load environment variables
load_dotenv(dotenv_path="./backend/.env") 

# ✅ Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
# print("url",client)
print("MONGO_URI:", os.getenv("MONGO_URI"))

# ✅ Select database
db = client["semantic"]

# ✅ Select collections
collection = db["projects"]
user_collection = db["users"]
graduates_col = db["graduates"]
register_col = db["registersTitle"]
notebook_col = db["notebookStd"]

# ✅ Debug print
print("DB Name:", db.name)
print("Collections:", db.list_collection_names())

# ✅ Project functions
def get_project_titles():
    docs = collection.find({}, {"_id": 0, "Title": 1})
    return [doc["Title"] for doc in docs]

def get_sample_doc():
    return collection.find_one()

# ✅ Users functions
def get_sample_user():
    return user_collection.find_one()

# ✅ Graduates functions
def get_sample_graduate():
    return graduates_col.find_one()