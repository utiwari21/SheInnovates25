import axios from 'axios';

// Function to upload the resume PDF to the Flask backend
const uploadPDF = async (pdfFile) => {
  const formData = new FormData();
  formData.append('pdf', pdfFile); // Ensure the key matches your backend code

  try {
    const response = await axios.post('http://127.0.0.1:5000/upload-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.extracted_text;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    return null;
  }
};

// Function to call the Gemini API
const analyzeDream = async (pdfFile) => {
  const extractedText = await uploadPDF(pdfFile); // Upload PDF and get extracted text
  if (!extractedText) {
    console.error("No extracted text available.");
    return null;
  }

  const apiKey = process.env.GEMINI_API_KEY; // Use an environment variable for the API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  // Prepare the API request with extracted text
  const data = {
    contents: [
      {
        parts: [
          {
            text: `Resume Content:\n${extractedText}\n\nNow, eliminate any sort of demographic information, from the resume content, that could categorize the candidate. For example, name, race, sex, etc.`,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract the processed content from the response
    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (content) {
      return content; // Return the processed resume content after demographic info removal
    } else {
      console.log("No content available in the response.");
      return null;
    }
  } catch (error) {
    console.error(`API error: ${error.message}`);
    return null;
  }
};

export default analyzeDream;
