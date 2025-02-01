import React, { useState } from "react";
import Navbar from "./NavBar";

function CandidatePage() {
  const [candidateId, setCandidateId] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Candidate ID:", candidateId);
    console.log("Contact Info:", contactInfo);
  };

  return (
    <div className="bg-orange-500 min-h-screen">
      <Navbar />
      {/* Title Section */}
      <div id="title_div" className="text-center py-8">
        <h1 className="text-3xl font-bold text-white">Find your Candidate</h1>
        <hr className="w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 border-0 rounded-full shadow-lg" />
      </div>

      {/* Candidate ID Section */}
      <div id="id_div" className="text-center mt-8">
        <h3 className="text-lg font-semibold text-white">
          Enter Candidate's ID
        </h3>
        <textarea
          id="id"
          className="border-2 border-blue-500 p-2 w-2/3 sm:w-1/3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 mx-auto"
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div id="submit" className="text-center mt-8">
        <button
          type="submit"
          className="submit-button py-3 px-8 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Contact Info Section */}
      <div id="Contact_div" className="text-center mt-8">
        <h3 className="text-lg font-semibold text-white">
          Candidate's Contact Info
        </h3>
        <textarea
          id="contact"
          className="border-2 border-blue-500 p-2 w-2/3 sm:w-1/3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 mx-auto"
          wrap="hard"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export default CandidatePage;
