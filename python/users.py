from werkzeug.security import generate_password_hash, check_password_hash
from configs import db

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(120), nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, default="example@email.com")
    pass_hash = db.Column(db.String(120), nullable=False)
    avatar = db.Column(db.String(120), unique=True, nullable=False)
    
    projects = db.relationship('Project', backref='User', lazy=True)

    def is_authenticated(self):
        return True

    def set_password(self, password):
        self.pass_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.pass_hash, password)
    
    def __repr__(self):
        return f'<User {self.avatar}>'
