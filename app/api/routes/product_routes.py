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
            user = selected_user,
            created_at = date.today()
        )
        db.session.add(res)
        db.session.commit()
        return {"resProduct":res.to_dict()}
    if form.errors:
        return {'error':validation_errors_to_error_messages(form.errors)},400






#update product
@products.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_product(id):

    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        selected_user = User.query.get(current_user.id)

        prod = Product.query.get(id)
        prod.name = form.data['name']
        prod.location_city = form.data['location_city']
        prod.location_state = form.data['location_state']
        prod.description = form.data['description']
        prod.price = form.data['price']
        prod.user = selected_user
        prod.created_at = date.today()

        db.session.commit()
        return {"resProduct": prod.to_dict()}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400








@products.route("/<int:id>/delete",methods=["DELETE"])
@login_required
def delete_product(id):
    product_to_delete = Product.query.get(id)
    db.session.delete(product_to_delete)
    db.session.commit()
    return {"res":"Successfully deleted"}
