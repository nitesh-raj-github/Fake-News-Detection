from fastapi import APIRouter
from database import db

router = APIRouter(prefix="/history", tags=["History"])


@router.get("/{user_id}")
def get_history(user_id: str):
    records = list(
        db.history.find({"user_id": user_id}, {"_id": 0})
    )
    return records
