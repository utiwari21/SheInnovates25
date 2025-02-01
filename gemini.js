import axios from 'axios'; // Use 'import' for consistency with React

// Function to fetch extracted text from Flask API
const fetchExtractedText = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/get-extracted-text');
    return response.data.extracted_text;
  } catch (error) {
    console.error("Error fetching extracted text:", error);
    return null;
  }
};


// Function to call the Gemini API
const analyzeDream = async (state, role) => {
  const apiKey = 'AIzaSyDxQ2Dlk1ld9TUEbTX5-qxdMntqbj6qMP8';  // Your actual API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  // Fetch extracted text first
  const extractedText = await fetchExtractedText();
  if (!extractedText) {
    console.error("No extracted text available.");
    return;
  }

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

    // Extract the actual dream analysis content
    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (content) {
      console.log(content); // Print the content once
    } else {
      console.log("No content available in the response.");
    }

  } catch (error) {
    console.error(`API error: ${error.message}`);
  }
};

// Example usage
analyzeDream("Pennsylvania", "Software Engineering");

export default analyzeDream;
