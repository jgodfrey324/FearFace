from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from sqlalchemy import insert
from sqlalchemy.sql import text
from ..models.db import db
from app.models import User
from app.models import Comment,Post
from ..models.user import follows
# from ..models.user import Follow

user_routes = Blueprint('users', __name__)






@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()

    res = {}
    for user in users:
        user = user.to_dict()
        res[user['id']]= user

    return res






@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
     #get all posts
    posts = Post.query.order_by(Post.created_at.desc()).all()

    my_posts = [post for post in posts if post.user.id == id]

    post_ids = [post.id for post in my_posts]
    # get current user
    user = User.query.get(id)
    # get all comments of the posts being returned
    post_comments = Comment.query.filter(Comment.post_id.in_(post_ids)).all()
    # making list of 'json' objects
    comment_list = [comment.to_dict() for comment in post_comments]

    post_list = [post.to_dict() for post in my_posts]


    # loop through posts and attach comments to post
    for post in post_list:
        for comment in comment_list:
            if comment['post_id'] == post['id']:
                comments = post['comments']
                comments[comment['id']] = comment

    user_dict = user.to_dict()
    # make dictionary to return
    res = {}
    res[user_dict['id']] = { 'is_following': {}, "posts": {} }
    # loop through edited posts list and flatten data
    for post in post_list:
        post_id = post['id']
        user_id = user_dict['id']
        res[user_id]['posts'][post_id] = post

    friends = user_dict['is_following']

    for friend in user.following:
        friend_id = friend.id
        friends[friend_id] = friend.to_dict()

    res[user_dict['id']]['is_following'] = friends


    # return as DICT
    return res




@user_routes.route('/<int:id>/friends', methods=["POST"])
@login_required
def follow_user(id):
    # save insertion into the follows table to variable
    relationship = insert(follows).values(user_is = current_user.id, following = id)
    # execute statement
    db.session.execute(relationship)
    # save to the db
    db.session.commit()

    return { "res": "user was followed" }




@user_routes.route('/<int:id>/friends', methods=["DELETE"])
@login_required
def unfollow_user(id):
    # get list of columns that satisfy filter
    user_is_res = list(db.session.query(follows).filter(follows.c.user_is == current_user.id))
    # another list of columns that satisfy filter
    following_res = list(db.session.query(follows).filter(follows.c.following == id))
    # loop through one list, find a match between the two lists, and delete it
    for instance in user_is_res:
        if instance in following_res:
            db.session.query(follows).filter(follows.c.id == instance[0]).delete(synchronize_session=False)

    # save to db
    db.session.commit()

    return {"res": "User was unfollowed"}





@user_routes.route('/<int:id>/comments')
@login_required
def all_comments_user(id):
    user_comments = Comment.query.all()
    comments = [comment.to_dict() for comment in user_comments if comment.user.id == id]
    return comments
