import PyPDF2
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Getting Perplexity input working
YOUR_API_KEY = "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"
client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

# Open the PDF
def OpenPDF(properties_amount, contracts, perplexity_inputs):
    for property in range(properties_amount):
        with open(contracts[property], 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''.join(page.extract_text() for page in reader.pages)
            perplexity_inputs.append(text)
    return perplexity_inputs[0]

# AI Interaction logic remains unchanged
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

# Route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route for handling PDF upload and processing
@app.route('/api/submit', methods=['POST'])
def submit():
    if 'pdf' not in request.files:
        return jsonify({"error": "No PDF file uploaded"}), 400

    pdf_file = request.files['pdf']
    contracts = ['sample.pdf']
    pdf_file.save(contracts[0])  # Save the uploaded PDF for processing

    properties_amount = 1
    perplexity_inputs = []
    
    # Process the uploaded PDF
    extracted_text = OpenPDF(properties_amount, contracts, perplexity_inputs)
    
    # Get the AI's response using the extracted text
    summary = get_perplexity_response(extracted_text)
    
    return jsonify({"summary": summary}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
