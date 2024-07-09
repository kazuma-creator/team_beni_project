from flask import Flask, request, jsonify,send_from_directory
from app.models import db, User
from flask_cors import CORS
import os

# インスタンスを作成
app = Flask(__name__,static_folder='../frontend/build',static_url_path='/')
CORS(app)


basedir = os.path.abspath(os.path.dirname(__file__))
# SQLiteデータベースのURLを設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'users.db')
# SQLAlchemyの変更追跡機能を無効にする
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# アプリケーションとデータベースの関連付け
db.init_app(app)

@app.route('/')
def serve():
  return send_from_directory(app.static_folder,'index.html')


# エンドポイントにPOSTリクエストが送信された場合にこの関数を呼び出す
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received data:",data)
    # リクエストデータからユーザー名とパスワードを取得
    username = data.get('username')
    user_id = data.get('user_id')
    password = data.get('password')
    
    # user_idがNoneの場合の処理
    if not user_id:
      return jsonify({'message':'User ID is required'}),400
    
    if User.query.filter_by(user_id=user_id).first():
        return jsonify({'message': 'User already exists'}), 409
      
# 新しいユーザーオブジェクトを作成し、データベースに追加してコミットする
    new_user = User(username=username,user_id=user_id, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login',methods=['POST'])
def login():
  data=request.get_json()
  user_id=data.get('user_id')
  password=data.get('password')
  
  user = User.query.filter_by(user_id=user_id).first()
  if user and user.password == password:
    return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'username': user.username}}),200
  else:
    return jsonify({'message': 'Invalid credentials'}), 401

# Serve React App
@app.route('/<path:path>')
def serve_static(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# アプリケーションの起動
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # データベースとテーブルを作成
    app.run(debug=True)
