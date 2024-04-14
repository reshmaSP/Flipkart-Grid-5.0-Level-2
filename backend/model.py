import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.feature_extraction.text import CountVectorizer
from pymongo import MongoClient


client = MongoClient("mongodb+srv://manushreedubey:MD@grid05.eslf2n5.mongodb.net/")
db = client["Grid05"]
user_data=db["Products"]

# Fetch documents from the collection
documents = user_data.find({})

# Collect product data
products = []
product_ids = []
product_names = {}  # Store product names

for doc in documents:
    if 'category' in doc and 'subcategory_1' in doc and 'subcategory_2' in doc:
        product_id = doc['uniq_id']
        product_name = doc['product_name']
        product_ids.append(product_id)
        product_names[product_id] = product_name
        products.append(f"{doc['category']} {doc['subcategory_1']} {doc['subcategory_2']}")

# Create a CountVectorizer and calculate cosine similarity


vectorizer = CountVectorizer().fit_transform(products)
cosine_sim = cosine_similarity(vectorizer)

# Recommendation function
def get_recommendations(product_id, num_recommendations=10):
    increase_visits(product_id)
    idx = product_ids.index(product_id)
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:num_recommendations+1]
    similar_indices = [i for i, _ in sim_scores]
    return [product_ids[i] for i in similar_indices]

def increase_visits(product_id):
    # Find the product by its product_id
    product = user_data.find_one({'uniq_id': product_id})

    if product:
        # Increment the visits field by 1
        new_visits = product.get('visits', 0) + 1

        # Update the visits field in the product document
        user_data.update_one(
            {'uniq_id': product_id},
            {'$set': {'visits': new_visits}}
        )