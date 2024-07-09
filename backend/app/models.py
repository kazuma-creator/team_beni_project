# backend/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150),nullable=False)
    user_id = db.Column(db.String(150),  unique=True,nullable=False)# unique: ユニークにして重複を防ぐ
    password = db.Column(db.String(150), nullable=False)# nullable: 空欄を許可する

    def __repr__(self):
        return f'<User {self.username}>'