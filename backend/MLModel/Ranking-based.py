import pandas as pd
from collections import defaultdict
import json
import ast

from pymongo import MongoClient

client = MongoClient("mongodb+srv://manushreedubey:MD@grid05.eslf2n5.mongodb.net/")
db = client["Grid05"]
user_info=db["Users"]
product_data=db["Products"]

# Calculate the frequency of each rating
rating_frequency = defaultdict(int)
for product in product_data.find():
    rating = product.get("product_rating", "No rating available")
    if isinstance(rating, int) and 0 <= rating <= 10:
        rating_frequency[str(rating)] += 1

# Update product collection with modified product_rating field
for product in product_data.find():
    rating = product.get("product_rating", "No rating available")
    if isinstance(rating, int) and 0 <= rating <= 10:
        rating = min(rating, 5)
        frequency = rating_frequency[str(rating)]
        product_data.update_one(
            {"_id": product["_id"]},
            {"$set": {"product_rating." + str(rating): frequency}},
        )

print("Product ratings updated successfully.")

# Restore original product_rating values
for product in product_data.find():
    original_rating = product.get("original_product_rating")
    if original_rating is not None:
        product_data.update_one(
            {"_id": product["_id"]},
            {"$set": {"product_rating": original_rating}},
        )

print("Product ratings restored to their original state.")

def recommend_top_visited(limit=10):
    recommended_products = product_data.find().sort('visits', -1).limit(limit)
    return list(recommended_products)

top_visited_recommendations = recommend_top_visited(limit=10)
print("Top Visited Recommendations:")
for product in top_visited_recommendations:
    print(product['product_name'])

def calculate_average_rating(rating_data):
    total_ratings = sum(rating_data.values())
    total_users = len(rating_data)
    return total_ratings / total_users if total_users > 0 else 0

def recommend_top_rated(limit=5):
    recommended_products = []
    for product in product_data.find():
        product_name = product["product_name"]
        rating_data = product.get("product_rating", {})  # Default to an empty dictionary

        if isinstance(rating_data, dict):
            # Convert keys from strings to integers
            rating_data = {int(key): value for key, value in rating_data.items()}

            average_rating = calculate_average_rating(rating_data)
            recommended_products.append({"product_name": product_name, "average_rating": average_rating})

    recommended_products.sort(key=lambda x: x["average_rating"], reverse=True)
    return recommended_products[:limit]

top_rated_recommendations = recommend_top_rated(limit=10)
print("Top Rated Recommendations:")
for product in top_rated_recommendations:
    print(product['product_name'], "Average Rating:", product['average_rating'])

product = product_data.find_one()

if product:
    product_rating_dict = product.get("product_rating", {})

    for key, value in product_rating_dict.items():
        key_type = type(key).__name__
        value_type = type(value).__name__
        print(f"Key: {key} (Type: {key_type}), Value: {value} (Type: {value_type})")
else:
    print("No product data found in the collection.")