import torch
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification

class BertFakeNewsModel:
    def __init__(self):
        print("🔥 Loading local BERT model...")

        MODEL_PATH = "bert_fake_news_model"   # <-- LOCAL FOLDER

        # Load tokenizer and model from local folder
        self.tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_PATH)
        self.model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)

        self.model.eval()
        print("✅ BERT model loaded successfully!")

    def predict(self, text):
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, padding=True)

        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = torch.softmax(outputs.logits, dim=1)[0]

        prob_real = float(probs[0])
        prob_fake = float(probs[1])

        if prob_fake >= prob_real:
            label = "FAKE"
            confidence = prob_fake
        else:
            label = "REAL"
            confidence = prob_real

        return label, confidence, prob_fake, prob_real
