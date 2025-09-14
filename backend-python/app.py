from flask import Flask, request, jsonify
from datetime import datetime


app = Flask(__name__)


@app.route("/day")
def get_day_of_week():
    name = request.args.get("name")
    birthdate = request.args.get("birthdate")
    try:
        dt = datetime.strptime(birthdate, "%Y-%m-%d")
        day_name = dt.strftime("%A")
        return jsonify({
            "name": name,
            "day": day_name
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
