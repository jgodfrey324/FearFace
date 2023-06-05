from app.models import db, environment, SCHEMA
from ..models.user import follows
from sqlalchemy.sql import text
from sqlalchemy import insert


# Adds a demo user, you can add other users here if you want
def seed_follows():
    friends_list = [
        {'following': 1, 'user_is': 2},
        {'following': 2, 'user_is': 3},
        {'following': 3, 'user_is': 1},
        {'following': 1, 'user_is': 3},
        {'following': 3, 'user_is': 2},
        {'following': 2, 'user_is': 1},
    ]

    for friend in friends_list:
        user_is = friend['user_is']
        following = friend['following']

        relationship = insert(follows).values(user_is = user_is, following = following)
        db.session.execute(relationship)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
