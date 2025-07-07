"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify
from api.models import User, db
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from api.ai_agent import generate_question_and_answers
from sqlalchemy import desc
from werkzeug.security import generate_password_hash, check_password_hash




ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False


@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response


# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Setup the Flask-JWT-Extended extension
# Change this "super secret" to something else!
app.config["JWT_SECRET_KEY"] = "otra-cosa"
jwt = JWTManager(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    user = User.query.filter_by(email=email).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401

    if check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token, "user_id": user.id})
    else:
        return jsonify({"msg": "Bad username or password"}), 401


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id, "email": user.email}), 200


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    hashed_password = generate_password_hash(password)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409

    new_user = User(email=email, password=hashed_password,is_active=True)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "msg": "User created successfully",
        "token": access_token,
        "user_id": new_user.id,
        "email": new_user.email
    }),200


@app.route('/api/trivia-question', methods=['GET'])
# @jwt_required()
def trivia_question():
    try:
        resultado = generate_question_and_answers()
        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/ranking/global', methods=['GET'])
def global_ranking():
    try:
        results = db.session.query(User).order_by(desc(User.experience_points)).all()
        serialized_results = [result.serialize() for result in results]
        return jsonify(serialized_results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ranking/friends', methods=['GET'])
#@jwt_required()
def friends_ranking():
    try:
        #current_user_id = get_jwt_identity()
        current_user_id = 1
        user = User.query.get(current_user_id)

        friend_ids = [friend.id for friend in user.friends]
        all_friend_ranking_user_ids = friend_ids + [current_user_id]

        results = db.session.query(User).filter(User.id.in_(all_friend_ranking_user_ids)).order_by(desc(User.experience_points)).all()
        serialized_results = [result.serialize() for result in results]
        return jsonify(serialized_results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/users/experience", methods=["POST"])
def update_experience():
    token = request.headers.get("Authorization")
    data = request.json
    experience_points = data.get("experiencePoints")
    return jsonify({"message": "Experience updated"})


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
