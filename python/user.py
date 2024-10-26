from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

class User(UserMixin):
    def __init__(self) -> None:
        self.name = db.Column(db.Integer, primary_key=True)
        self.firstname = "Younes"
        self.id = 1
        self.avatar = "mcd"
    def is_