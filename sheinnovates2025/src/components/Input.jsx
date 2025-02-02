import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { getMedianSalary } from "../averageSalary"; // Import the function
import axios from "axios"; // Import axios for API requests
import analyzeDream from "./gemini"; // Import Gemini API call

const Input = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState([]); // Store CSV data
  const [filteredCities, setFilteredCities] = useState([]); // Store filtered cities
  const [expectedSalary, setExpectedSalary] = useState(null); // Store the expected salary
  const [resume, setResume] = useState(null); // Store the resume file
  const [message, setMessage] = useState(""); // For status messages
  const navigate = useNavigate();

  // Fetch and parse the CSV file
  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("/state_financials.csv"); // Fetch from public folder
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true, // Convert rows into objects
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data); // Store parsed data
        },
      });
    };

    fetchCSV();
  }, []);

  // Handle state change and update cities
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setCity(""); // Reset city selection

    // Filter cities based on selected state
    const citiesForState = data
      .filter((item) => item.State === selectedState)
      .map((item) => item.City);

    setFilteredCities(citiesForState);
  };

  // Handle city change and fetch expected salary
  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    if (state && selectedCity) {
      const salary = await getMedianSalary(state, selectedCity);
      setExpectedSalary(salary); // Set the expected salary
    }
  };

  // Handle resume file change
  const handleResumeChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setResume(file); // Set the resume file
    }
  };

  // Handle form submission to upload the resume
  const handleSubmit = async () => {
    if (!resume) {
      setMessage("Please upload a resume.");
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("pdf", resume); // Append resume to form data

    try {
      // Send the resume to the Flask back-end for processing
      const response = await axios.post(
        "http://127.0.0.1:5000/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Resume uploaded successfully!");

        // Fetch the processed resume after upload
        const processedResponse = await axios.get(
          "http://127.0.0.1:5000/get-extracted-text"
        );

        if (processedResponse.data.extracted_text) {
          // Call Gemini API to process the resume and eliminate demographic data
          const geminiProcessedResume = await analyzeDream(resume);

          // Pass processed resume to Output component
          navigate("/output", {
            state: {
              expectedSalary,
              resume: geminiProcessedResume, // Pass the processed resume from Gemini API
            },
          });
        }
      } else {
        setMessage("Failed to upload the resume.");
      }
    } catch (error) {
      console.error("Error uploading the resume:", error);
      setMessage("Error uploading the resume.");
    }
  };

  return (
    <div className="bg-orange-500 min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-white">Resume Tailoring</h1>
        <hr className="my-6 w-full border-t-2 border-blue-600" />
      </div>

      {/* State Dropdown */}
      <div className="text-center">
        <h3 className="text-xl text-blue-600 mb-4">Enter State</h3>
        <select
          name="states"
          id="states"
          className="p-2 border border-blue-500 rounded-lg"
          value={state}
          onChange={handleStateChange}
        >
          <option value="">Select a state</option>
          {Array.from(new Set(data.map((item) => item.State))).map(
            (stateOption) => (
              <option key={stateOption} value={stateOption}>
                {stateOption}
              </option>
            )
          )}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="text-center my-6">
        <h3 className="text-xl text-blue-600 mb-4">Cities</h3>
        <select
          id="city"
          className="p-2 border border-blue-500 rounded-lg"
          value={city}
          onChange={handleCityChange} // Handle city change
          disabled={!state} // Disable if no state selected
        >
          <option value="">Select a city</option>
          {filteredCities.map((cityOption) => (
            <option key={cityOption} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>
      </div>

      {/* Resume File Upload */}
      <div className="text-center my-6">
        <h3 className="text-xl text-blue-600 mb-4">Upload Your Resume</h3>
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleResumeChange} // Handle file change
          className="p-2 border border-blue-500 rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center my-6">
        <button
          type="button"
          onClick={handleSubmit} // Trigger file upload
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </div>

      {/* Status Message */}
      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};

export default Input;
