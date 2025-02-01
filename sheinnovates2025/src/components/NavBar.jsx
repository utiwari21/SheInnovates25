import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            SkillMatch
          </Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/candidate"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Candidate
          </Link>
          <Link
            to="/input"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Input
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
