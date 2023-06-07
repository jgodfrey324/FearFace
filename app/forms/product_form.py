from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField, FloatField
from wtforms.validators import DataRequired, ValidationError


def text_length(form, field):
    # Checking if post length is correct
    text = field.data
    if len(text) > 5000 or len(text) < 5:
        raise ValidationError('Post must be between 5 and 5,000 characters')


class ProductForm(FlaskForm):
    # name, location city, location state, price, description
    name = StringField("Name", validators=[DataRequired()])
    location_city = StringField("City", validators=[DataRequired()])
    location_state = StringField("State", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[
                                DataRequired(), text_length])
    submit = SubmitField("Submit")
