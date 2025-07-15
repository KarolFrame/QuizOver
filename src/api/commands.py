import click
from api.models import db, User, UserInfo
import datetime

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""


def setup_commands(app):
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users")  # name of our command
    @click.argument("count")  # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

    @app.cli.command("create-missing-userinfos")
    def create_missing_userinfos():
        print("Checking for users without UserInfo...")
        users = User.query.all()
        created_count = 0

        for user in users:
            if not user.user_info:
                info = UserInfo(
                    user_id=user.id,
                    userName=f"user{user.id}",
                    avatar="/favicon.ico",
                    genre="unspecified",
                    birthday=datetime.date(2000, 1, 1)
                )
                db.session.add(info)
                created_count += 1
                print(f"Created UserInfo for user ID {user.id}.")

        db.session.commit()
        print(f"Created {created_count} UserInfo records.")
    
    @app.cli.command("remove-all-friends")
    def remove_all_friends():
        print("Removing all friendships...")
        users = User.query.all()
        count = 0

        for user in users:
            for friend in list(user.friends):
                user.remove_friend(friend)
                count += 1

        db.session.commit()
        print(f"Removed {count} friendships.")

