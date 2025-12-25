import base64
import requests

def encode_image_to_base64(file):
    return base64.b64encode(file.read()).decode("utf-8")

def download_image_as_base64(url):
    response = requests.get(url, timeout=5)
    if response.status_code != 200:
        return None
    return base64.b64encode(response.content).decode("utf-8")
