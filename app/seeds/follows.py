from app.models import db, environment, SCHEMA
from ..models.user import Follow
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_follows():
    friend1 = Follow(      #friend2 follows friend1
        following=1, user_is=2)
    friend2 = Follow(
        following=2, user_is=3)
    friend3 = Follow(
        following=3, user_is=1)
    friend4 = Follow(
        following=1, user_is=3)
    friend5 = Follow(
        following=3, user_is=2)
    friend6 = Follow(
        following=2, user_is=1)


    db.session.add(friend1)
    db.session.add(friend2)
    db.session.add(friend3)
    db.session.add(friend4)
    db.session.add(friend5)
    db.session.add(friend6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
