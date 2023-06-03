from app.models import db, environment, SCHEMA,Comment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()


# created_at=fake.date_between(start_date='-5y', end_date='today')

# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        text = "This is Comment 1",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 1,
        user_id = 3
    )
    comment2 = Comment(
        text = "This is Comment 2",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 2,
        user_id = 3
    )
    comment3 = Comment(
        text = "This is Comment 3",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 3,
        user_id = 2
    )
    comment4 = Comment(
        text = "This is Comment 4",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 2,
        user_id = 1
    )
    comment5 = Comment(
        text = "This is Comment 5",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 1,
        user_id = 2
    )
    comment6 = Comment(
        text = "This is comment 6",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 2,
        user_id = 2
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
