from fastapi import APIRouter
from database import db

router = APIRouter(prefix="/history", tags=["History"])


@router.post("/")
def save_history(user_id: str, text: str, result: str):
    db.history.insert_one({
        "user_id": user_id,
        "text": text,
        "result": result
    })
    return {"status": "saved"}


@router.get("/{user_id}")
def get_history(user_id: str):
    records = list(db.history.find(
        {"user_id": user_id},
        {"_id": 0}
    ))
    return records
