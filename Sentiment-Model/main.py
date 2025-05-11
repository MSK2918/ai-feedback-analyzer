from fastapi import FastAPI
from pydantic import BaseModel
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from googletrans import Translator
from datetime import datetime, timedelta
from dateutil import tz


# Initialize FastAPI app and sentiment analyzer
app = FastAPI()
analyzer = SentimentIntensityAnalyzer()
translator = Translator()

# Pydantic model for input
class FeedbackInput(BaseModel):
    feedback_text: str

# Get human-friendly timestamp
def get_friendly_timestamp():
    now = datetime.now(tz=tz.tzlocal())
    today = now.replace(hour=0, minute=0, second=0, microsecond=0)

    if now < today + timedelta(days=1):
        return "Today"
    elif now < today + timedelta(days=2):
        return "Yesterday"
    elif now < today + timedelta(days=7):
        days = (now - today).days
        return f"{days} day(s) ago"
    elif now < today + timedelta(days=30):
        weeks = (now - today).days // 7
        return f"{weeks} week(s) ago"
    else:
        months = (now - today).days // 30
        return f"{months} month(s) ago"

# Sentiment analysis endpoint
@app.post("/analyze")
async def analyze_feedback(data: FeedbackInput):
    original_text = data.feedback_text

    # Translate feedbackText to English
    translated = translator.translate(original_text, src='auto', dest='en')
    translated_text = translated.text

    # Analyze sentiment
    scores = analyzer.polarity_scores(translated_text)
    compound = scores["compound"]

    # Determine sentiment
    if compound > 0.05:
        sentiment = "Positive"
    elif compound < -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    # Human-readable timestamp
    timestamp = get_friendly_timestamp()

    return {
        "original_text": original_text,
        "translated_text": translated_text,
        "sentiment": sentiment,
        "scores": scores,
        "timestamp": timestamp
    }


@app.get("/")
async def greet ():
    return {
        "message": "Hello World"
    }







    
