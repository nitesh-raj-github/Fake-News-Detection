import pandas as pd
import re
import string
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import pickle

# ================= LOAD DATA =================

fake = pd.read_csv("data/Fake.csv")
true = pd.read_csv("data/True.csv")
india = pd.read_csv("data/Indian_Multilingual_100k.csv")

# Labels (KEEP CONSISTENT)
fake["label"] = 1   # FAKE
true["label"] = 0   # REAL
india["label"] = india["label"].map({"FAKE": 1, "REAL": 0})

# Merge title + text if needed
if "title" in fake.columns:
    fake["text"] = fake["title"].astype(str) + " " + fake["text"].astype(str)
if "title" in true.columns:
    true["text"] = true["title"].astype(str) + " " + true["text"].astype(str)

# Keep only required columns
fake = fake[["text", "label"]]
true = true[["text", "label"]]
india = india[["text", "label"]]

# Combine datasets
df = pd.concat([fake, true, india], ignore_index=True)
df = df.sample(frac=1).reset_index(drop=True)

print("Total dataset size:", df.shape)

# ================= CLEANING (MULTILINGUAL SAFE) =================

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"\d+", "", text)
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\s+", " ", text)
    return text.strip()

df["text"] = df["text"].apply(clean_text)

# ================= TRAIN / TEST SPLIT =================

X = df["text"]
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.15,
    random_state=42,
    stratify=y
)

# ================= PIPELINE =================
# ❌ NO stopwords -> better for Hindi + Hinglish

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(
        max_features=60000,
        ngram_range=(1, 2),
        min_df=2
    )),
    ("clf", LogisticRegression(max_iter=2000))
])

# ================= TRAIN =================
pipeline.fit(X_train, y_train)

# ================= SAVE =================
with open("fake_news_model.pkl", "wb") as f:
    pickle.dump(pipeline, f)

print("🎉 TRAINING COMPLETE – MODEL SAVED AS fake_news_model.pkl")
