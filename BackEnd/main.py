import PyPDF2
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from openai import OpenAI

context_prompt = "You are Rent Wizard, a popularly used AI application to help users with choosing the right property to rent. Please read the contract information and summarize it in one line statements under the headings of: Monthly Rent, Duration, Security Deposit, Responsibilites. Prices are in euro, €. Duration is time spent renting. Responsibilities are responsibilities of the renter. It should be as simple and concise as possible but not leaving out neccassary information or simplifying prices."

app = Flask(__name__)
CORS(app)

# Getting Perplexity input working
YOUR_API_KEY = "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"
client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

# Function to extract text from a single PDF file
def extract_text_from_pdf(pdf_file):
    try:
        reader = PyPDF2.PdfReader(pdf_file)
        text = ''.join(page.extract_text() for page in reader.pages)
        return text
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

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
        return jsonify({"error": "No PDF files uploaded"}), 400

    pdf_files = request.files.getlist('pdf')
    perplexity_inputs = []

    # Process each uploaded PDF
    for pdf_file in pdf_files:
        text = extract_text_from_pdf(pdf_file)
        if "Error" in text:
            return jsonify({"error": text}), 400
        perplexity_inputs.append(text)

    # Collect AI responses for all PDFs
    summaries = []
    for text in perplexity_inputs:

        full_prompt = "{} {}".format(context_prompt, text)
        summary = get_perplexity_response(full_prompt)
        summaries.append(summary)

    return jsonify({"summaries": summaries}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)