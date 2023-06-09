from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    mike = User(
        username='michael-myers', first_name='Michael', last_name='Myers', email='mike@myers.io', bio= 'As a young boy I murdered my elder sister, Judith Myers. Fifteen years later, I went home to Haddonfield, Illinois, to murder more teenagers.', profile_pic='https://insidethemagic.net/wp-content/uploads/2022/10/Untitled-design-12-800x400.jpg', password='password'
        )
    laurie = User(
        username='laurie-strode', first_name = "Laurie", last_name = "Strode", email='laurie@strode.io', bio='A high school student 📚, love to babysit 💖, available on Halloween night 🎃. Be safe!', profile_pic='https://bloody-disgusting.com/wp-content/uploads/2018/01/laurie.jpg', password='password'
        )
    josh = User(
        username='josh-lambert', first_name='Josh', last_name='Lambert', email='josh@lambert.io', bio= 'Enjoy working with psychics! Sometimes I feel like someone\'s watching me from where I can\'t see them...👹 but this person is familiar somehow... I just can\'t remember.', profile_pic='https://static1.personality-database.com/profile_images/a13104475a104f1b87d974cc5b30823a.png', password='password'
        )
    red_demon = User(
        username='red-demon', first_name='Red', last_name='Demon', email='red@demon.io', bio= 'Live in the Further. I\'ll be there for you when you need it! Trust 🤞', profile_pic='https://cdn.vox-cdn.com/thumbor/x-Qs157Ntjycze7qGEKmELQRkQ8=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22416406/insidious.jpg', password='password'
    )
    woman_in_white = User(
        username='woman-in-white', first_name='Woman', last_name='In White', email='woman@white.io', bio= 'Litte stern, more bossy.. mostly a ghost 💋 Parker Crane\'s mom', profile_pic='https://genkinahito.files.wordpress.com/2013/12/insidious-2-parker-cranes-mother-danielle-bisutti.jpg', password='password'
    )
    annabelle = User(
        username='annabelle', first_name='Annabelle', last_name='Higgins', email='annabelle@higgins.io', bio= '7, account ran by my mom. Just want everyone to love me! Don\'t leave my page :)', profile_pic='https://images.indianexpress.com/2017/08/annabelle4.jpg', password='password'
    )
    lorraine = User(
        username='lorraine-warren', first_name='Lorraine', last_name='Warren', email='lorraine@warren.io', bio= 'Fun fact: most unwanted spirits enter through vehicles such as Ouija boards, Tarot Cards and psychics. Keep kids from such things! 7 of 10 cases involves someone with a Ouija board asking, “Is there a spirit here?”', profile_pic='https://www.deccanherald.com/sites/dh/files/article_images/2019/04/20/Lorraine%20warren%20%20Twitter-1555758240.jpg', password='password'
    )
    ed = User(
        username='ed-warren', first_name='Ed', last_name='Warren', email='ed@warren.io', bio= 'My wife and I investigate paranormal activity. Some of our most popular cases include: the Amityville horror and the Enfield poltergeist. Check them out!', profile_pic='https://s.hdnux.com/photos/01/01/64/26/17253789/4/1200x0.jpg', password='password'
    )
    pennywise = User(
        username='pennywise', first_name='IT', last_name='a.k.a Pennywise', email='penny@wise.io', bio= 'Shapeshifter XD. Live in the good old macroverse. I know all your worst fears... jk... but 👀', profile_pic='https://didyoublankthat.files.wordpress.com/2020/10/1501685894-it-pennywise.jpg', password='password'
    )
    georgie = User(
        username='georgie', first_name='George', last_name='Denbrough', email='george@denbrough.io', bio= 'My older brother runs this account :) I enjoy sailboats', profile_pic='https://i.pinimg.com/736x/03/86/f6/0386f6a5dce5897064843752233e1274.jpg', password='password'
    )
    bill = User(
        username='bill-denbrough', first_name='Bill', last_name='Denbrough', email='bill@denbrough.io', bio= 'a.k.a Stuttering Bill, leader of the Loser\'s Club!', profile_pic='https://i.pinimg.com/550x/1e/eb/b4/1eebb4e4d04df4aa503cf5a4eb6f1e55.jpg', password='password'
    )
    chris = User(
         username='chris-washington', first_name='Chris', last_name='Washington', email='chris@washington.io', bio= 'Photographer 📸 Enjoying life 💜 Rosie', profile_pic='https://metadata-static.plex.tv/extras/iva/250507/502d06ec7ddddb09d97b220c86cc3869.jpg', password='password'
    )
    roman = User(
        username='roman-armitage', first_name='Roman', last_name='Armitage', email='roman@armitage.io', bio= '\'36 Olympics 🏃‍♂️ Armitage Estate caretaker', profile_pic='https://gray-wsfa-prod.cdn.arcpublishing.com/resizer/eVKNoQLXFpjeL4czwlV5QhL8yKE=/1200x675/smart/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/gray/3YS2BJFRG5EPDENX2GFUSRPVM4.jpg', password='password'
    )
    jack = User(
        username='jack-torrance', first_name='Jack', last_name='Torrance', email='jack@torrance.io', bio= 'Former teacher, winter caretaker at the Overlook Hotel, author.', profile_pic='https://www.indiewire.com/wp-content/uploads/2018/03/stanley-kubricks-the-shining-at-universals-halloween-horror-nights-2017.jpg', password='password'
    )
    freddy = User(
        username='freddy-krueger', first_name='Freddy', last_name='Krueger', email='freddy@krueger.io', bio= 'Man of your dreams 💭 Give me a chance and hmu! > snap: fred-krueg', profile_pic='https://upload.wikimedia.org/wikipedia/en/e/eb/Freddy_Krueger_%28Robert_Englund%29.jpg', password='password'
    )
    boogeyman = User(
        username='boogeyman', first_name='Boogeyman', last_name='.', email='boogey@man.io', bio= 'Boo 👻 🤣  Night owl 💤...', profile_pic='https://bloody-disgusting.com/wp-content/uploads/2023/05/boogey-3.png', password='password'
    )
    slender_man = User(
        username='slender-man', first_name='Slender', last_name='Man', email='slender@man.io', bio= '15\'6 tall ✌️ not a stalker, please believe me, it\'s a wrong place wrong time thing', profile_pic='https://parade.com/.image/t_share/MTkwNTc5MjI2MzU3NDc1MTk2/what-is-the-slender-man-ftr.jpg', password='password'
    )

    users = [mike, laurie, josh, red_demon, woman_in_white, annabelle, lorraine, ed, pennywise, georgie, bill, chris, roman, jack, freddy, boogeyman, slender_man]

    [db.session.add(user) for user in users]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
