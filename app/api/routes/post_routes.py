from flask import Blueprint, flash,render_template,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Post, PostImage, Comment
from ...models.user import User,Follow
from ...forms.post_form import PostForm,PostImageForm



posts = Blueprint("posts", __name__)

@posts.route("")
@login_required
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


@posts.route("", methods=["POST"])
@login_required
def create_posts():
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        selected_user = User.query.get(current_user.id)
        result = Post(
            text = form.data["text"],
            created_at = date.today(),
            user = selected_user
        )
        print(result)
        db.session.add(result)
        db.session.commit()
        return {"resPost": result.to_dict()}

    if form.errors:
        print("this is form error =====>",form.errors)
        return {"error": form.errors}





@posts.route("/<int:id>/images", methods=["POST"])
@login_required
def create_image(id):
    form = PostImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        result = PostImage(
            image = form.data["url"],
            post_id = id
        )
        print(result)
        db.session.add(result)
        db.session.commit()
        return {"resImage": result.to_dict()}

    if form.errors:
        print("this is image error =====>",form.errors)
        return {"error": form.errors}





@posts.route("/<int:id>", methods=["PUT"])
@login_required
def update_post(id):
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    post = Post.query.get(id)
    if post:
        post.text = form.data['text']
        post.created_at = date.today()
        post.user_id = current_user.id

        print(post)
        db.session.add(post)
        db.session.commit()
        return {"resPost": post.to_dict()}

    return {'errors': "post wasn't found"}






# @posts.route("/delete/<int:id>")
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
#   }
