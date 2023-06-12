from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
# from random import choice, sample, randint
from faker import Faker


fake = Faker()

# Adds a demo user, you can add other users here if you want


def seed_posts():
    post1 = Post(
        text='...🔪', user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post2 = Post(
        text='@LaurieStrode', user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post3 = Post(
        text='baby sitting Tommy tonight! 👻 anyone wanna come over for movies ??', user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post4 = Post(
        text='anyone know this guy? ...creepy', user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post5 = Post(
        text='homework date ? comment if you want 📖', user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post6 = Post(
        text='hiiii @Annie @Lynda 😄', user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post7 = Post(
        text='You feel like you\'rer close to remembering something but just can\'t quite picture it?', user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post8 = Post(
        text='Spent the day with the wife and my son Dalton. So relaxing and blessed.', user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post9 = Post(
        text='Any recommendations for therapists who are good with paranoia?', user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post10 = Post(
        text='spent another day grinding. come up and check me out at the Further 👹', user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post11 = Post(
        text='thanks @Josh for the pic! got my good side', user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post12 = Post(
        text='caught em slacking agin XD', user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post13 = Post(
        text='Can\'t hold a serious face to save my life 📸  More pics to come', user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post14 = Post(
        text='Stayed in to play today! Message my mom for a playdate :)', user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post15 = Post(
        text='Lots of people love to see me 🥰 Appreciate everyone!', user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post16 = Post(
        text='Going out on a case with Ed, I feel it\'s going to be a big one', user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post17 = Post(
        text='Please hold your questions for @Lorraine. She\'s a bit overwhelmed right now and her inbox is full. For now direct your questions to me and I will get you the proper resources!', user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post18 = Post(
        text='Please do not take a trip to our Ocult Musuem as a joke. The items inside are of serious nature.', user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post19 = Post(
        text='Take a look at this cool article done on us! Great coverage https://www.ctpost.com/projects/2021/visuals/ed-lorraine-warren/ ', user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post20 = Post(
        text='Just woke up from a nap.. looks like it\'s been 27 years? Need a snack', user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post21 = Post(
        text='🎶 Down here we float.. 🎶', user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post22 = Post(
        text='omg 🤣 🤣 🤣', user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post23 = Post(
        text='Just another rainy day ...', user_id=10, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post24 = Post(
        text='Tried out my new boat today 😁 😁 Saw somebody who said they knew a better place for it! Excited to see it', user_id=10, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post25 = Post(
        text='...pretty dark down here...', user_id=10, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post26 = Post(
        text='comment if you want to join the club !! #losers', user_id=11, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post27 = Post(
        text='movie night at the club :)', user_id=11, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post28 = Post(
        text='Taking a trip out to Armitage Estates with Rosie 💜 Post some pics from the trip soon', user_id=12, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post29 = Post(
        text='SMH can\'t find the keys 🤦‍♂️', user_id=12, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post30 = Post(
        text='Appreciate spending time with my girl 🤞', user_id=12, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post31 = Post(
        text='#athlete Don\'t forget ya\'ll! Could still beat anyone in a race 💪🏼', user_id=13, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post32 = Post(
        text='I\'ll come back strong for you, Wendy and Danny! Hit a low and now we\'re on the way back up', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post33 = Post(
        text='Need this job, thank you Overlook Hotel', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post34 = Post(
        text='Need space... too many distractions.. ', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post35 = Post(
        text='Is there any treatment to nightmares?', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post36 = Post(
        text='How can you tell a dream from reality?', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post37 = Post(
        text='How can you tell a dream from reality?', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post38 = Post(
        text='How can you tell a dream from reality?', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post39 = Post(
        text='Here\'s Johnny!', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    post40 = Post(
        text='Love how these pics turned out 😈 😘  Comment for more', user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today'))

    # post41 = Post(
    #     text='How can you tell a dream from reality?', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))
    # post42 = Post(
    #     text='How can you tell a dream from reality?', user_id=14, created_at=fake.date_between(start_date='-5y', end_date='today'))

    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post16, post17, post18, post19, post20,
             post21, post22, post23, post24, post25, post26, post27, post28, post29, post30, post31, post32, post33, post34, post35, post36, post37, post38, post39, post40]

    [db.session.add(post) for post in posts]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
