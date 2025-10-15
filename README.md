# 🎓 Semantic Search System for Graduation Projects

This is a **Semantic Search System** built using **Machine Learning (ML)** and **Natural Language Processing (NLP)** to help university students quickly check whether their proposed **graduation project title** has already been submitted before.

## 🌍 Overview

Traditionally, students submit project titles manually and wait days for approval. This system automates that process using **semantic understanding** — not just keyword matching.  
Even if students write titles in different wording, the system understands the *meaning* and finds similar previously submitted titles within seconds.

## 🧠 How It Works

1. **Student Login** – Students log in using their name and student ID.  
2. **Search Project Title** – The system encodes the title using **Sentence-BERT (SBERT)** embeddings.  
3. **Semantic Comparison** – It compares the new title with all previously submitted titles using **cosine similarity**.  
4. **Results Display**  
   - If a similar title exists → it shows the match.  
   - If no similar title → allows registration of a new project.  
5. **Registration Form** – A multi-step form to register new projects (Group Info → Project Title → Category → Confirmation).  
6. **Admin Dashboard** – Admins can view all registered projects and analyze yearly trends.

## ⚙️ System Architecture

User Input → NLP Preprocessing → SBERT Embeddings → Cosine Similarity → Results
↓
Database (MongoDB)
↓
Admin & Visualization Panel

pgsql
Copy code

## 🧩 Technologies Used

| Component | Technology | Purpose |
|------------|-------------|----------|
| Frontend | Streamlit / Next.js | Simple, modern user interface |
| Backend | FastAPI | RESTful API for model & database |
| Model | Sentence-BERT (SBERT) | Semantic text embeddings |
| Database | MongoDB | Store project titles & user data |
| Visualization | Matplotlib / Plotly | Project trends & analytics |

## 📊 Features

- 🔍 **Semantic Search** for project titles  
- 🧾 **Multi-step Registration Form**  
- 🧑‍🎓 **Student Authentication** (by name & ID)  
- 📈 **Category & Trend Visualization**  
- 🔐 **Role-based Access** (Student / Admin)  

## 🧰 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/semantic-search-system.git
   cd semantic-search-system
Create a Virtual Environment

bash
Copy code
python -m venv semantic-env
source semantic-env/bin/activate   # (Linux/Mac)
semantic-env\Scripts\activate      # (Windows)
Install Dependencies

bash
Copy code
pip install -r requirements.txt
Run the Backend

bash
Copy code
uvicorn main:app --reload
Run the Frontend (if using Streamlit)

bash
Copy code
streamlit run app.py
Access the App

arduino
Copy code
http://localhost:8501
📁 Folder Structure
pgsql
Copy code
semantic-search-system/
│
├── backend/
│   ├── main.py
│   ├── models/
│   ├── routes/
│   └── database/
│
├── frontend/
│   ├── pages/
│   ├── components/
│   └── styles/
│
├── data/
│   └── projects.csv
│
├── notebooks/
│   └── model_training.ipynb
│
├── README.md
└── requirements.txt
📚 Model Description
The system uses Sentence-BERT (SBERT) to generate semantic embeddings of project titles.
SBERT transforms each title into a numerical vector representation that captures meaning.
Using cosine similarity, it finds titles with similar semantic meaning even if the words differ.

Example:

Title A	Title B	Similarity
AI-based Plagiarism Detection	Detecting Copied Projects Using Machine Learning	0.89 ✅
