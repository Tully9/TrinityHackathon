import PyPDF2
from flask import Flask
from openai import OpenAI

#The amount of houses depends on the user input
#The amount of contracts 
properties_amount = 1
text = ''
properties = []
contracts = []
perplexity_inputs = []
contracts.append('sample.pdf')
input_prompt = ''
#All of this is based on user input

# Open the PDF
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

print(perplexity_inputs[0])

    


#Getting perplexity input working
YOUR_API_KEY = "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"

# Initialize the client with your API key and the Perplexity API base URL
client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")


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
    

    

