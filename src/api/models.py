from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    #ranking: Mapped[int] = mapped_collumn(foreigner_key)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # "ranking": self.ranking
        }




# class FriendsRequests (db.Model):
#     user_id: Mapped[] #quien hace la solicitud 
#     friend_id:        #quien Acepta la solicitud 
#     state:            #acepted/recejected/pending  :  para popular la lista de amigos tengo que comprobar que user_id | friend_id === user.id & state === acepted
#                       # When acepted duplicar id mirrored
