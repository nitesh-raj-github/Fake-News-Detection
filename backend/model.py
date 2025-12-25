import os
import pickle
from typing import Tuple


class FakeNewsModel:
    """
    Loads the trained fake-news model from fake_news_model.pkl
    and exposes a predict(text) method.
    """

    def __init__(self) -> None:
        # Path of this file (model.py)
        base_dir = os.path.dirname(os.path.abspath(__file__))

        # Model file in the same folder
        model_path = os.path.join(base_dir, "fake_news_model.pkl")

        if not os.path.exists(model_path):
            raise FileNotFoundError(
                f"Model file not found at {model_path}. "
                f"Make sure you ran train_model.py successfully."
            )

        with open(model_path, "rb") as f:
            self.pipeline = pickle.load(f)

        print("✅ Loaded trained fake-news model from fake_news_model.pkl")

    def predict(self, text: str) -> Tuple[str, float, float, float]:
        # Get probabilities: [prob_real, prob_fake]
        proba = self.pipeline.predict_proba([text])[0]
        prob_real = float(proba[0])
        prob_fake = float(proba[1])

        if prob_fake >= prob_real:
            label = "FAKE"
            confidence = prob_fake
        else:
            label = "REAL"
            confidence = prob_real

        return label, float(confidence), prob_fake, prob_real
