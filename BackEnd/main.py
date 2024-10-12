# TO DO:
    # get id tags or whatever the sasys the location of the inputs

import PyPDF2
from flask import Flask
from openai import OpenAI

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

#Getting perplexity input working
YOUR_API_KEY = "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"

# Initialize the client with your API key and the Perplexity API base URL
client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

# Open the PDF
def OpenPDF(properties_amount, contracts, perplexity_inputs):
    for property in range(properties_amount):
        with open(contracts[property], 'rb') as file:
            reader = PyPDF2.PdfReader(file)
                
            # Get number of pages
            num_pages = len(reader.pages)
                
            # Extract text from each page
            text = ''
            for page in range(num_pages):
                page_obj = reader.pages[page]
                text += page_obj.extract_text()

            perplexity_inputs.append(text)

    return(perplexity_inputs[0])

    


    


#Perplexity function
def get_perplexity_response(input_string):
    messages = [
        {
            "role": "system",
            "content": "You are Rent Wizard, an AI application to help users with renting. Please read the contract information and summarise everything of importance in the contract."
        },
        {
            "role": "user",
            "content": input_string
        }
    ]

    try:
        response = client.chat.completions.create(
            model="llama-3.1-sonar-small-128k-chat",
            messages=messages,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"An error occurred: {str(e)}"



#Add the user inputs to the messages
for property in range(properties_amount):

    output = get_perplexity_response(perplexity_inputs[property])
    print(output)


@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.json
 
    properties_amount = 1 #This is based on user input
    text = ''
    properties = []
    contracts = []
    perplexity_inputs = []
    contracts.append('sample.pdf') #Need to make the funciton for reading through the pdfs that the user input
    input_prompt = ''
    

    # Examing logic
    print(f"Receiveple processd data: Text = {text}, Properties = {properties}")

    # Calls functions
    print("Calling functions ...")
    PDF_text = OpenPDF(properties_amount, contracts, perplexity_inputs) # Don't need



    # Respond with a JSON object with results
    return jsonify({
        
        
    }), 200
