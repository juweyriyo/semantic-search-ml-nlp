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

# Routers
app.include_router(semantic.router)
app.include_router(user_route.router)  # ✅ Added login routes
app.include_router(dashboard.router)
app.include_router(category.router)
app.include_router(semantic_search.router)
app.include_router(register_route.router, prefix="/api")
app.include_router(notebook_routes.router)
app.include_router(report_routes.router)
app.include_router(submission_route.router, prefix="/api")
app.include_router(graduation_route.router)
# app.include_router(accept_route, prefix="/api")

@app.get("/")
def read_root():
    return {
        "message": "✅ Semantic Search API is Running"
    }

@app.get("/test-db")
def test_db():
    from backend.db.connection import collection
    return {
        "count": collection.count_documents({}),
        "sample": collection.find_one()
    }