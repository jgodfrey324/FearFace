from flask import Blueprint, request
from flask_login import login_required
from datetime import date
from ...models.db import db
from ...models.models import Comment
from ...models.user import User
from ...forms.post_form import CommentForm
from flask_login import current_user



comments = Blueprint("comments", __name__)

# we could do this here or on the react side by disabling button lol
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages




@comments.route('')
@login_required
def get_comments():
    comments = Comment.query.all()

    res = {}

    for comment in comments:
        comment_obj = comment.to_dict()
        res[comment_obj['id']] = comment_obj

    return res



@comments.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully deleted comment'}
