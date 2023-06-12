from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_products():

    prod1 = Product(
        name="Necronomicon Ex-Mortis", location_city="Gainesville", location_state="Florida", description=f"Ancient tome of prophecies, funerary incantations, and demon resurrection passages compiled by a race of beings known as The Dark Ones. While initially designed to serve as a compendium for all things supernatural for The Dark Ones only, the book eventually 'escaped' into the hands of humanity, where it has been passed from owner to owner since.", price=199.99, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod2 = Product(
        name="Anabelle Doll", location_city="Monroe", location_state="Connecticut", description="Annabelle is a haunted Raggedy Ann doll, housed in our now closed occult museum. Annabelle has been here since the hauntings in 1970.", price=35.00, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod3 = Product(
        name="Death Note", location_city="Tokyo",location_state ="Japan",description="Belonged to the shinigami Ryuk, this book grants the user the supernatural ability to kill anyone whose name is written in its pages.", price=300.00, user_id=16,created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod4 = Product(
        name="Crucifix + Rosemary", location_city="Monroe", location_state="Connecticut", description="Will provide protection from the powers of evil and death of of the most unholy entities", price=25.00, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod5 = Product(
        name="Ouija Board", location_city="Salem", location_state="Massachusetts", description="A flat board with numbers, letters, a few words, and a planchette (aka the board's moving device) is generally synonymous with breaking the veil between the living and dead realms. Many see it as a tool to open horrifying portals while others use it to curiously commune with 'the other side.'", price=15.99, user_id=16, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod6 = Product(
        name="Sack of VHS Tapes", location_city="Blair",location_state ="Maryland",description="Contains tapes from Heather Donahue and crews college documentary. The crew encounters the Blair Witch Curse, which is told as the following: Elly Kedward, a resident of the town (Blair) was banished for witchcraft in 1785. A year after her exile and presumed death, children from the town start to go missing. In 1940, a hermit named Rustin Parr abducts and kills seven children, claiming to have heard the voice of the Blair Witch.", price= 8.00, user_id=5,created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod7 = Product(
        name="LED Flashlight", location_city="Salem", location_state="Massachusetts", description="Be ready for anything, including a game of tag with Slenderman, with this super high quality, long lasting LED flashlight!", price=18.00, user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod8 = Product(
        name="Red Balloon", location_city="Derry", location_state="Maine", description="Beautiful large red balloon to boost happiness. Perfect gift for your child to take to the county fair.", price=2.00, user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod9 = Product(
        name="Red Velvet Bed", location_city="Springwood", location_state="Ohio", description="Very comfortable red velvet bed. Matches any design. No longer need", price=200.00, user_id=15, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod10 = Product(
        name="Wedding Dress", location_city="Los Angeles", location_state="California", description="Selling old wedding dress. While white is my color, it's just collecting dust here. Still in style, well taken care of.", price=15.99, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod11 = Product(
        name="Vanity", location_city="Los Angeles", location_state="California", description="Old vanity pictured for sale, me not included ;)", price=52.00, user_id=16, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod12 = Product(
        name="Vintage TV", location_city="Salem", location_state="Massachusetts", description="Well kept, woking vintage TV for sale. Looking change up the style of the room and the TV no longer fits our needs. First come first serve.", price=250.00, user_id=13, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod13 = Product(
        name ="Vintage Claw Gloves", location_city="Springwood",location_state="Ohio", description="Introducing the one and only Freddy Krueger Gloves—guaranteed to give you the most finger-lickin' fun you've ever had while scaring the socks off your friends! These bad boys are like a high-five from nightmares, straight from the man himself. Picture this: You're standing in a dark alley, ready to unleash some terror. These gloves are so razor-sharp, they can slice through butter faster than you can say scary movie marathon.", price=150.00, user_id=15, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod14 = Product(
        name ="Billy", location_city="Los Angeles", location_state="California", description="Good condition, can move around on it's own too", price=100.00, user_id=16, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod15 = Product(
        name ="La Prairie White Caviar Crème Extraordinare", location_city="Springwood", location_state="Ohio", description="A little bit used. Perfect condition. Good product but wasn't strong enough to make my skin glow. Originally $695", price=350.00, user_id=15, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod16 = Product(
        name ="Lambert House", location_city="Los Angeles", location_state="California", description="Overall very good condition, might have a slight demon problem but nothing like a good cleansing wouldn't fix. We would've stayed but we couldn't turn down another offer for a different home. This house is fine trust me.", price=400000.00, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod17 = Product(
        name ="Nun Portrait", location_city="Harrisville", location_state="Rhode Island", description="Very good condition. Perfect for the family living room. It has a cool effect where the eyes will follow you.", price=300.00, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod18 = Product(
        name = "Vintage Clock", location_city="San Francisco", location_state="California", description="Good conditioned clock - a whimsically wicked way to wake up that will make you jump out of bed faster than a kangaroo on a trampoline! Say goodbye to those boring, mundane alarm clocks and embrace the dark side of timekeeping.", price=120.00, user_id=16, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    products = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15, prod16, prod17, prod18]

    [db.session.add(prod) for prod in products]
    db.session.commit()




def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
