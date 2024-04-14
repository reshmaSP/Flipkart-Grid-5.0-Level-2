from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import math
from bson.json_util import dumps
import json
from model import get_recommendations

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# MongoDB Configuration
client = MongoClient('mongodb+srv://manushreedubey:MD@grid05.eslf2n5.mongodb.net/')
db = client['Grid05']
collection = db['Products']
users_collection = db["users"]
print("Hello")

def add_user(email, name, password, phone_number, bought_products=[], visited_products=[]):
    # MongoDB Configuration
    # Check if user with the given email already exists
    existing_user = users_collection.find_one({'email': email})
    if existing_user:
        print(f"User with email {email} already exists.")
    else:
        # Create a new user document
        new_user = {
            'email': email,
            'name': name,
            'password': password,
            'phone_number': phone_number,
            'bought_products': bought_products,
            'visited_products': visited_products
        }

        # Insert the new user document into the collection
        result = users_collection.insert_one(new_user)
        if result.acknowledged:
            print(f"User with email {email} added successfully.")
        else:
            print("Failed to add user.")