from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from random import randint
from random import choices

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        avatar_choices = ["https://images-ext-1.discordapp.net/external/zhxa2dTWchJ_tE1xmUySwcDE57OflnMUwdmKrEnRyyM/https/static1.dualshockersimages.com/wordpress/wp-content/uploads/2022/01/Nezukos-New-Demon-Form-in-Demon-Slayer-Explained.jpg?width=1836&height=1034",
                          "https://images-ext-2.discordapp.net/external/Rl4I8LML5XaL5bbiQ4eR2mSatuZxXWzOawNMn1F_NsI/https/pbs.twimg.com/media/DXjlEkKV4AA-I_S.jpg?width=1034&height=1034",
                          "https://images-ext-2.discordapp.net/external/goFUdKoDcnXOveVgy4Mq0zvl4legaJEDZYUVhXgeLZQ/https/e0.pxfuel.com/wallpapers/582/659/desktop-wallpaper-junji-ito-horror-manga-thumbnail.jpg?width=700&height=1034",
                          "https://media.discordapp.net/attachments/1113249761743618210/1116871749980655708/image.png?width=786&height=814"]

        pic = request._cached_json[0]['profile_pic']

        if not pic:
            pic = avatar_choices[randint(0, 3)]


        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name= form.data['first_name'],
            last_name = form.data['last_name'],
            profile_pic = pic
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
