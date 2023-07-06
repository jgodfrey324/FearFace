from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField,TextAreaField, IntegerField,DateField
from wtforms.validators import DataRequired, Length, URL, Email, ValidationError


def text_length(form, field):
    # Checking if post length is correct
    text = field.data
    if len(text) > 5000 or len(text) < 5:
        raise ValidationError('* Post must be between 5 and 5,000 characters')

class PostForm(FlaskForm):
    text = TextAreaField("Text",validators=[DataRequired(), text_length])
    created_at = DateField("Date")
    submit = SubmitField("Submit")


# class PostImageForm(FlaskForm):
#     url = StringField("ImageURL", validators=[Length(min=0,max=2000)],nullable=False)
#     # post_id = IntegerField("Post",nullable=False)
#     submit = SubmitField("Submit")

class CommentForm(FlaskForm):
    text = StringField("Text", validators=[DataRequired(), text_length])
    created_at = DateField("Date")
    submit = SubmitField("Submit")
