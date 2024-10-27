# from flask import flash, request
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import UserMixin, login_required, logout_user, current_user
# from app import db, login_manager, app
# from werkzeug.security import generate_password_hash, check_password_hash

# class User(UserMixin):
#     __tablename__ = "users"
#     id = db.Column(db.Integer, primary_key=True)
#     last_name = db.Column(db.String(120), nullable=False)
#     first_name = db.Column(db.String(120), nullable=False)
#     pass_hash = db.Column(db.String(120), nullable=False)
#     avatar = db.Column(db.String(120), unique=True, nullable=False)

#     def set_password(self, password):
#         self.pass_hash = generate_password_hash(password)
    
#     def check_password(self, password):
#         return check_password_hash(self.pass_hash, password)
    
#     def __repr__(self):
#         return f'<User {self.avatar}>'


# #login for users
# @login_manager.user_loader
# def load_user(user_id):
#     # hardcoded for now
#     return User.query.get(int(user_id))

# # Routes
# @app.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         avatar = request.form.get("avatar")
#         lastname = request.form.get("lastname")
#         firstname = request.form.get("firstname")
#         password = request.form.get("password")
        
#         # Check if username already exists
#         if User.query.filter_by(avatar=avatar).first():
#             flash("Username already taken!")
#             return {"error": "avatar taken", "success": False}

#         # Create a new user and save to database
#         new_user = User(avatar=avatar, firstname=firstname, lastname=lastname)
#         new_user.set_password(password)
#         db.session.add(new_user)
#         db.session.commit()
#         flash("Registered successfully!")
#         return {"success": True}

#     return {"error": "Post.", "success": False}

# @app.route("/login", methods=["GET", "POST"])
# def login():
#     if request.method == "POST":
#         avatar = request.form.get("avatar")
#         lastname = request.form.get("lastname")
#         firstname = request.form.get("firstname")
#         password = request.form.get("password")
        
#         user = User.query.filter_by(avatar=avatar).first()

#         # Check if the user exists and the password is correct
#         if user and user.check_password(password):
#             load_user(user)
#             flash("Logged in successfully!")
#             return {"success": True}
#         flash("Invalid username or password")
#         return {"success": False, "error": "invalid coordinates"}
        
#     return {"success": False, "error": "invalid method"}

# @app.route("/dashboard")
# @login_required
# def dashboard():
#     return f"Hello, {current_user.username}! Welcome to your dashboard."

# @app.route("/logout")
# @login_required
# def logout():
#     logout_user()
#     flash("You have been logged out.")
#     return {"success": True}
