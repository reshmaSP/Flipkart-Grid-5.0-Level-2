

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

from pymongo import MongoClient

client = MongoClient("mongodb+srv://manushreedubey:MD@grid05.eslf2n5.mongodb.net/")
db = client["Grid05"]
user_info=db["Users"]
product_data=db['Products']

def findUser(email_id):
  # Query to find a user based on email ID
  query = {'email': email_id}
  user = user_info.find_one(query)

  if user:
    print(f"User with email {email_id} exists.")
    print("User details:")
    print(user)
    return True

  else:
    print(f"User with email {email_id} does not exist.")
    return False

def add_user(email, name, password, phone_number, bought_products=[], visited_products=[]):
    # MongoDB Configuration
    # Check if user with the given email already exists
    existing_user = user_info.find_one({'email': email})
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
        result = user_info.insert_one(new_user)
        if result.acknowledged:
            print(f"User with email {email} added successfully.")
        else:
            print("Failed to add user.")

add_user('abc@yahoo.com', 'John Smith', 'Man123', '9878656461', ["c2d766ca982eca8304150849735ffef9"], ["c2d766ca982eca8304150849735ffef9", "29c8d290caa451f97b1c32df64477a2c", "7f7036a6d550aaa89d34c77bd39a5e48", "f449ec65dcbc041b6ae5e6a32717d01b", "bc940ea42ee6bef5ac7cea3fb5cfbee7"])

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def get_user_visited_products(user_email):
    user = user_info.find_one({'email': user_email})
    if user:
        return user.get('visited_products', [])
    return []

def get_collaborative_recommendations(user_email, product_uniq_id):
    # Find products visited by the user
    increase_
    user_visited_products = get_user_visited_products(user_email)
    print("User Visited Products:", user_visited_products)

    # Find other users who have visited the same product
    similar_users = user_info.find({'visited_products': product_uniq_id})

    # Find products visited by similar users
    recommended_products = set()
    for similar_user in similar_users:
        similar_user_visited = similar_user.get('visited_products', [])
        recommended_products.update(similar_user_visited)

    # Remove the input product from recommended products
    recommended_products.discard(product_uniq_id)

    # Get recommended product details
    recommended_products_details = []
    for doc in product_data.find({'uniq_id': {'$in': list(recommended_products)}}, {'_id': 0, 'uniq_id': 1, 'product_name': 1}).limit(10):
        recommended_products_details.append(doc)

    return recommended_products_details


def add_visited_product(user_email, product_uniq_id):
    user_info.update_one({'email': user_email}, {'$addToSet': {'visited_products': product_uniq_id}})

# Provide user's email and product's uniq_id
user_email = "manushree.dubey@spit.ac.in"
product_uniq_id = "c2d766ca982eca8304150849735ffef9"

# Add the visited product to the user's visited list
add_visited_product(user_email, product_uniq_id)

# Get collaborative recommendations for the user
recommended_products = get_collaborative_recommendations(user_email, product_uniq_id)

# Print recommended products' uniq_id and product_name
print("Recommended Products:")
for product in recommended_products:
    print(product['uniq_id'], product['product_name'])

def get_user_bought_products(user_email):
    user = user_info.find_one({'email': user_email})
    if user:
        return user.get('bought_products', [])
    return []

def get_collaborative_bought_recommendations(user_email, product_uniq_id):
    # Find products bought by the user
    user_bought_products = get_user_bought_products(user_email)

    # Add the input product to visited products for the current user
    add_visited_product(user_email, product_uniq_id)

    # Find users who have also bought the input product
    users_who_bought_input = user_info.find({'bought_products': product_uniq_id})

    # Find products bought by these users
    recommended_products = set()
    for user in users_who_bought_input:
        recommended_products.update(user.get('bought_products', []))

    # Remove the input product from recommended products
    recommended_products.discard(product_uniq_id)

    # Get recommended product details
    recommended_products_details = []
    input_product = product_data.find_one({'uniq_id': product_uniq_id})
    input_product_category = input_product.get('category')

    for doc in product_data.find({'uniq_id': {'$in': list(recommended_products)}}, {'_id': 0, 'uniq_id': 1, 'product_name': 1, 'category': 1}).limit(10):
        if doc.get('category') == input_product_category:
            recommended_products_details.append(doc)

    return recommended_products_details

def add_visited_product(user_email, product_uniq_id):
    user_info.update_one({'email': user_email}, {'$addToSet': {'visited_products': product_uniq_id}})


user_email = "manushree.dubey@spit.ac.in"
product_uniq_id = "c2d766ca982eca8304150849735ffef9"

# Get collaborative recommendations based on bought products and matching category
recommended_products = get_collaborative_bought_recommendations(user_email, product_uniq_id)

# Print recommended products' uniq_id and product_name
print("Recommended Products Bought Together:")
for product in recommended_products:
    print(product['uniq_id'], product['product_name'])