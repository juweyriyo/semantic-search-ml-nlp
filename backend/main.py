from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import semantic
from backend.routes import user_route
from backend.core import semantic_engine
from dotenv import load_dotenv
from backend.routes import dashboard
from backend.routes import category
from backend.routes import semantic_search
from backend.routes import graduation_route
from backend.routes import register_route
from backend.routes import notebook_routes
from backend.routes import report_routes
from backend.routes import submission_route  

load_dotenv(".env.local")

app = FastAPI()

# ✅ Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def load_vectors_at_startup():
    semantic_engine.load_documents()