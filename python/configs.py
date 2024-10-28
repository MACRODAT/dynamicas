
from flask import Flask
from my_secrets.secret_key_ import my_secret_key
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)

# sql alchemy stuff
app.secret_key = my_secret_key #TO BE MODIFIED
app.config["JWT_SECRET_KEY"] = my_secret_key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dynamicas.db'  # Use SQLite for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
db = SQLAlchemy(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Enable CORS for all origins
# CORS(app, origins="http://localhost:3000")
CORS(app)