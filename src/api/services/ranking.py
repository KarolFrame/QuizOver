from sqlalchemy import desc
from api.models import User, UserInfo, db

def get_global_ranking():
    return db.session.query(User)\
        .order_by(desc(User.experience_points))\
        .all()