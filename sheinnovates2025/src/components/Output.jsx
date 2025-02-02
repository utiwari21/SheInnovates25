import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./NavBar";
import axios from "axios";

function Output() {
  const navigate = useNavigate();
  const location = useLocation(); // Use location to access state passed from Input.jsx

  const expectedSalary = location.state ? location.state.expectedSalary : null; // Get expected salary from state
  const [processedResume, setProcessedResume] = useState(""); // State to hold extracted resume
  const [medianSalary, setMedianSalary] = useState(""); // State for median salary
  const [resumeID, setResumeID] = useState("");

  // Format the expected salary with commas
  const formattedSalary = expectedSalary
    ? new Intl.NumberFormat().format(expectedSalary)
    : null;

  // Generate a random resume ID
  const generateResumeID = () => {
    return Math.floor(Math.random() * 1000000000); // Generates a random ID like RES-123456789
  };

  useEffect(() => {
    // Set the random resume ID when the component mounts
    setResumeID(generateResumeID());

    // Fetch the extracted resume text from the backend
    const fetchResumeData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/get-extracted-text"
        );
        if (response.data.extracted_text) {
          setProcessedResume(response.data.extracted_text);
        } else {
          setProcessedResume("No resume data available");
        }
      } catch (error) {
        console.error("Error fetching extracted text:", error);
        setProcessedResume("Failed to fetch resume data");
      }
    };

    // Fetch median salary data
    const fetchMedianSalary = async () => {
      try {
        // Assuming a request to get median salary from your backend, replace with actual endpoint
        const response = await axios.get(
          "http://127.0.0.1:5000/get-median-salary"
        );
        setMedianSalary(
          response.data.medianSalary || "No median salary data available"
        );
      } catch (error) {
        console.error("Error fetching median salary:", error);
        setMedianSalary("Failed to fetch median salary data");
      }
    };

    fetchResumeData();
    fetchMedianSalary();
  }, []);

  return (
    <div className="bg-orange-500 text-blue-600">
      <Navbar />
      <div id="title_div" className="text-center">
        <h1 className="text-3xl font-bold">
          Tailored Resume and Expected Salary
        </h1>
        <hr className="w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 border-0 rounded-full shadow-lg" />
      </div>

      {/* Resume Summary */}
      <div id="newSummary" className="text-center mt-8">
        <h3 className="text-lg font-semibold mb-4">Resume Summary</h3>
        <div
          id="summary"
          className="border-2 border-blue-500 p-2 w-2/3 sm:w-1/3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 mx-auto"
          readOnly // Make salary non-editable
        >
          {processedResume ? processedResume : "No resume data available"}
        </div>
      </div>

      {/* Expected Salary Section */}
      <div id="salary_div" className="text-center mt-8">
        <h3 className="text-lg font-semibold mb-4">Expected Salary</h3>
        <div
          id="salary"
          className="border-2 border-blue-500 p-2 w-2/3 sm:w-1/3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 mx-auto"
          readOnly // Make salary non-editable
        >
          {formattedSalary ? `$${formattedSalary}` : "No salary data available"}
        </div>
      </div>

      {/* Resume ID Section */}
      <div id="id_div" className="text-center mt-8">
        <h3 className="text-lg font-semibold mb-4">Resume ID</h3>
        <div
          id="id"
          className="border-2 border-blue-500 p-2 w-2/3 sm:w-1/3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 mx-auto"
          readOnly // Make resume ID non-editable
        >
          {resumeID}
        </div>
      </div>

      <div id="back" className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="inline-block py-3 px-8 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Return to Main Page
        </button>
      </div>
    </div>
  );
}

export default Output;
