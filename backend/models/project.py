from pydantic import BaseModel, Field
from typing import List

class ProjectSchema(BaseModel):
    ID: str
    Title: str
    cleaned_title: str
    Category: str
    Year: int
    vector: List[float] = Field(..., min_items=384, max_items=384)
