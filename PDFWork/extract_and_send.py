import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains by default

# Path to store uploaded PDFs
UPLOAD_FOLDER = "PDFWork"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure the PDFWork directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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


# Global variable to store extracted resume text
extracted_text = None


# API Route to handle PDF upload
@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():
    global extracted_text  # Store extracted text globally
    if "pdf" not in request.files:
        return jsonify({"error": "No file part"}), 400

    pdf_file = request.files["pdf"]
    if pdf_file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save the file to the PDFWork folder
    pdf_path = os.path.join(app.config["UPLOAD_FOLDER"], pdf_file.filename)
    pdf_file.save(pdf_path)

    # Extract text from the uploaded PDF
    extracted_text = extract_text_from_pdf(pdf_path)
    if extracted_text:
        return (
            jsonify(
                {
                    "message": "File uploaded successfully",
                    "extracted_text": extracted_text,
                }
            ),
            200,
        )
    else:
        return jsonify({"error": "Failed to extract text"}), 500


# API Route to get the extracted resume text
@app.route("/get-extracted-text", methods=["GET"])
def get_extracted_text():
    if extracted_text:
        return jsonify({"extracted_text": extracted_text}), 200
    else:
        return jsonify({"error": "No extracted text available"}), 404


if __name__ == "__main__":
    app.run(debug=True, port=5000)
