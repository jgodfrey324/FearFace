from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# class User(db.Model, UserMixin):
#     __tablename__ = 'users'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(40), nullable=False, unique=True)
#     email = db.Column(db.String(255), nullable=False, unique=True)
#     hashed_password = db.Column(db.String(255), nullable=False)

#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.hashed_password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'username': self.username,
#             'email': self.email
#         }

# class Follow(db.Model):
#     __tablename__ = 'follows'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     following = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     user_is = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    # def__repr__




class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    products = db.relationship('Product', back_populates='user') # double check
    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    # followers = db.relationship('User', secondary='follows',
    #                             primaryjoin=Follow.following == id,
    #                             secondaryjoin=Follow.user_is == id,
    #                             backref='following')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f'<User {self.id}, {self.first_name} {self.last_name}, is @{self.username}>'

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email
        }


# nice

#oooo smooth
