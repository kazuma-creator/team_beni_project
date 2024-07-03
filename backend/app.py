from flask import Flask, jsonify, request,send_from_directory

app = Flask(__name__,static_folder='../frontend/build',static_url_path='/')

@app.route('/')
def serve():
  return send_from_directory(app.static_folder,'index.html')


def home():
    return jsonify({"message": "Welcome to the Flask backend!"})

if __name__ == '__main__':
    app.run(debug=True)
