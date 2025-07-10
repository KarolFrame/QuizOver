"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify
from api.models import User, UserInfo, db
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
import datetime
from datetime import date, timedelta

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
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
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
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "token": access_token,
            "user_id": user.id,
            "email": user.email,
            "user_info": user.user_info.serialize() if user.user_info else None,
            "experience_points": user.experience_points,
            "friends": [friends.id for friends in user.friends] if hasattr(user, 'friends') else [],
        })
    else:
        return jsonify({"msg": "Bad username or password"}), 401


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({
        "id": user.id,
        "email": user.email,
        "currentExperience": user.experience_points,
    }), 200


@app.route("/register", methods=["POST"])
def register():
    print("Register received raw JSON:", request.data)
    print("Register request headers:", request.headers)
    data = request.get_json(force=True)
    print("Register parsed data:", data)
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    hashed_password = generate_password_hash(password)

    if not username or not email or not password:
        return jsonify({"msg": "Username, email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409

    if UserInfo.query.filter_by(userName=username).first():
        return jsonify({"msg": "Username already exists"}), 409

    new_user = User(email=email, password=hashed_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    new_user_info = UserInfo(user_id=new_user.id, userName=username,
                             avatar='default.png', genre='unknown', birthday=date.today())
    db.session.add(new_user_info)
    db.session.commit()

    access_token = create_access_token(identity=str(new_user.id))

    return jsonify({
        "msg": "User created successfully",
        "token": access_token,
        "user_id": new_user.id,
        "email": new_user.email,
        "user_info": {
            "userName": new_user_info.userName,
            "avatar": new_user_info.avatar,
            "genre": new_user_info.genre,
            "birthday": new_user_info.birthday.isoformat()
        }
    }), 200


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
        results = db.session.query(User).order_by(
            desc(User.experience_points)).all()
        serialized_results = [result.serialize() for result in results]
        return jsonify(serialized_results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/ranking/friends', methods=['GET'])
# @jwt_required()
def friends_ranking():
    try:
        current_user_id = get_jwt_identity()
        current_user_id = 1
        user = User.query.get(current_user_id)

        friend_ids = [friend.id for friend in user.friends]
        all_friend_ranking_user_ids = friend_ids + [current_user_id]

        results = db.session.query(User).filter(User.id.in_(
            all_friend_ranking_user_ids)).order_by(desc(User.experience_points)).all()
        serialized_results = [result.serialize() for result in results]
        return jsonify(serialized_results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/users/experience", methods=["POST"])
@jwt_required()
def update_experience():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    experience_points = data.get("experiencePoints")

    if experience_points is None:
        return jsonify({"msg": "Missing experiencePoints"}), 400

    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user.experience_points += int(experience_points)
    db.session.commit()

    return jsonify({
        "message": "Experience updated",
        "experience_points": user.experience_points
    }), 200


@app.route("/users/experience", methods=["GET"])
@jwt_required()
def get_experience():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    current_xp = user.experience_points
    xp_for_next = calculate_xp_for_next_level(current_xp)

    return jsonify({
        "currentXp": current_xp,
        "xpForNext": xp_for_next
    }), 200
def calculate_xp_for_next_level(current_xp):
    return 1000


@app.route("/user/profile", methods=["GET", "PUT"])
@jwt_required()
def handle_user_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    if request.method == "GET":
        return jsonify(user.serialize()), 200

    elif request.method == "PUT":
        data = request.get_json()

        if not user.user_info:
            return jsonify({"msg": "User info not found for this user"}), 404

        if 'userName' in data:
            user.user_info.userName = data['userName']
        if 'avatar' in data:
            user.user_info.avatar = data['avatar']
        if 'birthday' in data:

            try:
                from datetime import datetime
                user.user_info.birthday = datetime.strptime(
                    data['birthday'], '%Y-%m-%d')
            except ValueError:
                return jsonify({"msg": "Invalid birthday format. Use YYYY-MM-DD"}), 400
        if 'genre' in data:
            user.user_info.genre = data['genre']

        db.session.commit()

        return jsonify({"msg": "Profile updated successfully", "user_info": user.user_info.serialize()}), 200





# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
