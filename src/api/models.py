from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Boolean, String, Integer, Date
import datetime

db = SQLAlchemy()

friends = db.Table('friends',
                   db.Column('user_id', db.Integer, db.ForeignKey(
                       'users.id'), primary_key=True),
                   db.Column('friend_id', db.Integer, db.ForeignKey(
                       'users.id'), primary_key=True)
                   )


class User(db.Model):

    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=True)
    experience_points: Mapped[int] = mapped_column(server_default='0')

    user_info = relationship(
        "UserInfo", back_populates="user", uselist=False, cascade="all, delete-orphan")

    games_played = db.relationship(
        'Game', back_populates='user', foreign_keys='Game.user_id')
    friends = db.relationship(
        'User',
        secondary=friends,
        primaryjoin=(id == friends.c.user_id),
        secondaryjoin=(id == friends.c.friend_id),
        backref='friend_of'
    )

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "experience_points": self.experience_points,
            "friends": [friend.id for friend in self.friends],
            "user_info": self.user_info.serialize() if (self.user_info) else None
        }

    def add_friend(self, other_user):
        if other_user not in self.friends:
            self.friends.append(other_user)
        if self not in other_user.friends:
            other_user.friends.append(self)

    def remove_friend(self, other_user):
        if other_user in self.friends:
            self.friends.remove(other_user)
        if self in other_user.friends:
            other_user.friends.remove(self)


class UserInfo(db.Model):

    __tablename__ = 'users_info'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), unique=True, nullable=False)
    userName: Mapped[str] = mapped_column(
        String(30), unique=True, nullable=False)
    avatar: Mapped[str] = mapped_column(nullable=False)
    genre: Mapped[str] = mapped_column(String(50), nullable=False)
    birthday: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    user = relationship("User", back_populates="user_info")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "userName": self.userName,
            "avatar": self.avatar,
            "genre": self.genre,
            "birthday": self.birthday,
        }


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    correct_answers = db.Column(db.Integer, nullable=False, server_default='0')
    time_taken = db.Column(db.Float, nullable=False, server_default='0')
    points = db.Column(db.Integer, nullable=False, server_default='0')

    user = db.relationship('User', back_populates='games_played')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "correct_answers": self.correct_answers,
            "time_taken": self.time_taken,
            "points": self.points,
        }
