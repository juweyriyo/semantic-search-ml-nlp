import pandas as pd
from backend.db.connection import collection
from backend.models.project import ProjectSchema

df = pd.read_csv("backend/data/projects.csv")

records = []
for _, row in df.iterrows():
    try:
        project = ProjectSchema(
            ID=row["ID"],
            Title=row["Title"],
            cleaned_title=row["cleaned_title"],
            Category=row["Category"],
            Year=int(row["Year"]),
            vector=row["vector"] if isinstance(row["vector"], list) else eval(row["vector"])
        )

        # ✅ Convert PascalCase to lowercase keys
        doc = {
            "id": project.ID,
            "title": project.Title,
            "cleaned_title": project.cleaned_title,
            "category": project.Category,
            "year": project.Year,
            "vector": project.vector
        }

        records.append(doc)

    except Exception as e:
        print(f"❌ Validation failed for row {_}: {e}")

if records:
    collection.insert_many(records)
    print(f"✅ Inserted {len(records)} clean documents into MongoDB.")
else:
    print("⚠️ No valid records to insert.")