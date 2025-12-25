import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask_groq(prompt: str):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",  # ✅ supported
        messages=[
            {"role": "system", "content": "You are NewsGuard AI, an expert in fake news detection."},
            {"role": "user", "content": prompt}
        ],
    )
    return response.choices[0].message.content
