import PyPDF2

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return None
    return text

# Your PDF path
pdf_path = r"C:\Users\tiwar\SheInnovates25\SheInnovates25\PDFWork\Utkarsh Resume .pdf"

# Extract text from the PDF
extracted_text = extract_text_from_pdf(pdf_path)

if extracted_text:
    print("Extracted Text:")
    print(extracted_text)
else:
    print("Failed to extract text.")