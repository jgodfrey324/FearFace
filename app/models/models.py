from .db import db, environment, SCHEMA, add_prefix_for_prod
import os



environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    name = db.Column(db.String(50), nullable=False)
    location_city = db.Column(db.String(50), nullable=False)
    location_state = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.Date(), nullable=False) # .... need to get timestamp

    user = db.relationship('User', back_populates='products') # double check
    product_images = db.relationship('ProductImage', back_populates='product')


    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, posted a new product! {self.name}, Product #{self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            "price":self.price,
            'location_city': self.location_city,
            'location_state': self.location_state,
            'description': self.description,
            'created_at': self.created_at,
            'user': {    # might not be able to do this, but want to try
                'id': self.user.id,
                'username': self.user.username,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
                'email': self.user.email
            }
        }


class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2000), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    product = db.relationship('Product', back_populates='product_images') # double check


    def __repr__(self):
        return f'<Image {self.id} is associated with Product {self.product.id}, {self.product.name}>'

    def to_dict(self):  # think about how we can get product_images into the product for the slice of state..
        return {
            'id': self.id,
            'url': self.url,
            'product_id': self.product_id
        }


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(5000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.Date(), nullable=False) # somehow get timestamp..

    comments = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan") # double check
    post_images = db.relationship('PostImage', back_populates='post')
    user = db.relationship('User', back_populates='posts')


    def __repr__(self):
        return f'<User {self.id}, {self.user.username}, just posted! Post #{self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at,
            'user': {    # might not be able to do this, but want to try
                'id': self.user.id,
                'username': self.user.username,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
                'email': self.user.email
            },
            'comments': {}
        }


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.Date(), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    post = db.relationship('Post', back_populates='comments') # double check
    user = db.relationship('User', back_populates='comments')


    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, just commented on Post {self.post_id}!>'

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at,
            'post_id': self.post_id,
            'user': {    # might not be able to do this, but want to try
                'id': self.user.id,
                'username': self.user.username,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
                'email': self.user.email
            }
        }


class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2000), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)

    post = db.relationship('Post', back_populates='post_images') # double check


    def __repr__(self):
        return f'<Image {self.id} is associated with Post {self.post_id}>'

    def to_dict(self):  # think about how we can get post_images into the posts for the slice of state..
        return {
            'id': self.id,
            'url': self.url,
            'post_id': self.post_id
        }
