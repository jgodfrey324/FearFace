from app.models import db, environment, SCHEMA,Comment
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()


# created_at=fake.date_between(start_date='-5y', end_date='today')

# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        text = "Yo",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 4,
        user_id = 1
    )
    comment2 = Comment(
        text = "Sick picture my guy!",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 4,
        user_id = 3
    )
    comment3 = Comment(
        text = "This is Comment 3",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 3,
        user_id = 4
    )
    comment4 = Comment(
        text = "Love this 💜",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 4,
        user_id = 15
    )
    comment5 = Comment(
        text = "This is Comment 5",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 1,
        user_id = 2
    )
    comment6 = Comment(
        text = "Me !! ✋",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 3,
        user_id = 5
    )
    comment7 = Comment(
        text = "All the frickin time",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 7,
        user_id = 14
    )
    comment8 = Comment(
        text = "< 3",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 8,
        user_id = 14
    )
    comment9 = Comment(
        text = "😛 🤟",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 11,
        user_id = 15
    )
    comment10 = Comment(
        text = "😻 😻",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 11,
        user_id = 17
    )
    comment11 = Comment(
        text = "Me !! ✋",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 3,
        user_id = 5
    )
    comment12 = Comment(
        text = "Not cool! lol",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 12,
        user_id = 3
    )
    comment13 = Comment(
        text = "👁 👄 👁",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 12,
        user_id = 7
    )
    comment14 = Comment(
        text = "Love it !!!",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 13,
        user_id = 6
    )
    comment15 = Comment(
        text = "Legit know the best place I'll text you ",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 20,
        user_id = 17
    )
    comment16 = Comment(
        text = "bro ...",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 20,
        user_id = 15
    )
    comment17 = Comment(
        text = "😝",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 20,
        user_id = 15
    )
    comment18 = Comment(
        text = "barrrss",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 21,
        user_id = 16
    )
    comment19 = Comment(
        text = "🤣 🤣",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 22,
        user_id = 4
    )
    comment20 = Comment(
        text = "LMAO",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 22,
        user_id = 8
    )
    comment21 = Comment(
        text = "😭 😭 😭",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 22,
        user_id = 14
    )
    comment22 = Comment(
        text = "STOP",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 22,
        user_id = 15
    )
    comment23 = Comment(
        text = "but I'm scared of you bro 😭 🤣",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 22,
        user_id = 16
    )
    comment24 = Comment(
        text = "😭",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 25,
        user_id = 9
    )
    comment25 = Comment(
        text = "👁 👄 👁",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 30,
        user_id = 13
    )
    comment26 = Comment(
        text = "this guy ...",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 36,
        user_id = 15
    )
    comment27 = Comment(
        text = "handsome",
        created_at=fake.date_between(start_date='-5y', end_date='today'),
        post_id = 39,
        user_id = 5
    )


    comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20, comment21, comment22, comment23, comment24, comment25, comment26, comment27]

    [db.session.add(comment) for comment in comments]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
