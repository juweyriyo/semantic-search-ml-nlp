# ✅ db/connection.py

from dotenv import load_dotenv
import os
from pymongo import MongoClient

# ✅ Load environment variables
load_dotenv(dotenv_path="./backend/.env") 