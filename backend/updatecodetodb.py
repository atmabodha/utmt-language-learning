from pymongo import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus

# Encode the username and password to make them safe for use in the MongoDB URI
username = quote_plus("su-22012")
password = quote_plus("Narendra123@#")

# Construct the URI to connect to the MongoDB cluster
uri = f"mongodb+srv://{username}:{password}@gramai.jc23s.mongodb.net/?retryWrites=true&w=majority&appName=GramAi"

# Create a new MongoClient instance and connect to the server with the specified URI
client = MongoClient(uri, server_api=ServerApi('1'))

# Access the MongoDB database and collection
db = client['gramai_database']  # Replace 'gramai_database' with your actual database name
collection = db['pronunciation_texts']  # Replace 'pronunciation_texts' with your actual collection name

# Define the data to be inserted, with entries for 'easytext', 'mediumtext', and 'hardtext'
data_to_insert = [
    {"easytext": "I like to play football in the park.", "mediumtext": "She enjoys reading books about history and science.", "hardtext": "The economic development of developing nations requires careful consideration of various social, political, and environmental factors."},
    {"easytext": "The sun is shining brightly today.", "mediumtext": "The weather is quite unpredictable this time of year.", "hardtext": "The rapid advancement of artificial intelligence presents both challenges and opportunities for the workforce in the coming decades."},
    {"easytext": "I have a pet dog named Max.", "mediumtext": "He went on a vacation to Paris last summer.", "hardtext": "The sustainability of urban development is increasingly being questioned due to its impact on biodiversity and local ecosystems."},
    {"easytext": "My favorite color is blue.", "mediumtext": "He worked hard to finish the project before the deadline.", "hardtext": "International trade agreements can have significant impacts on domestic industries, affecting both economic growth and employment rates."},
    {"easytext": "I am going to the store.", "mediumtext": "She is learning to play the piano and enjoys it very much.", "hardtext": "The political landscape of the country has been rapidly shifting, leading to changes in both domestic and international policies."},
    {"easytext": "The cat is sitting on the chair.", "mediumtext": "They visited a museum to see the new art exhibition.", "hardtext": "Advancements in renewable energy technologies are crucial for reducing the carbon footprint of industrial sectors worldwide."},
    {"easytext": "I love eating ice cream.", "mediumtext": "She recently completed her Master's degree in environmental studies.", "hardtext": "The global economy has become increasingly interconnected, leading to both positive and negative effects on local industries and employment."},
    {"easytext": "My brother is younger than me.", "mediumtext": "He is planning to travel to Japan next year.", "hardtext": "As climate change continues to accelerate, it is becoming increasingly important for governments to implement adaptive strategies for resilient infrastructure."},
    {"easytext": "I enjoy watching movies on weekends.", "mediumtext": "They are learning to speak French and enjoy the challenge.", "hardtext": "The ethical implications of genetic engineering remain a controversial topic, especially regarding its potential impact on future generations."},
    {"easytext": "The dog is barking loudly.", "mediumtext": "She likes to cook Italian food for dinner parties.", "hardtext": "The integration of advanced technologies into the healthcare system has the potential to revolutionize patient care, but it also raises concerns about privacy and accessibility."},
    {"easytext": "I went to the park yesterday.", "mediumtext": "He enjoys cycling around the city during the weekends.", "hardtext": "The ongoing debate on the role of artificial intelligence in creative industries has sparked discussions about the future of human creativity and employment."},
    {"easytext": "I have a brother and two sisters.", "mediumtext": "They enjoy hiking in the mountains during the summer.", "hardtext": "The rise of remote work has transformed traditional business models, leading to changes in workplace dynamics and employee expectations."},
    {"easytext": "I like to read books.", "mediumtext": "He completed the assignment before the due date.", "hardtext": "The rapid development of new technologies in the automotive industry has the potential to change transportation systems globally."},
    {"easytext": "The sky is blue and clear.", "mediumtext": "She enjoys playing tennis every weekend.", "hardtext": "Understanding the complex interactions between genetic predispositions and environmental factors is key to advancing medical research and treatment."},
    {"easytext": "I enjoy playing video games.", "mediumtext": "They went to the beach for a summer holiday.", "hardtext": "The challenges of balancing economic growth with environmental sustainability are becoming more apparent as urbanization continues to expand globally."},
    {"easytext": "The weather is perfect today.", "mediumtext": "She likes to go for a run every morning to stay fit.", "hardtext": "The increasing reliance on automation in manufacturing industries has led to significant changes in labor markets and job opportunities."},
    {"easytext": "I am going to meet my friends.", "mediumtext": "He has started a new job at a tech company.", "hardtext": "The future of education may involve the integration of virtual reality and artificial intelligence to create more personalized and interactive learning experiences."},
    {"easytext": "She is reading a book right now.", "mediumtext": "They are planning to attend the concert next month.", "hardtext": "With the rise of global supply chains, businesses are facing both opportunities and risks related to geopolitical tensions and trade restrictions."},
    {"easytext": "I like to eat pizza.", "mediumtext": "He likes watching soccer on TV.", "hardtext": "The environmental impact of large-scale agriculture is a growing concern, as it contributes significantly to greenhouse gas emissions and habitat destruction."},
    {"easytext": "My dog is very playful.", "mediumtext": "She traveled to Europe for the first time last year.", "hardtext": "The role of social media in shaping public opinion has become increasingly important in recent years, particularly in relation to political campaigns and activism."},
    {"easytext": "I went for a walk in the evening.", "mediumtext": "They enjoy trying new foods from different cultures.", "hardtext": "The development of smart cities is a complex process that involves the integration of technology, sustainability practices, and urban planning to improve quality of life."}
]

# Insert the data into the MongoDB collection
try:
    collection.insert_many(data_to_insert)  # Insert the data into the collection
    print("Data inserted successfully!")
except Exception as e:
    # Handle exceptions during data insertion
    print(f"An error occurred: {e}")
