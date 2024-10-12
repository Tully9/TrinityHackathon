import PyPDF2
from flask import Flask


houses_amount = 1
houses = []
contracts = []
contracts.append('CompArchNotes.pdf')

# Open the PDF

for unit in range(houses_amount):

    with open(contracts[unit], 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        
        # Get number of pages
        num_pages = len(reader.pages)
        
        # Extract text from each page
        text = ''
        for page in range(num_pages):
            page_obj = reader.pages[page]
            text += page_obj.extract_text()
    
print(text)
