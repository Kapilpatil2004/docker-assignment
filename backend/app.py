from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return "Flask backend is running!"


@app.route("/submit", methods=["POST"])
def submit():

    name = request.form.get("name")
    password = request.form.get("password")

    print("Received data:")
    print("Name:", name)
    print("Password:", password)

    return jsonify({
        "success": True,
        "message": "Registration submitted successfully!",
        "data": {
            "name": name,
            "password": password
        }
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)