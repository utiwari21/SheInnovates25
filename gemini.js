import axios from 'axios'; // Use 'import' for consistency with React

// Function to call the Gemini API
const analyzeDream = async (state, role) => {
  const apiKey = 'AIzaSyDxQ2Dlk1ld9TUEbTX5-qxdMntqbj6qMP8';  // Your actual API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: 'Tell me the median salary of '+role+' for the state of '+state+ '. Feel free to search the web and tell me the answer', // Use the prompt text passed to this function
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
