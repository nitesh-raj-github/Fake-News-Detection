print("🔥🔥 RUNNING THIS EXACT APP.PY FILE 🔥🔥")

import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from groq import Groq

# ===================== LOAD ENV =====================
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("❌ GROQ_API_KEY not found in .env file")

# ===================== CREATE APP =====================
app = FastAPI(title="NewsGuard Backend")

# ===================== CORS =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================== ROUTERS =====================
from routes import history, chat

app.include_router(history.router)
app.include_router(chat.router)

# ===================== ML MODEL =====================
from pkl_model import PklFakeNewsModel
model = PklFakeNewsModel()

# ===================== GROQ CLIENT =====================
groq_client = Groq(api_key=GROQ_API_KEY)

# ===================== REQUEST MODELS =====================
class NewsItem(BaseModel):
    text: str

class VideoCheckRequest(BaseModel):
    url: str
    claim: Optional[str] = None

# ===================== NEWS PREDICTION =====================
@app.post("/predict")
def predict_news(news: NewsItem):
    text = news.text.strip()
    if not text:
        return {"error": "News text cannot be empty"}

    result = model.predict(text)
    print("ML RESULT:", result)
    return result

# ===================== FACT CHECK (AI) =====================
@app.post("/factcheck")
def fact_check(news: NewsItem):
    prompt = f"""
You are a professional fact-checking AI.

Analyze this claim:
"{news.text}"

Respond with:
- Truth rating (TRUE / FALSE / MISLEADING / UNVERIFIED)
- Explanation
- Correct information
- Reliable sources
"""

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
        )
        return {"analysis": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}

# ===================== VIDEO CHECK =====================
@app.post("/video-check")
def video_check(data: VideoCheckRequest):
    prompt = f"""
Analyze this video for misinformation.

URL: {data.url}
CLAIM: {data.claim}

Steps:
1. Identify topic
2. Check for misinformation
3. Give truth rating
4. Final verdict
"""

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
        )
        return {"analysis": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}

# ===================== IMAGE CHECK =====================
from image_utils import encode_image_to_base64, download_image_as_base64

@app.post("/image-detect")
async def detect_image(file: UploadFile = File(None), url: str = Form(None)):
    try:
        if file:
            img_b64 = encode_image_to_base64(file)
            source = "uploaded image"
        elif url:
            img_b64 = download_image_as_base64(url)
            source = f"URL: {url}"
        else:
            return {"error": "No image provided"}

        prompt = f"""
You are an AI forensic image detector.

Analyze the image and provide:
- Real / AI / Deepfake
- Signs of manipulation
- Confidence score
- Simple explanation

Source: {source}
"""

        response = groq_client.chat.completions.create(
            model="llava-v1.5-7b",
            messages=[
                {"role": "system", "content": "You are an expert forensic AI"},
                {"role": "user", "content": prompt},
                {
                    "role": "user",
                    "content": [
                        {"type": "input_text", "text": "Analyze image"},
                        {
                            "type": "input_image",
                            "image_url": f"data:image/jpeg;base64,{img_b64}",
                        },
                    ],
                },
            ],
        )

        return {"analysis": response.choices[0].message.content}

    except Exception as e:
        return {"error": str(e)}

# ===================== HEALTH =====================
@app.get("/health")
def health():
    return {"status": "Backend running successfully"}
