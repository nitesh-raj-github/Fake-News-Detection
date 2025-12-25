from fastapi import APIRouter
from pydantic import BaseModel
from services.groq_service import ask_groq

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat_bot(req: ChatRequest):
    reply = ask_groq(
        f"You are a helpful assistant for a Fake News Detection website. "
        f"Answer clearly and simply.\nUser: {req.message}"
    )
    return {"reply": reply}
