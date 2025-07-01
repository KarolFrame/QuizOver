from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

friends = db.Table('friends',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friend_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model):

    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    rank: Mapped[int] = mapped_column(default=0)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    scores = db.relationship('Score', back_populates='user', cascade='all, delete-orphan')
    games_won = db.relationship('Game', back_populates='winner', foreign_keys='Game.winner_id')
    friends = db.relationship( 'User', secondary=friends, backref='friend_of')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rank": self.rank,
            "games_won": len(self.games_won),
            "friends": [friend.id for friend in self.friends],
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



class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    winner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    winner = db.relationship('User', back_populates='games_won')
    scores = db.relationship('Score', back_populates='game', cascade='all, delete-orphan')

    def serialize(self):
        return {
            "id": self.id,
            "winner_id": self.winner_id,
            "scores": [score.serialize() for score in self.scores]
        }


class Score(db.Model):
    __tablename__ = 'scores'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    correct_answers = db.Column(db.Integer, nullable=False)
    time_taken = db.Column(db.Float, nullable=False)
    points = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='scores')
    game = db.relationship('Game', back_populates='scores')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "game_id": self.game_id,
            "correct_answers": self.correct_answers,
            "time_taken": self.time_taken,
            "points": self.points,
        }

