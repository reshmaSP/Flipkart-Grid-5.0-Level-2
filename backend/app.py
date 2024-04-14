from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import math
from bson.json_util import dumps
import json
from model import get_recommendations
from addUser import add_user
app = Flask(__name__)
CORS(app)

# MongoDB Configuration
client = MongoClient('mongodb+srv://manushreedubey:MD@grid05.eslf2n5.mongodb.net/')
db = client['Grid05']
collection = db['Products']
users_collection = db["users"]
print("Hello")

def recommend_top_visited(limit=10):
    recommended_products = collection.find().sort('visits', -1).limit(limit)
    return list(recommended_products)


@app.route('/home',methods=['GET'])
def get_top_visited_recommendations():
    top_visited_recommendations = recommend_top_visited(limit=10)
    recommended_products = []

    for product in top_visited_recommendations:
        recommended_products.append(json.loads(dumps(product)))

    response = {
        'recommended_products': recommended_products
    }

    return jsonify(response)


@app.route('/products', methods=['GET'])
def get_products():

    non_nan_count = 0 
    products = []
    for product in collection.find({}, {'_id': 0, 'uniq_id': 1, 'product_name': 1, 'discounted_price': 1, 'image': 1, 'category': 1}).limit(5000):
        # Filter out NaN values
        if not any(math.isnan(product[field]) for field in ['discounted_price']):
            non_nan_count += 1
            products.append(product)

    # Print the count of non-NaN products
    print("Number of non-NaN products:", non_nan_count)

    return jsonify(products)


@app.route('/products/<product_id>', methods=['GET'])
def get_product_details(product_id):
    product = collection.find_one({'uniq_id': product_id})
    
    if product:
        json_product = json.loads(dumps(product))
        
        # Get recommended product details
        target_product_id = product_id
        recommended_product_ids = get_recommendations(target_product_id)
        recommended_products = []
        
        for rec_id in recommended_product_ids:
            recommended_product = collection.find_one({'uniq_id': rec_id})
            if recommended_product:
                recommended_products.append(json.loads(dumps(recommended_product)))
        
        response = {
            'product_details': json_product,
            'recommended_products': recommended_products
        }
        
        return jsonify(response)
    
    return jsonify({'message': 'Product not found'}), 404




@app.route('/signup', methods=['POST'])
def signup():
    try:
       
       user_data = request.json

       email = user_data.get('email')
       name = user_data.get('name')
       password = user_data.get('password')
       phone_number = user_data.get('phone_number')
        
        # Assuming you have the 'add_user' function defined somewhere
       add_user(email, name, password, phone_number, [], [])
        
       response_message = {"message": "User registered successfully"}
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
