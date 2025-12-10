# 🧠 Semantic-Based Search System for Graduation Project Title Detection

A modern NLP + Machine Learning powered system designed to help universities identify previously selected graduation project titles using **semantic similarity**, instead of traditional keyword matching.  
This system supports **real-time title analysis**, **semantic recommendations**, **student registration**, **admin dashboards**, and **project analytics**.

---

## 🚀 Features
- 🔍 **Semantic Search (SBERT + Cosine Similarity)**  
  Detects similar project titles even when wordings are different.

- 🎓 **Student Registration & Authentication**  
  Multi–step project submission with real-time feedback.

- 🛠️ **Admin Dashboard**  
  Approves/Rejects student submissions & manages project records.

- 📊 **Analytics & Insights**  
  - Most frequent project categories  
  - Yearly submission trends  
  - Category comparison charts  
  - Word cloud generation  

- 🌐 **Modern Web Architecture**  
  FastAPI backend, Next.js frontend, MongoDB storage.

---

## 🧬 System Architecture
The system follows a **client–server architecture**:

<img src="https://github.com/user-attachments/assets/d3591b06-f98a-4e6b-8c79-5dc81e3664c9" width="350"/>

## Frontend (Next.js) → FastAPI Backend → SBERT Model → MongoDB

Semantic search flow:
1. User enters project title  
2. Title is preprocessed & vectorized using SBERT  
3. System compares embeddings with existing database  
4. Cosine similarity returns:  
   - Exact match  
   - Close semantic matches  
   - Or suggests registration if new  

---

## 🧠 Machine Learning Pipeline

### 1️⃣ Dataset Preparation  
- Cleaning missing values  
- Tokenization  
- Removing duplicates  
- Exploratory visualization  

### 2️⃣ Model  
- Sentence-BERT embedding model  
- Cosine similarity scoring  
- Threshold-based matching  

### 3️⃣ Evaluation  
- Accuracy  
- Similarity variability  
- Title matching correctness  

---

## 🛠️ Tech Stack

### **Frontend**
- Next.js  
- React  
- TailwindCSS  

### **Backend**
- FastAPI  
- Python  
- SBERT (Sentence-BERT)  
- Cosine Similarity  

### **Database**
- MongoDB  
- Mongoose-like schema organization  

### **Other Tools**
- Matplotlib  
- Pandas  
- JWT Authentication  

---

## 📦 Installation & Setup

### 1️⃣ Clone the Project
```bash
git clone https://github.com/your-username/semantic-search-system.git
cd semantic-search-system
```
### 2️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
### 4️⃣ Environment Variables
- Create .env files for both backend and frontend:
```bash
MONGO_URI=your_database_url
SECRET_KEY=jwt_secret
MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
```
## 📘 Usage
🔍 Search for Similar Titles

Go to Semantic Search Page

Enter your project title

View similarity score + suggested alternatives

🎓 Submit a New Title

Complete the 3-step form

System checks duplicates

Admin reviews & approves

🔐 Admin Panel

View all submissions

Manage registered students

View analytics & reports
## 📸 Screenshots
<img src="https://github.com/user-attachments/assets/5f7fca6a-f4a7-48f6-8276-e5561ef5a406" width="180"/>






