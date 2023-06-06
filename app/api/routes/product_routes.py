from flask import Blueprint, flash,request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Post, PostImage, Comment,Product
from ...models.user import User
from ...forms.product_form import ProductForm




products = Blueprint("products", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

#get all products
@products.route("")
def all_products():
    products = Product.query.order_by(Product.created_at.desc()).all()

    product_list = [product.to_dict() for product in products]

    res = {}

    for product in product_list:
        product_id = product['id']
        res[product_id] = product

    # print("this is our products ============================",res)
    return res

#create product
@products.route("",methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        selected_user = User.query.get(current_user.id)

        res = Product(
            name = form.data["name"],
            location_city = form.data["location_city"],
            location_state = form.data["location_state"],
            description = form.data["description"],
            price = form.data["price"],
            user = selected_user
        )
        db.session.add(res)
        db.session.commit()
        return {"resProduct":res.to_dict()}
    if form.errors:
        return {'error':validation_errors_to_error_messages(form.errors)},400
