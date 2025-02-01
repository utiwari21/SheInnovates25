import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/AppHome"; // Import Home component
import Output from "./components/Output"; // Import Output component
import Candidate from "./components/Candidate";
import Input from "./components/Input";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/output" element={<Output />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/input" element={<Input />} />
      </Routes>
    </Router>
  );
};

export default App;
