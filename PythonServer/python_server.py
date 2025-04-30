from flask import Flask, request, jsonify
import requests
import base64
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)  


def analyze_image_with_challenge(image_url: str, challenge_description: str) -> str:

    image_data = requests.get(image_url).content
    image_base64 = base64.b64encode(image_data).decode("utf-8")

    # הגדרות API
    api_key = "AIzaSyBg0tBfrmCpmIkvQNkZjjeURd221KsvieM"
    # api_key = os.environ.get("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    headers = {
        "Content-Type": "application/json"
    }

    body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"""אתה שופט בתחרות יצירת תמונות.תענה כמו שופט ואל תחזיר שום טקסט שמכיל מידע מעבר לכותרת האתגר ותיאור האתגר תוריד פרטים שקשורים לממסד נתונים גם את מספר האתגר אל תציג, את כותרת האתגר והתיאור תציג בשפה שהוא מופיע במקורי. המשתתפים התבקשו ליצור תמונה בנושא:\n'{challenge_description}'.
נתח את התמונה לפי הקריטריונים: מקוריות, התאמה לנושא, קומפוזיציה, מעלות וחסרונות.
  .אם התמונה עומדת באתגר? תענה בהרחבה ובמוממחיות על כל קריטריון. תרווח ותרד שורות בצורה מתאימה לפני כל קריטוריון שיהיה בצורה מסודרת לעין אם אימוגים"""
                    },
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_base64
                        }
                    }
                ]
            }
        ]
    }

    response = requests.post(url, headers=headers, json=body)

    if response.status_code == 200:
        text = response.json()["candidates"][0]["content"]["parts"][0]["text"]

        return text 
    else:
        return f"שגיאה: {response.status_code} - {response.text}"



@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    image_url = data.get('image_url')
    challenge_description = data.get('challenge_description')

    if not image_url or not challenge_description:
        return jsonify({"error": "image_url and challenge_description are required"}), 400

    result = analyze_image_with_challenge(image_url, challenge_description)

    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
