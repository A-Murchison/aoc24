import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Day1 from "../day1/aoc1.js";
import Day2 from "../day2/aoc2.js";
import Day3 from "../day3/aoc3.js";
import HomePage from "./Home.js";
import "../site.css";

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to close dropdown when focus is lost
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <Router>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li
            onMouseEnter={toggleDropdown}
            onMouseLeave={closeDropdown}
            className="dropdown"
          >
            <Link to="#">Days</Link>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/Day1">Day 1</Link>
                </li>
                <li>
                  <Link to="/Day2">Day 2</Link>
                </li>
                <li>
                  <Link to="/Day3">Day 3</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Day1" element={<Day1 />} />
        <Route path="/Day2" element={<Day2 />} />
        <Route path="/Day3" element={<Day3 />} />
      </Routes>
    </Router>
  );
};

export default Nav;
