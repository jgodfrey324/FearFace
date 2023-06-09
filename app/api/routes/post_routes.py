from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Post, PostImage, Comment
from ...models.user import User
# removed follow import
from ...forms.post_form import PostForm
from ...forms.post_form import CommentForm



import os
import cloudinary
import cloudinary.uploader
# from flask.json import jsonify





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
    #get all posts
    posts = Post.query.order_by(Post.created_at.desc()).all()

    post_ids = [post.id for post in posts]

    # get all comments of the posts being returned
    post_comments = Comment.query.filter(Comment.post_id.in_(post_ids)).all()

    # making list of 'json' objects
    comment_list = [comment.to_dict() for comment in post_comments]
    post_list = [post.to_dict() for post in posts]

    # loop through posts and attach comments to post
    for post in post_list:
        for comment in comment_list:
            if comment['post_id'] == post['id']:
                comments = post['comments']
                comments[comment['id']] = comment

    # make dictionary to return
    res = {}
    # loop through edited posts list and flatten data
    for post in post_list:
        post_id = post['id']
        res[post_id] = post

    # return as DICT
    return res





@posts.route("/<int:id>/comments", methods=['POST'])
@login_required
def post_comment(id):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        selected_user = User.query.get(current_user.id)
        result=Comment(
            text = form.data['text'],
            created_at = date.today(),
            user = selected_user,
            post_id = id
        )
        db.session.add(result)
        db.session.commit()
        return {"resComment":result.to_dict()}
    if form.errors:
         return {'errors': validation_errors_to_error_messages(form.errors)}, 400





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
        db.session.add(result)
        db.session.commit()
        return {"resPost": result.to_dict()}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400






@posts.route("/<int:id>/images", methods=["POST"])
@login_required
def create_image(id):

    cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET'))

    upload_result = None

    if request.method == 'POST':
        file_to_upload = request.files['file']

    if file_to_upload:
        upload_result = cloudinary.uploader.upload(file_to_upload)

        # print('upload_result url ---------------------------------> ', upload_result['url'])
        result = PostImage(
            url = upload_result['url'],
            post_id = id
        )

        db.session.add(result)
        db.session.commit()

        # return {'post_id': f'{id}', 'image_url': jsonify(upload_result['url'])}
        return result.to_dict()




@posts.route('/images')
@login_required
def get_post_images():
    images = PostImage.query.all()

    res = {}

    for image in images:
        image_obj = image.to_dict()
        res[image_obj['id']] = image_obj

    return res





@posts.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_post(id):

    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        post = Post.query.get(id)
        post.text = form.data['text']
        post.created_at = date.today()

        db.session.commit()
        return {"resPost": post.to_dict()}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400





@posts.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete(id):
    post_to_delete = Post.query.get(id)
    db.session.delete(post_to_delete)
    db.session.commit()
    return {"res": "Successfully deleted"}
