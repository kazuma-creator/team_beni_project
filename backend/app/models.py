# backend/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

community_members = db.Table('community_members',
    db.Column('user_id',db.Integer,db.ForeignKey('user.id'),primary_key=True),
    db.Column('community_id',db.Integer,db.ForeignKey('community.id'),primary_key=True)                
)


# Userテーブル
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150),nullable=False)
    user_id = db.Column(db.String(150),  unique=True,nullable=False)# unique: ユニークにして重複を防ぐ
    password = db.Column(db.String(150), nullable=False)# nullable: 空欄を許可する
    communities = db.relationship('Community',secondary=community_members,back_populates='members')
    messages = db.relationship('Message',backref='author',lazy=True,overlaps="messages")

    def __repr__(self):
        return f'<User {self.username}>'
    
# コミュニティテーブル
class Community(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(150),unique=True,nullable=False)
    description = db.Column(db.String(500),nullable=True)
    creator_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    members = db.relationship('User',secondary=community_members,back_populates='communities')
    messages = db.relationship('Message',backref='community_backref',lazy=True)
    icon_url = db.Column(db.String(500))
    
    def __repr__(self):
        return f'<Community {self.name}>'
    
class Message(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    content = db.Column(db.String(500),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    community_id = db.Column(db.Integer,db.ForeignKey('community.id'),nullable=False)
    timestamp = db.Column(db.DateTime,default=db.func.current_timestamp())
    
    user = db.relationship('User',backref=db.backref('author_messages',lazy=True,overlaps="messages"))
    community = db.relationship('Community',backref=db.backref('community_messages',lazy=True,overlaps="messages"))
    
    def __ref__(self):
        return f'<Message {self.content[:20]}>'