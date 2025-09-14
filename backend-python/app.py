from flask import Flask

app = Flask(__name__)


@app.route("/python")
def hello_python():
    return "Hello from Python Service"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
