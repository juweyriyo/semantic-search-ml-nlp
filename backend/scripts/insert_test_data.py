from pymongo import MongoClient
from dotenv import load_dotenv
import os

# ✅ Load .env file
load_dotenv()
mongo_uri = os.getenv("MONGO_URI")