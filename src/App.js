import React from "react";
// import {
//   BrowserRouter as Router, Routes,
//   Route
// } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Day1 from "./day1/aoc1.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Adam Murchison's Advent of Code 2024
        </header>
        <div className="container">
          <Day1 />
        </div>
      </div>
    );
  }
}

export default App;
