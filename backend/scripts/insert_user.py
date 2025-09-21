from backend.db.connection import user_collection
from backend.auth.utils import hash_password


def insert_custom_users():
    users = [
        {
            "ID": "ID01",  # Custom ID
            "name": "Admin",
            "password": hash_password("admin123"),  # Hashed password
            "role": "Admin"
        },
        {
            "ID": "ID02",
            "name": "Test User",
            "password": hash_password("test123"),
            "role": "Student"
        }
    ]

    # ✅ Use insert_many for list of users
    user_collection.insert_many(users)
    print("✅ Custom users inserted!")

# Run the function
insert_custom_users()
