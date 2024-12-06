import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import routes from "./Routes.js";
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
          <li name="home">
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
                {routes.map((route) => {
                  return (
                    <li name={route.name} onClick={closeDropdown}>
                      <Link to={route.path}>{route.name}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        {routes.map((route) => {
          const RouteComponent = route.component;
          return (
            <Route
              key={route.name}
              path={route.path}
              element={<RouteComponent />}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default Nav;
