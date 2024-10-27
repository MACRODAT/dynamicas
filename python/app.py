from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from create_io import list_files_by_folder, list_files_recursively
from utils import list_airfoils, get_airfoil_stl, get_airfoil_dat, get_airfoil_step, get_airfoil_screenshot, create_geometry, create_mesh, create_screenshot, get_airfoil_description
from airfoilGen.generator import naca as nacaFunction

# login stuff
from my_secrets.secret_key_ import my_secret_key
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required


import io

app = Flask(__name__)


# sql alchemy stuff
app.secret_key = my_secret_key #TO BE MODIFIED
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dynamicas.db'  # Use SQLite for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# cur folder
from os import path
__my_dirname = path.dirname(path.realpath(__file__)) 


# adding login functionality
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# Enable CORS for all origins
CORS(app)




from flask import flash, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_required, logout_user, current_user

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

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(120), nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    pass_hash = db.Column(db.String(120), nullable=False)
    avatar = db.Column(db.String(120), unique=True, nullable=False)
    
    projects = db.relationship('Project', backref='owner', lazy=True)

    def set_password(self, password):
        self.pass_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.pass_hash, password)
    
    def __repr__(self):
        return f'<User {self.avatar}>'


#login for users
@login_manager.user_loader
def load_user(userid):
    # hardcoded for now
    # print(User.query.get(user.id))
    return User.query.get(userid)

# Routes
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        avatar = request.args["avatar"]
        lastname = request.args["lastname"]
        firstname = request.args["firstname"]
        password = request.args["password"]

        # Check if username already exists
        if User.query.filter_by(avatar=avatar).first():
            flash("Username already taken!")
            return {"error": "avatar taken", "success": False}

        # Create a new user and save to database
        new_user = User(avatar=avatar, first_name=firstname, last_name=lastname)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        import os
        if not os.path.exists(f'{__my_dirname}/{avatar}'):
            os.makedirs(f'{__my_dirname}/{avatar}')
        flash("Registered successfully!")
        return {"success": True}

    return {"error": "Post.", "success": False}

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        avatar = request.args["avatar"]
        password = request.args["password"]
        
        user = User.query.filter_by(avatar=avatar).first()

        # Check if the user exists and the password is correct
        if user and user.check_password(password):
            # load_user(user)
            login_user(user)
            flash("Logged in successfully!")
            return {"success": True}
        flash("Invalid username or password")
        return {"success": False, "error": "invalid coordinates"}
        
    return {"success": False, "error": "invalid method"}

@app.route("/dashboard")
@login_required
def dashboard():
    return f"Hello, {current_user.last_name}! Welcome to your dashboard."

@app.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out.")
    return {"success": True}

# Teardown context to close database session
@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()  # Properly close and release any sessions
    if db.engine:
        db.engine.dispose()  # Dispose of engine connections if necessary

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
@login_required
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

@login_required
@app.route('/airfoil/<string:airfoil>', methods=['POST'])
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
