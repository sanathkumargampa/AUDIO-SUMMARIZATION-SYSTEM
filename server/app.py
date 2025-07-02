from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import whisper
from transformers import pipeline
from pydub import AudioSegment
import os
import datetime

app = Flask(__name__)

# ✅ Allow your frontend to communicate with the backend
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# ✅ Create upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Load models
whisper_model = whisper.load_model("base")
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

# ✅ Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["MeetingDB"]
collection = db["Summaries"]

# ✅ Convert audio to WAV if needed
def convert_to_wav(file_path):
    try:
        if file_path.endswith(".mp3"):
            sound = AudioSegment.from_mp3(file_path)
        elif file_path.endswith(".m4a"):
            sound = AudioSegment.from_file(file_path, format="m4a")
        else:
            return file_path  # Already WAV
        wav_path = file_path.rsplit(".", 1)[0] + ".wav"
        sound.export(wav_path, format="wav")
        return wav_path
    except Exception as e:
        raise Exception(f"Audio conversion failed: {str(e)}")

# ✅ Route to handle summarization
@app.route("/summarize", methods=["POST"])
def summarize_meeting():
    if 'file' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    file = request.files['file']
    filename = file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    try:
        file.save(file_path)
    except Exception as e:
        return jsonify({"error": f"File save failed: {str(e)}"}), 500

    try:
        wav_path = convert_to_wav(file_path)
        result = whisper_model.transcribe(wav_path)
        transcription = result["text"]
    except Exception as e:
        return jsonify({"error": f"Transcription failed: {str(e)}"}), 500

    try:
        chunks = [transcription[i:i+1000] for i in range(0, len(transcription), 1000)]
        summary = " ".join([
            summarizer(chunk, max_length=150, min_length=40, do_sample=False)[0]['summary_text']
            for chunk in chunks
        ])
    except Exception as e:
        return jsonify({"error": f"Summarization failed: {str(e)}"}), 500

    try:
        summary_data = {
            "filename": filename,
            "transcription": transcription,
            "summary": summary,
            "timestamp": datetime.datetime.utcnow()
        }
        collection.insert_one(summary_data)
    except Exception as e:
        return jsonify({"error": f"Database insertion failed: {str(e)}"}), 500

    return jsonify({
        "transcription": transcription,
        "summary": summary
    })

# ✅ Route to fetch history from MongoDB
@app.route("/api/history", methods=["GET"])
def get_history():
    try:
        records = collection.find().sort("timestamp", -1)
        output = []
        for record in records:
            output.append({
                "filename": record.get("filename"),
                "timestamp": record.get("timestamp").isoformat(),
                "summary": record.get("summary"),
                "transcription": record.get("transcription")
            })
        return jsonify(output)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch history: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5050)



# source .venv/bin/activate