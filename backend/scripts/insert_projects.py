import pandas as pd
from backend.db.connection import collection
from backend.models.project import ProjectSchema

df = pd.read_csv("backend/data/projects.csv")
