from flask import Blueprint, flash,render_template,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Post, PostImage, Comment
from ...models.user import User,Follow
from ...forms.post_form import PostForm,PostImageForm



posts = Blueprint("posts", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages




@posts.route("")
@login_required
def all_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()

    # user_id = current_user.id
    user = User.query.get(current_user.id)
    user_friends = user.following
    following_ids = [following.id for following in user_friends]
    following_ids.append(user.id)

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

    return post_list


@posts.route("", methods=["POST"])
@login_required
def create_posts():
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        selected_user = User.query.get(current_user.id)

        result = Post(
            text = request.form.get("text"),
            created_at = date.today(),
            user = selected_user
        )
        db.session.add(result)
        db.session.commit()
        return {"resPost": result.to_dict()}

    if form.errors:
        print("this is form error =====>",form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400






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
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400






@posts.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_post(id):
    post = Post.query.get(id)

    post.text = request.form.get('text')

    if len(post.text) < 3 or len(post.text) > 5000:
        return {'errors': 'Post must be between 5 and 5,000 characters'}, 400

    post.created_at = date.today()
    post.user_id = current_user.id
    db.session.add(post)
    db.session.commit()

    return {"resPost": post.to_dict()}



@posts.route("/<int:id>/delete", methods=["DELETE"])
def delete(id):
    post_to_delete = Post.query.get(id)
    db.session.delete(post_to_delete)
    db.session.commit()
    return {"res": "Successfully deleted"}
