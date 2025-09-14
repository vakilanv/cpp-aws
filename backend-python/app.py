from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/python")
def python_backend():
    return jsonify({"message": "Hello from Python Backend!"})

@app.route("/error")
def python_error():
    return jsonify({"error": "Python Backend Error Triggered!"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)