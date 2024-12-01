import React from "react";
import Day1 from '../day1/aoc1.js';  // Example HomePage component
import HomePage from "./Home.js";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../site.css';

const Nav = () => {
    return (
        <Router>
                <nav className="navbar">
                    <ul>
                        <li>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li>
                            <Link to="/Day1" className="nav-link">Day 1</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Day1" element={<Day1 />} />
                </Routes>
        </Router>

    );
}

export default Nav;