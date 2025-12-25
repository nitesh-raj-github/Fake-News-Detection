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
