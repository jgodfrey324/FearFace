from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_images():
    image1 = ProductImage(
        url='https://pm1.aminoapps.com/6884/96142e33a5ebfea54a627043c9077a34daa11fe9r1-1024-989v2_uhq.jpg', product_id=1
        )
    image2 = ProductImage(
        url='https://images.squarespace-cdn.com/content/v1/5e77ab0945630059ae9df7ff/1585257905226-8ZKOWOPN818HMC1XU4DF/Annabelle+doll.jpg', product_id=2
        )
    image3 = ProductImage(
        url='https://ae01.alicdn.com/kf/H1e1853718f8c4a408b1240bca21279a9V/DEATH-NOTE-Notebook-Agenda-Notepad-Black-Color-PU-Leather-Hardcover-100gsm-paper-192pages.jpg', product_id=3
        )
    image4 = ProductImage(
        url='https://m.media-amazon.com/images/I/91AR2Ao3BCL._UF1000,1000_QL80_.jpg', product_id=4
        )
    image5 = ProductImage(
        url='https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322863/ouija-board.jpg', product_id=5
        )
    image6 = ProductImage(
        url='https://i.etsystatic.com/9219934/r/il/d7ce49/1770671430/il_fullxfull.1770671430_hkw3.jpg', product_id=6
        )
    image7 = ProductImage(
        url='https://media.wired.com/photos/5a8391eeab6b9732a8555cae/16:9/w_2400,h_1350,c_limit/flashlight-595110980.jpg', product_id=7
        )
    image8 = ProductImage(
        url='https://w0.peakpx.com/wallpaper/48/1007/HD-wallpaper-red-balloon-it-balloon-creepy-dark-horror-it-note-10-red.jpg', product_id=8
        )
    image9 = ProductImage(
        url='https://i.pinimg.com/736x/fd/11/da/fd11daebb9a171965dd66e6c595cfa83--red-velvet-funny-stuff.jpg', product_id=9
        )
    image10 = ProductImage(
        url='https://i.pinimg.com/236x/e2/e6/c7/e2e6c769ef39f42eb8d422176320c855--historical-costume-historical-clothing.jpg', product_id=10
        )
    image11 = ProductImage(
        url='https://i.pinimg.com/originals/e3/1b/c9/e31bc9cb863d4c8113c5be376d0119e4.jpg', product_id=11
    )
    image12 = ProductImage(
        url='https://i.ytimg.com/vi/vuXi8e93khU/maxresdefault.jpg', product_id=12
    )
    image13 = ProductImage(
        url="https://i.imgur.com/QzEppPr.jpg", product_id=13
    )
    image14 = ProductImage(
        url="https://bbts1.azureedge.net/images/p/full/2022/08/e0c3ee85-5ef4-41da-ad47-df515337561e.jpg", product_id=14
    )
    image15 = ProductImage(
        url="https://i.imgur.com/0aHKGy3.jpg", product_id=15
    )
    image16 = ProductImage(
        url="https://horrorfeminista.files.wordpress.com/2012/11/1insidious05.jpg", product_id=16
    )
    image17 = ProductImage(
        url="https://i.pinimg.com/736x/18/32/1c/18321ca44c7235504c4bacbdff3d1ba5.jpg", product_id=17
    )
    image18 = ProductImage(
        url="https://i.imgur.com/vk9oFqb.jpg", product_id=18
    )
    images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18]

    [db.session.add(image) for image in images]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
