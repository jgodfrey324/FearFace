from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_post_images():
    image1 = PostImage(
        url='https://helterskelliter.files.wordpress.com/2020/06/halloween-1978-movie-still.jpg', post_id=2
        )
    image2 = PostImage(
        url='https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/halloween-hed-b9eb72a987a0c9740d68fbb35af90a6b.jpg', post_id=4
        )
    image3 = PostImage(
        url='https://i.pinimg.com/736x/64/12/29/641229483b303144f1ce8ee4947491d6--red-lipsticks-story-board.jpg', post_id=11
        )
    image4 = PostImage(
        url='https://static1.srcdn.com/wordpress/wp-content/uploads/2023/04/ty-simpkins-in-insidious-5.jpg', post_id=12
        )
    image5 = PostImage(
        url='https://cdn.mos.cms.futurecdn.net/XqPdSp5ZZcmDksZWxVYPiY-1200-80.jpg', post_id=13
        )
    image6 = PostImage(
        url='https://scarina.files.wordpress.com/2014/06/whitelady.jpg', post_id=14
        )
    image7 = PostImage(
        url='https://filmschoolrejects.com/wp-content/uploads/2019/08/pennywise_student_loans.jpg', post_id=22
        )
    image8 = PostImage(
        url='https://i.gzn.jp/img/2017/03/30/it/cap00014.jpg', post_id=23
        )
    image9 = PostImage(
        url='https://cdn.mos.cms.futurecdn.net/9CZR7GYth47bLQeT5GgYPa-1200-80.jpg', post_id=27
        )
    image10 = PostImage(
        url='https://vengonofuoridallefottutepareti.files.wordpress.com/2018/06/get-out-2017-daniel-kaluuya-allison-williams.png', post_id=30
        )
    image11 = PostImage(
        url='https://scarina.files.wordpress.com/2014/06/whitelady.jpg', post_id=40
    )
    # image11 = PostImage(
    #     url='https://cdn.mos.cms.futurecdn.net/XqPdSp5ZZcmDksZWxVYPiY-1200-80.jpg', post_id=13
    #     )

    images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11]

    [db.session.add(image) for image in images]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post_images"))

    db.session.commit()
