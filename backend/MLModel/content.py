from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

# Fetch documents from the collection
client = MongoClient("mongodb+srv://manushreedubey:MD@grid05.eslf2n5.mongodb.net/")
db = client["Grid05"]
user_data=db["Products"]

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
    idx = product_ids.index(product_id)
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:num_recommendations+1]
    similar_indices = [i for i, _ in sim_scores]
    return [product_ids[i] for i in similar_indices]
            
# Example: Get recommendations for a specific product
target_product_id = "7f7036a6d550aaa89d34c77bd39a5e48"
recommended_product_ids = get_recommendations(target_product_id)

# Print recommended products for the target product
print(f"Target Product: {product_names.get(target_product_id, 'Unknown Product')}")
print("Recommended Products:")
for rec_id in recommended_product_ids:
    rec_name = product_names.get(rec_id, 'Unknown Product')
    print(f"{rec_id} - {rec_name}")