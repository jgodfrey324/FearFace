from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker


fake = Faker()

def seed_products():

    prod1 = Product(
        name="Necronomicon Ex-Mortis", location_city="Gainesville", location_state="Florida", description="Family-friendly book, kids will love it!", price=19.99, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod2 = Product(
        name="Anabelle Doll", location_city="Tombstone", location_state="Arizona", description="Adorable toy for your kids! Perfect sleep buddy!", price=11.99, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod3 = Product(
        name="Death Note", location_city="Tokyo",location_state ="Japan",description="Write your name in this diary to attain divine power", price=69.99, user_id=2,created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod4 = Product(
        name="Crucifix", location_city="Raleigh", location_state="North Carolina", description="Protection of the most unholy entities", price=4.99, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod5 = Product(
        name="Ouija Board", location_city="Salem", location_state="Massachusetts", description="Fun board game for familys! Especially fun at night!", price=24.99, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    prod6 = Product(
        name="VHS Tape", location_city="Blair",location_state ="Maryland",description="Children's educational video, get pre-school ready!", price= 39.99, user_id=3,created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    db.session.add(prod1)
    db.session.add(prod2)
    db.session.add(prod3)
    db.session.add(prod4)
    db.session.add(prod5)
    db.session.add(prod6)
    db.session.commit()




def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
