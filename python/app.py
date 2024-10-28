import json
from flask import Flask, jsonify, request, send_file, session
from flask_cors import CORS
from create_io import list_files_by_folder, list_files_recursively
from utils import list_airfoils, get_airfoil_stl, get_airfoil_dat, \
                            get_airfoil_step, get_airfoil_screenshot, \
                            create_geometry, create_mesh, create_screenshot, get_airfoil_description
from airfoilGen.generator import naca as nacaFunction

# login stuff
from my_secrets.secret_key_ import my_secret_key

from flask_sqlalchemy import SQLAlchemy

from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

from flask_migrate import Migrate

import io

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

# cur folder
from os import path
__my_dirname = path.dirname(path.realpath(__file__)) 


# adding login functionality

# Enable CORS for all origins
# CORS(app, origins="http://localhost:3000")
CORS(app)




from flask import flash, request
from flask_sqlalchemy import SQLAlchemy

from werkzeug.security import generate_password_hash, check_password_hash

# Define Project model
class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    foldername = db.Column(db.String(100))
    
    # Foreign key linking to the User model
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

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


#login for users
def _login_helper(avatar, password):
    user = User.query.filter_by(avatar=avatar).first()
    # Check if the user exists and the password is correct
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id, 
                                           additional_claims={"avatar": user.avatar, 
                                                              "firstname": user.first_name,
                                                              "email": user.email})
        response = {"access_token":access_token, "success": True}
        return response
    return {"access_token":"", "success": False}

# Routes
@app.route("/register", methods=["GET", "POST"])
def register():
    # if current_user.is_authenticated:
    #     return {
    #         "success": True,
    #         "message": "Already authenticated."
    #     }
    if request.method == "POST":
        avatar = request.json["avatar"]
        lastname = request.json["lastname"]
        firstname = request.json["firstname"]
        password = request.json["password"]
        email = request.json["email"]

        # Check if username already exists
        if User.query.filter_by(avatar=avatar).first():
            if "firebase" in request.json:
                return _login_helper(avatar, password)
            flash("Username already taken!")
            return {"error": "avatar taken", "success": False}

        # Create a new user and save to database
        new_user = User(avatar=avatar, first_name=firstname, last_name=lastname, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        import os
        if not os.path.exists(f'{__my_dirname}/users/{avatar}'):
            os.makedirs(f'{__my_dirname}/users/{avatar}')
        flash("Registered successfully!")
        if "firebase" in request.json:
            return _login_helper(avatar, password)
        return {"success": True}

    return {"error": "Post.", "success": False}

@app.route("/login", methods=["GET", "POST"])
def login():
    # if current_user.is_authenticated:
    #     return {
    #         "success": True,
    #         "message": "Already authenticated."
    #     }
    if request.method == "POST":
        avatar = request.json["avatar"]
        password = request.json["password"]
        
        return _login_helper(avatar, password)
    return {"success": False, "error": "invalid method"}

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


def getUser():
    claims = get_jwt()
    user = User.query.filter_by(avatar=claims.get("avatar")).first()
    return user

@app.route("/dashboard")
@jwt_required()
def dashboard():
    # Get additional claims if you stored any
    claims = get_jwt()
    id = get_jwt_identity()
    user = User.query.filter_by(avatar=claims.get("avatar")).first()
    return f"Hello, {user.first_name}! Welcome to your dashboard."

@app.route("/logout")
def logout():
    response = jsonify({"msg": "logout successful", "success": True})
    unset_jwt_cookies(response)
    return response

# Teardown context to close database session
# @app.teardown_appcontext
# def shutdown_session(exception=None):
#     db.session.remove()  # Properly close and release any sessions
#     if db.engine:
#         db.engine.dispose()  # Dispose of engine connections if necessary

@app.route('/', methods=['GET'])
def home():
    """Home for all airfoils."""
    return jsonify("Home for all airfoils")

@app.route('/airfoils', methods=['GET'])
def get_airfoils():
    """List all airfoils."""
    airfoils = list_airfoils()
    return jsonify(airfoils)

@app.route('/airfoil/<string:airfoil>/stl', methods=['GET'])
def get_stl(airfoil):
    """Get the STL file content for a specific airfoil."""
    try:
        stl_content = get_airfoil_stl(airfoil)
        return send_file(
            io.BytesIO(stl_content),  # Use BytesIO to wrap the bytes
            mimetype='application/sla',
            as_attachment=True,
            download_name=f'{airfoil}.stl'
        )
    except FileNotFoundError:
        return jsonify({"error": "STL file not found"}), 404

@app.route('/airfoil/<string:airfoil>/dat', methods=['GET'])
def get_dat(airfoil):
    """Get the DAT file content for a specific airfoil."""
    try:
        dat_content = get_airfoil_dat(airfoil)
        return send_file(
            io.BytesIO(dat_content),  # Use BytesIO to wrap the bytes
            mimetype='application/text',
            as_attachment=True,
            download_name=f'{airfoil}.dat'
        )
    except FileNotFoundError:
        return jsonify({"error": "STL file not found"}), 404

@app.route('/airfoil/<string:airfoil>/step', methods=['GET'])
def get_step(airfoil):
    """Get the STEP file content for a specific airfoil."""
    try:
        step_content = get_airfoil_step(airfoil)
        return send_file(
            io.BytesIO(step_content),  # Use BytesIO to wrap the bytes
            mimetype='application/sla',
            as_attachment=True,
            download_name=f'{airfoil}.step'
        )
    except FileNotFoundError:
        return jsonify({"error": "STEP file not found"}), 404

@app.route('/airfoil/<string:airfoil>/screenshot', methods=['GET'])
def get_screenshot(airfoil):
    """Get the screenshot for a specific airfoil."""
    try:
        screenshot = get_airfoil_screenshot(airfoil)
        return send_file(
            io.BytesIO(screenshot),
            mimetype='image/png',
            as_attachment=True,
            download_name=f'{airfoil}.png'
        )
    except FileNotFoundError:
        return jsonify({"error": "Screenshot not found"}), 404

@app.route('/airfoil/<string:airfoil>/description', methods=['GET'])
def get_description(airfoil):
    """Get the description for a specific airfoil."""
    try:
        return jsonify({"description": get_airfoil_description(airfoil)})
    except Exception as e:
        return jsonify({"error": "Desc not found", "description": ""}), 404


@app.route('/airfoil/<string:airfoil>/geometry', methods=['POST'])
def create_geo(airfoil):
    """Create geometry for a specific airfoil."""
    method = request.json.get('method')
    wingspan = request.json.get('wingspan')
    params = request.json.get('params')

    if not method or not wingspan or not params:
        return jsonify({"error": "Invalid parameters"}), 400

    try:
        geometry = create_geometry(airfoil, method, wingspan, params)
        return jsonify({"message": "Geometry created"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/airfoil/<string:airfoil>/mesh', methods=['POST'])
def create_airfoil_mesh(airfoil):
    """Create mesh for a specific airfoil."""
    try:
        mesh_success = create_mesh(airfoil)
        return jsonify({"message": "Mesh created", "success": mesh_success}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/airfoil/<string:airfoil>/screenshot/create', methods=['POST'])
def take_screenshot(airfoil):
    """Get the screenshot for a specific airfoil."""
    try:
        screenshot = get_airfoil_screenshot(airfoil)
        return send_file(
            io.BytesIO(screenshot),  # Use BytesIO to wrap the bytes
            mimetype='image/png',
            as_attachment=True,
            download_name=f'{airfoil}.png'
        )
    except FileNotFoundError:
        return jsonify({"error": "Screenshot not found"}), 404

@app.route('/user/<string:username>/dir', methods=['GET'])
def get_dir(username):
    """Will display dir of the user"""
    try:
        return jsonify(list_files_recursively(username))
    except Exception as e:
        return jsonify({"error": "Error in dir", "description": e}), 404 

@app.route('/naca/<string:naca>/<int:n>/txt', methods=['GET'])
@jwt_required()
def getNacaAirfoilTxt(naca, n):
    """
        Will generate and fetch the NACA dat file
    """
    try:
        try:
            dat = nacaFunction(naca, n, save=False)
        except Exception as e:
            return jsonify({"success": False, "message": "No naca function."})
        return jsonify({"success": True, "data": dat})
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})

@app.route('/naca/<string:naca>/<int:n>/dat', methods=['GET'])
def getNacaAirfoilDat(naca, n):
    """
        Will generate and fetch the NACA dat file
    """
    try:
        try:
            dat = nacaFunction(naca, n, save=False)
        except Exception as e:
            return jsonify({"success": False, "message": "No naca function."})
        dat_content = '\n'.join(f"{x}   {y}" for x, y in zip(dat[0],dat[1]))
        
        dat_io = io.BytesIO()
        dat_io.write(dat_content.encode('utf-8'))
        dat_io.seek(0)

        return send_file(
            dat_io,
            mimetype='application/txt',
            as_attachment=True,
            download_name=f'NACA_{naca}_{n}.dat'
        )
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})

@app.route('/naca/<string:naca>/<int:n>/png', methods=['GET'])
def getNacaAirfoilImage(naca, n):
    """
        Will generate and fetch the NACA dat file
    """
    try:
        try:
            dat = nacaFunction(naca, n, save=False, uploadImage=True)
        except Exception as e:
            return jsonify({"success": False, "message": "No naca function."})
        dat.seek(0)
        return send_file(
            dat,
            mimetype='image/png',
            as_attachment=True,
            download_name=f'NACA_{naca}_{n}.png'
        )
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})

@app.route('/airfoil/<string:airfoil>', methods=['POST'])
@jwt_required()
def setAirfoil(airfoil):
    """
        Will set airfoil for later exploitation
    """
    try:
        lines = []
        try:
            for line in airfoil.split('\n'):
                lines.push((line.split(' ')[0], lines.split(' ')[1]))
        except Exception as e:
            return jsonify({"success": False, "message": "Invalid airfoil."})
        


        # SETTING AIRFOIL FOR THIS USER

        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})


@app.route('/myprojects', methods=['GET'])
@jwt_required()
def getProjects():
    """
        Fetches the user's projects
    """
    try:
        lines = []
        current_user = getUser()
        try:
            for project in current_user.projects:
                lines.append({"name": project.name, "description": project.description})
        except Exception as e:
            return jsonify({"success": False, "message": "Invalid request or server error."})
        return jsonify({"success": True, "projects": lines})
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})

@app.route('/myprojects/new', methods=['POST'])
@jwt_required()
def newProject():
    """
        new project
    """
    try:
        json_ = request.json
        cur_user = getUser()
        p = Project()
        p.description = json_['description']
        p.name = json_['name']
        p.user_id = cur_user.id
        db.session.add(p)
        db.session.commit()
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
