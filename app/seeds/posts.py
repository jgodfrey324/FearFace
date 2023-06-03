from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
# from random import choice, sample, randint
from faker import Faker


fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        text='This is Demo users post!', user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post2 = Post(
        text='This is Marnies post!', user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post3 = Post(
        text='This is boobies post!', user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today'))

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
