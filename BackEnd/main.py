import PyPDF2
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Getting Perplexity input working
YOUR_API_KEY = "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"
client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

# Open the PDFs
def OpenPDF(properties_amount, contracts, perplexity_inputs):
    for property in range(properties_amount):
        with open(contracts[property], 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''.join(page.extract_text() for page in reader.pages)
            perplexity_inputs.append(text)
    return perplexity_inputs

# AI Interaction logic remains unchanged
def get_perplexity_response(input_string):
    messages = [
        {
            "role": "system",
            "content": "You are Rent Wizard, an AI application to help users with renting. Please read the contract information and summarize everything of importance in the contract."
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

# Route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')


# Route for handling multiple PDF uploads and processing
@app.route('/api/submit', methods=['POST'])
def submit():
    contracts = []
    perplexity_inputs = []

    # Save each uploaded PDF and add its path to the contracts list
    for key in request.files:
        pdf_file = request.files[key]
        pdf_path = f"uploads/{pdf_file.filename}"
        pdf_file.save(pdf_path)
        contracts.append(pdf_path)

    properties_amount = len(contracts)
    
    # Process the uploaded PDFs and extract text
    extracted_texts = OpenPDF(properties_amount, contracts, perplexity_inputs)
    
    # Concatenate the extracted text from all PDFs and get a summary
    combined_text = "\n\n".join(extracted_texts)
    summary = get_perplexity_response(combined_text)
    
    return jsonify({"summary": summary}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
