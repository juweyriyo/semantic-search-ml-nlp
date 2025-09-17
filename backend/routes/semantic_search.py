from fastapi import APIRouter, HTTPException
from backend.db.connection import collection
from backend.utils.embedding import get_similar_titles

router = APIRouter()


