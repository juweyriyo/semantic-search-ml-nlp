from fastapi import APIRouter, Query
from backend.core.semantic_engine import search_titles

router = APIRouter(prefix="/api")



