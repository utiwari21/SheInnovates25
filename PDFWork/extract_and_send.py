from flask import Flask, jsonify
import PyPDF2

app = Flask(__name__)

# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() or ""
    except Exception as e:
        return f"Error extracting text from PDF: {e}"
    return text

# API Route to serve extracted text
@app.route('/get-extracted-text', methods=['GET'])
def get_extracted_text():
    pdf_path = r"C:\Users\tiwar\SheInnovates25\SheInnovates25\PDFWork\Utkarsh Resume .pdf"
    extracted_text = extract_text_from_pdf(pdf_path)
    
    if extracted_text:
        return jsonify({"extracted_text": extracted_text})
    else:
        return jsonify({"error": "Failed to extract text"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run Flask on port 5000
