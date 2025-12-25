
# Fake News Detector Backend (Python + FastAPI)

## 🔧 Setup

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
# source venv/bin/activate

pip install -r requirements.txt
```

## ▶️ Run the API

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

- Health check: `GET http://127.0.0.1:8000/health`
- Prediction: `POST http://127.0.0.1:8000/predict`

Body (JSON):

```json
{
  "text": "Paste your news article here"
}
```

Response (example):

```json
{
  "label": "FAKE",
  "confidence": 0.92,
  "prob_fake": 0.92,
  "prob_real": 0.08
}
```

⚠️ **Important**: This model is trained on a tiny demo dataset.  
For real-world accuracy, retrain the model using a proper fake/real news dataset.
