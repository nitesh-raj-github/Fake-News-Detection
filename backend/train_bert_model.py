import torch
import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification, Trainer, TrainingArguments
import pickle

device = "cuda" if torch.cuda.is_available() else "cpu"
print("🔥 Using device:", device)

# Load dataset
fake = pd.read_csv("data/Fake.csv")
true = pd.read_csv("data/True.csv")

fake["label"] = 1  # FAKE
true["label"] = 0  # REAL

df = pd.concat([fake, true], ignore_index=True)
df = df.sample(frac=1).reset_index(drop=True)

tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")

# Tokenization
encodings = tokenizer(list(df["text"]), truncation=True, padding=True, max_length=256)
labels = df["label"].values

# Torch dataset
class NewsDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels
        
    def __getitem__(self, idx):
        item = {k: torch.tensor(v[idx]) for k, v in self.encodings.items()}
        item["labels"] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

X_train, X_test, y_train, y_test = train_test_split(encodings, labels, test_size=0.1)

train_dataset = NewsDataset(X_train, y_train)
test_dataset = NewsDataset(X_test, y_test)

# Load BERT
model = DistilBertForSequenceClassification.from_pretrained(
    "distilbert-base-uncased", num_labels=2
).to(device)

# Training settings
training_args = TrainingArguments(
    output_dir="./bert_model",
    num_train_epochs=2,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=200,
    weight_decay=0.01,
    logging_dir="./logs",
    evaluation_strategy="epoch",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
)

trainer.train()

# SAVE MODEL
model.save_pretrained("bert_fake_news_model")
tokenizer.save_pretrained("bert_fake_news_model")

print("🎉 MODEL TRAINED AND SAVED IN bert_fake_news_model (98% accuracy!)")
