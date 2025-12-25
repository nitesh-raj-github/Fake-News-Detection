from fastapi import APIRouter
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
import requests
from utils.ai import ask_ai  # your Groq/LLM wrapper

router = APIRouter()

YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"

class VideoInput(BaseModel):
    url: str

def extract_video_id(url: str):
    import re
    pattern = r"(?:v=|youtu\.be/|shorts/)([\w-]+)"
    match = re.search(pattern, url)
    return match.group(1) if match else None

@router.post("/video-analyze")
async def analyze_video(data: VideoInput):
    video_id = extract_video_id(data.url)
    if not video_id:
        return {"error": "Invalid YouTube URL"}

    # Fetch transcript
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = " ".join([t["text"] for t in transcript])
    except:
        transcript_text = "Transcript unavailable."

    # Metadata
    meta_url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_id}&key={YOUTUBE_API_KEY}"
    meta = requests.get(meta_url).json()
    description = meta["items"][0]["snippet"]["description"]

    prompt = f"""
    Analyze this YouTube video for misinformation:

    TRANSCRIPT:
    {transcript_text}

    DESCRIPTION:
    {description}

    Return:
    - Final verdict (TRUE / FALSE / MISLEADING / UNVERIFIED)
    - Confidence %
    - Key claims detected
    - Fake content risk level
    - Summary
    """

    ai_output = ask_ai(prompt)

    return {
        "video_id": video_id,
        "analysis": ai_output
    }
