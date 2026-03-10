from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Use a universally supported pipeline
generator = pipeline("text-generation", model="gpt2")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    user_prompt = request.json["prompt"]

    # Normal prompt
    normal_output = generator(
        user_prompt,
        max_new_tokens=60
    )[0]["generated_text"]

    # Engineered prompt
    engineered_prompt = f"Explain clearly with a simple example: {user_prompt}"

    engineered_output = generator(
        engineered_prompt,
        max_new_tokens=100
    )[0]["generated_text"]

    return jsonify({
        "normal": normal_output,
        "engineered": engineered_output
    })

if __name__ == "__main__":
    app.run(debug=True)