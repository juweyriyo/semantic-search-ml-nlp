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