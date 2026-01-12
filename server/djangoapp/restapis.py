import requests
import os
from dotenv import load_dotenv
# 1. Add this import to handle spaces in URLs safely
from urllib.parse import quote

from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, SentimentOptions

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")

watson_api_key = os.getenv('WATSON_API_KEY')
watson_url = os.getenv('WATSON_URL')

def get_request(endpoint, **kwargs):
    params = ""
    if (kwargs):
        for key, value in kwargs.items():
            params = params+key+"="+value+"&"

    request_url = backend_url+endpoint+"?"+params

    print("GET from {} ".format(request_url))
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception:
        print("Network exception occurred")
        # It's good practice to return an empty list or dict on failure here too, 
        # but your current view handles None for get_request differently.
        return None

# def analyze_review_sentiments(text):
#     encoded_text = quote(text)
#     request_url = sentiment_analyzer_url+"/analyze/"+encoded_text
    
#     try:
#         response = requests.get(request_url)
#         return response.json()
#     except Exception as err:
#         print(f"Unexpected {err=}, {type(err)=}")
#         print("Network exception occurred")
#         # 3. Return a default values so views.py doesn't crash
#         return {"sentiment": "neutral"}

def analyze_review_sentiments(text):
    # 3. Check if credentials exist
    if not watson_api_key or not watson_url:
        print("Error: Watson credentials missing.")
        return {"sentiment": "neutral"}

    try:
        # 4. Authenticate
        authenticator = IAMAuthenticator(watson_api_key)
        nlu = NaturalLanguageUnderstandingV1(
            version='2022-04-07',
            authenticator=authenticator
        )
        nlu.set_service_url(watson_url)

        # 5. Call IBM Watson
        response = nlu.analyze(
            text=text,
            features=Features(sentiment=SentimentOptions())
        ).get_result()

        # 6. Parse the response
        # Watson returns: {'sentiment': {'document': {'label': 'positive', 'score': 0.9}}}
        label = response['sentiment']['document']['label']
        
        return {"sentiment": label}

    except Exception as err:
        print(f"Watson API Error: {err}")
        return {"sentiment": "neutral"}

def post_review(data_dict):
    request_url = backend_url+"/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except Exception:
        print("Network exception occurred")