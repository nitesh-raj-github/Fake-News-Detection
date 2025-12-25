import pickle
import re
import string

class PklFakeNewsModel:
    def __init__(self):
        print("🔥 Loading pickle model fake_news_model.pkl ...")

        with open("fake_news_model.pkl", "rb") as f:
            self.pipeline = pickle.load(f)

        self.vectorizer = self.pipeline.named_steps["tfidf"]
        self.classifier = self.pipeline.named_steps["clf"]

        print("✅ Pickle model loaded successfully!")
        print("📌 Model classes:", self.classifier.classes_)

    def _clean_text(self, text):
        text = str(text).lower()
        text = re.sub(r"\d+", "", text)
        text = text.translate(str.maketrans("", "", string.punctuation))
        text = re.sub(r"\s+", " ", text)
        return text.strip()

    def predict(self, text):
        text = self._clean_text(text)

        if not text:
            return {
                "label": "UNKNOWN",
                "confidence": 0.0,
                "prob_fake": 0.0,
                "prob_real": 0.0
            }

        vec = self.vectorizer.transform([text])

        if vec.nnz == 0:
            return {
                "label": "UNKNOWN",
                "confidence": 0.0,
                "prob_fake": 0.0,
                "prob_real": 0.0
            }

        proba = self.classifier.predict_proba(vec)[0]

        prob_real = float(proba[0])
        prob_fake = float(proba[1])

        if prob_fake >= prob_real:
            label = "FAKE"
            confidence = prob_fake
        else:
            label = "REAL"
            confidence = prob_real

        return {
            "label": label,
            "confidence": round(confidence, 4),
            "prob_fake": round(prob_fake, 4),
            "prob_real": round(prob_real, 4)
        }
