### Write code for the new module here and import it from agent.py.
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

# Store the received URLs
received_urls = []

@app.route("/upload_url", methods=["POST"])
def upload_url():
    data = request.json
    url = data.get("url")
    if url:
        received_urls.append(url)
        return jsonify({"success": True, "message": "URL received."})

@app.route("/")
def index():
    return render_template("index.html", urls=received_urls)

if __name__ == "__main__":
    app.run(port=8002)
