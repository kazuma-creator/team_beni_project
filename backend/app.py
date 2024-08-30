from flask import Flask, request, jsonify,send_from_directory
from app.models import db, User,Community,Message
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

# インスタンスを作成
app = Flask(__name__,static_folder='../frontend/build',static_url_path='/')
CORS(app,resources={r"/*": {"origins": "*"}})

# データベースの設定
basedir = os.path.abspath(os.path.dirname(__file__))
# SQLiteデータベースのURLを設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'users.db')
# SQLAlchemyの変更追跡機能を無効にする
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['UPLOAD_FOLDER'] = os.path.join(basedir,'uploads')

# アプリケーションとデータベースの関連付け
db.init_app(app)

@app.route('/')
def serve():
  return send_from_directory(app.static_folder,'index.html')


# ユーザー登録とログインの処理
@app.route('/register', methods=['POST'])
# ユーザー登録の処理
def register():
    data = request.get_json()
    # リクエストデータからユーザー名とパスワードを取得
    username = data.get('username')
    user_id = data.get('user_id')
    password = data.get('password')
    
    # user_idがNoneの場合の処理
    if not user_id:
      return jsonify({'message':'User ID is required'}),400
    
    # ユーザーIDが既に存在する場合の処理
    if User.query.filter_by(user_id=user_id).first():
        return jsonify({'message': 'User already exists'}), 409
      
# 新しいユーザーオブジェクトを作成し、データベースに追加してコミットする
    new_user = User(username=username,user_id=user_id, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201
# ユーザーログインの処理
@app.route('/login',methods=['POST'])
def login():
  data=request.get_json()# リクエストデータを取得
  print("Login data received",data)# デバッグ用ログ
  user_id=data.get('user_id')# ユーザーIDを取得
  password=data.get('password')# パスワードを取得
  
  user = User.query.filter_by(user_id=user_id).first()
  if user and user.password == password:
    return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'username': user.username}}),200
  else:
    return jsonify({'message': 'Invalid credentials'}), 401

# コミュニティ作成のエンドポイント
@app.route('/create_community', methods=['POST'])
def create_community():
  # Header.jsxからFormDataを取得
    name = request.form.get('name') # コミュニティ名
    description = request.form.get('description') # 説明
    creator_id = request.form.get('creator_id') # 作成者ID
    icon = request.files.get('icon') # アイコンファイル
    
    print("Received data",name,description,creator_id,icon)
    
    # コミュニティ名が提供されていない場合の処理
    if not name:
        return jsonify({'message': 'Community name is required'}), 400
    
    # コミュニティ名が既に存在する場合の処理
    if Community.query.filter_by(name=name).first():
        return jsonify({'message': 'Community already exists'}), 409
    
    icon_url = None
    
    if icon:
        filename = secure_filename(icon.filename)
        icon.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)) # アイコンファイルを保存
        icon_url = f'/uploads/{filename}' # アイコンURLを設定
    
    # 新しいコミュニティオブジェクトを作成し、データベースに追加してコミット
    new_community = Community(name=name, description=description, creator_id=creator_id, icon_url=icon_url)
    db.session.add(new_community)
    db.session.commit()

    # コミュニティ作成が成功した場合の処理
    return jsonify({'message': 'Community created successfully'}), 201
  
  
# アップロードファイルの提供
@app.route('/uploads/<filename>')
def uploaded_file(filename):
  return send_from_directory(app.config['UPLOAD_FOLDER'],filename) # アップロードファイルを提供

# 所属コミュニティの取得エンドポイント
@app.route('/get_communities/<int:user_id>', methods=['GET'])
def get_communities(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    communities = Community.query.filter_by(creator_id=user_id).all()
    community_list = [{'id': c.id, 'name': c.name, 'description': c.description} for c in communities]

    return jsonify({'communities': community_list}), 200

# コミュニティの詳細取得エンドポイント
@app.route('/community/<int:community_id>',methods=['GET'])
def get_community(community_id):
  community = Community.query.get(community_id)
  if not community:
    return jsonify({'message':'Community not found'}), 404
  return jsonify({'id':community.id,
                  'name':community.name,
                  'description':community.description,
                  'icon_url': community.icon_url
                  }),200

# コミュニティに参加するエンドポイント
@app.route('/join_community',methods=['POST'])
def join_community():
  data = request.get_json()# リクエストデータを取得
  community_id = data.get('community_id')# コミュニティIDを取得
  user_id = data.get('user_id')# ユーザーIDを取得
  
  community = Community.query.get(community_id)
  user = User.query.get(user_id)
  if not community or not user:
    return jsonify({'message':'Invalid community or user'}),400
  
  # ユーザーがコミュニティに既に参加しているかを確認
  if user in community.members:
    return jsonify({'message':'User already a member'}),400
  
  community.members.append(user)
  db.session.commit()
  return jsonify({'message':'Joined successfully'}),200

# コミュニティメンバーの取得エンドポイント
@app.route('/community/<int:community_id>/members', methods=['GET'])
def get_community_members(community_id):
    community = Community.query.get(community_id)
    if not community:
        return jsonify({'message': 'Community not found'}), 404

    members = [{'id': member.id, 'username': member.username} for member in community.members]
    return jsonify({'members': members}), 200

# ユーザーがコミュニティに参加しているかどうかをチェックするエンドポイント
@app.route('/is_member', methods=['POST'])
def is_member():
    data = request.get_json()
    community_id = data.get('community_id')
    user_id = data.get('user_id')

    community = Community.query.get(community_id)
    user = User.query.get(user_id)
    if not community or not user:
        return jsonify({'message': 'Invalid community or user'}), 400

    # ユーザーがコミュニティのメンバーであるかを確認
    is_member = user in community.members
    return jsonify({'is_member': is_member}), 200

# コミュニティのメッセージ取得エンドポイント
@app.route('/community/<int:community_id>/messages', methods=['GET'])
def get_messages(community_id):
    community = Community.query.get(community_id)
    if not community:
        return jsonify({'message': 'Community not found'}), 404

    messages = [{"content": m.content, "user_id": m.user_id} for m in community.messages]
    return jsonify(messages), 200
  
# コミュニティにメッセージを送信するエンドポイント
@app.route('/community/<int:community_id>/messages', methods=['POST'])
def send_message(community_id):
    data = request.get_json()
    content = data.get('content')
    user_id = data.get('user_id')

    community = Community.query.get(community_id)
    user = User.query.get(user_id)
    if not community or not user:
        return jsonify({'message': 'Invalid community or user'}), 400

    new_message = Message(content=content, user_id=user_id, community_id=community_id)
    db.session.add(new_message)
    db.session.commit()

    return jsonify({'message': 'Message sent successfully'}), 200

# ユーザー情報を取得するエンドポイント
@app.route('/user_info',methods=['GET'])
def user_info():
  user_id = 1
  user = User.query.get(user_id)
  if not user:
    return jsonify({'message':'User not found'}),404
  return jsonify({'username':'username'}),200

# 静的ファイルの提供
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
