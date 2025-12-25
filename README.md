# 📰 NewsGuard – Fake News Detection System

An AI-powered Fake News Detection web application that classifies news as **Real or Fake** using **Machine Learning & NLP**, with a modern React frontend and FastAPI backend.

---

## 🚀 Features
- Fake vs Real news classification
- NLP-based text preprocessing
- Machine Learning prediction model
- REST API using FastAPI
- Modern, responsive React UI
- Secure handling of API keys
- Clean and scalable project structure

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Vite
- Bootstrap

**Backend**
- Python
- FastAPI
- Scikit-learn
- NLP (TF-IDF, text cleaning)

---

## 📂 Project Structure


## 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000

📊 Dataset

Due to GitHub size limits, datasets are not included in the repository.

You can use public datasets from Kaggle:

Fake News Dataset

LIAR Dataset

🔐 Security Note

.env files and API keys are excluded using .gitignore

No secrets are committed to the repository

🔮 Future Enhancements

Multilingual fake news detection

Deep learning models (LSTM, BERT)

Browser extension

Live fact-checking integration

👨‍💻 Author

Nitesh Raj
GitHub: https://github.com/nitesh-raj-github
