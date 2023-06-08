from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin




follows = db.Table(
    'follows',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_is', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('following', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),

    db.UniqueConstraint('user_is', 'following')
)
if environment == "production":
    follows.schema = SCHEMA






class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    bio = db.Column(db.String(2000))
    profile_pic = db.Column(db.String(2000))
    hashed_password = db.Column(db.String(255), nullable=False)

    products = db.relationship('Product', back_populates='user') # double check
    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')



    # user_a = db.relationship("User", back_populates="user_is")
    # user_b = db.relationship("User", back_populates="following")



    following = db.relationship('User', secondary='follows',
                                primaryjoin=follows.c.user_is == id,
                                secondaryjoin=follows.c.following == id,
                                backref='friends')




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
            'email': self.email,
            'bio': self.bio,
            'profile_pic': self.profile_pic,
            'is_following': {}
        }



# class Follow(db.Model):
#     __tablename__ = 'follows'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_is = db.Column('user_is', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     following = db.Column('following', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

#     db.UniqueConstraint('user_is', 'following')

#     user_is = db.relationship("User", back_populates="user_a")
#     following = db.relationship("User", back_populates="user_b")



#     def __repr__(self):
#         return f'< User {self.user_is} is now following User {self.following}!  >'


#     def to_dict(self):
#         return {
#             'user_is':{
#                 'id': self.user_is.id,
#                 'first_name': self.user_is.first_name,
#                 'last_name': self.user_is.last_name,
#                 'username': self.user_is.username
#             },
#             'following': {
#                 'id': self.following.id,
#                 'first_name': self.following.first_name,
#                 'last_name': self.following.last_name,
#                 'username': self.following.username
#             }
#         }








# nice

#oooo smooth
