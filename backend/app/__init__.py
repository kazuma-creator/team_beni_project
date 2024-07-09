# backend/app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
# アプリケーションとSQLALchemyの紐づけ
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    # データベースの変更があった場合シグナルを発生させる
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        from . import models
        db.create_all()

    return app
