from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField,TextAreaField, IntegerField,DateField
from wtforms.validators import DataRequired, Length, URL, Email


class PostForm(FlaskForm):
    text = TextAreaField("Text",validators=[Length(min=3,max=5000, message='Post characters must be between 5 and 5000 characters long.')], nullable=False)
    created_at = DateField("Date")
    submit = SubmitField("Submit")


class PostImageForm(FlaskForm):
    url = StringField("ImageURL", validators=[Length(min=0,max=2000)],nullable=False)
    # post_id = IntegerField("Post",nullable=False)
    submit = SubmitField("Submit")
