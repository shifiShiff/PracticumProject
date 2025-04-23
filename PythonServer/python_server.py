from flask import Flask, request, jsonify
import requests
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # זה פותח את הגישה מכל מקור


def analyze_image_with_challenge(image_url: str, challenge_description: str) -> str:
    # הורדת תמונה והפיכה ל-base64
    image_data = requests.get(image_url).content
    image_base64 = base64.b64encode(image_data).decode("utf-8")

    # הגדרות API
    api_key = ""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    headers = {
        "Content-Type": "application/json"
    }

    # יצירת ה-body עם התמונה + תיאור האתגר
    body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"""אתה שופט בתחרות יצירת תמונות. המשתתפים התבקשו ליצור תמונה בנושא:\n'{challenge_description}'.
נתח את התמונה לפי הקריטריונים: מקוריות, התאמה לנושא, קומפוזיציה, מעלות וחסרונות.
האם התמונה עומדת באתגר?"""
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

    # שליחה וקבלת התשובה
    response = requests.post(url, headers=headers, json=body)

    if response.status_code == 200:
        text = response.json()["candidates"][0]["content"]["parts"][0]["text"]
        
        # הוספת אימוג'ים לפי התשובה
        if "לא עומדת" in text or "לא טובה" in text or "נכשלת" in text:
            text += " 😕❌"
        else:
            text += " 🎉😊"
        
        return text
    else:
        return f"שגיאה: {response.status_code} - {response.text}"

# Endpoint לקבלת תמונה ותיאור
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
