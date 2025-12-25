
# NewsGuard – Fake News Detector Website

Stack:
- **Frontend**: React + Vite + Bootstrap (fully responsive, modern glassmorphism UI)
- **Backend**: Python + FastAPI + simple ML model (scikit-learn)

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
```

API runs at: `http://127.0.0.1:8000`

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://127.0.0.1:5173`

Make sure the backend is running before testing.

## 🔬 Note on the Model

The included model is a small **demo** model trained on a tiny sample dataset
inside `backend/model.py`. For real accuracy:

- Replace the training data with a proper fake/real news dataset.
- Retrain the model and save it (or update the code to load your pickle model).
