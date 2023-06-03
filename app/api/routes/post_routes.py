from flask import Blueprint, flash
from flask_login import login_required, current_user
from ...models.db import db
from ...models.models import Post, PostImage, Comment
from ...models.user import User,Follow



posts = Blueprint("posts", __name__)

@posts.route("")
# @login_required
def all_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()

    # user_id = current_user.id
    user = User.query.get(1)
    user_friends = user.following
    following_ids = [following.id for following in user_friends]

    follower_posts =[post for post in posts if post.user_id in following_ids]
    follower_post_ids =[post.id for post in follower_posts]
    post_comments = Comment.query.filter(Comment.post_id.in_(follower_post_ids)).all()
    comment_list = [comment.to_dict() for comment in post_comments]
    post_list = [post.to_dict() for post in follower_posts]

    for post in post_list:
        for comment in comment_list:
            if comment['post_id'] == post['id']:
                comments = post['comments']
                comments[comment['id']] = comment

    res = post_list
    return res




# posts: {
#     1: {
#       id: 1,
#       text: 'Example post body...',
#       post_images: {
#         1: {
#           id: 1,
#           url: 'x.jpg'
#         },
#         2: {
#           id: 2,
#           url: 'y.jpg'
#         }
#       },
#       user: {
#         id: 4,
#         username: 'fake-user',
#         first_name: 'Fake',
#         last_name: 'User',
#         email: 'fake-user.io'
#       }
#   },
