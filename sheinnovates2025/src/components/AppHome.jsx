import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar"; // Assuming you have a Navbar component

function AppHome() {
  return (
    <div className="bg-orange-500 min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex flex-col justify-center items-center text-center text-white py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to SkillMatch</h1>
        <p className="text-xl mb-6">Hire the best candidate for you!</p>
        <Link
          to="/candidate"
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-xl hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
      </div>
      <footer className="bg-blue-500 text-white text-center py-4 mt-auto">
        <p className="text-lg">&copy; 2025 SkillMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AppHome;
