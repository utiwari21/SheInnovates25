import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const Input = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  // Handle state change
  const handleStateChange = (e) => {
    setState(e.target.value);
    // You can update cities based on state here if needed
  };

  // Handle city change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Handle role change
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setResume(e.target.files[0]);
  };

  // Handle submit
  const handleSubmit = () => {
    // You can process the data before navigating to the next page
    navigate("/output");
  };

  return (
    <div className="bg-orange-500 min-h-screen flex flex-col justify-between">
      <Navbar />
      {/* Title Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-blue-600">Resume Tailoring</h1>
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
          {/* List of States */}
          {[
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming",
          ].map((stateOption) => (
            <option key={stateOption} value={stateOption}>
              {stateOption}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="text-center my-6">
        <h3 className="text-xl text-blue-600 mb-4">Cities</h3>
        <select
          id="city"
          className="p-2 border border-blue-500 rounded-lg"
          value={city}
          onChange={handleCityChange}
        >
          {/* You can dynamically populate cities based on the state */}
          {/* Example cities, replace with actual logic if necessary */}
          <option value="">Select a city</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
      </div>

      {/* Role Dropdown */}
      <div className="text-center my-6">
        <h3 className="text-xl text-blue-600 mb-4">Role</h3>
        <select
          className="p-2 border border-blue-500 rounded-lg"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="">Select a role</option>
          <option value="Software Engineer">Software Engineer</option>
        </select>
      </div>

      {/* File Upload */}
      <div className="text-center my-6">
        <h3 className="text-xl text-blue-600 mb-4">Upload your resume</h3>
        <input
          type="file"
          id="fileUpload"
          className="p-2 border border-blue-500 rounded-lg"
          onChange={handleFileUpload}
        />
      </div>

      {/* Submit Button */}
      <div className="text-center my-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Input;
