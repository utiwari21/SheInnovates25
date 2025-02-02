import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./NavBar";

function Output() {
  const navigate = useNavigate();
  const location = useLocation(); // Use location to access state passed from Input.jsx

  const expectedSalary = location.state ? location.state.expectedSalary : null; // Get expected salary from state

  // Format the expected salary with commas
  const formattedSalary = expectedSalary
    ? new Intl.NumberFormat().format(expectedSalary)
    : null;

  // Generate a random resume ID
  const generateResumeID = () => {
    return Math.floor(Math.random() * 1000000000); // Generates a random ID like RES-123456789
  };

  const [resumeID, setResumeID] = useState("");

  useEffect(() => {
    setResumeID(generateResumeID()); // Set the random resume ID when the component mounts
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

      <div id="file" className="text-center justify-center items-center flex">
        <img
          src="/resume.png"
          alt="Resume"
          className="max-w-full h-auto center"
        />
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
