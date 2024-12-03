import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "../site.css";

export function Template({ aoc }) {
  const { dayText, input, output, output2, partOne, partTwo } = aoc;
  const aocLink = "https://adventofcode.com/2024/day/" + dayText;
  const dayTitle = "Day " + dayText;
  // Refs to access code blocks for highlighting
  const partOneRef = useRef(null);
  const partTwoRef = useRef(null);

  useEffect(() => {
    // Highlight specific code blocks after render
    if (partOneRef.current) hljs.highlightElement(partOneRef.current);
    if (partTwoRef.current) hljs.highlightElement(partTwoRef.current);
  }, [partOne, partTwo]); // Re-run if code changes

  return (
    <div className="container dark-background">
      <h1 className="title">
        <a href={aocLink} rel="noreferrer" target="_blank">
          {dayTitle}
        </a>
      </h1>

      <div className="read-only-container">
        <span className="label">Input Text</span>
        <textarea className="read-only-textbox" value={input} readOnly />
      </div>
      <div className="row">
        <div className="code-container">
          <span>Part One</span>
          <pre>
            <code ref={partOneRef}>{partOne}</code>
          </pre>
        </div>
        <div className="code-container">
          <span>Part Two</span>
          <pre>
            <code ref={partTwoRef}>{partTwo}</code>
          </pre>
        </div>
      </div>
      <div className="box-container">
        <div className="box-item">
          <h3 className="box-title">Answer P1</h3>
          <div className="box">{output}</div>
        </div>
        <div className="box-item">
          <h3 className="box-title">Answer P2</h3>
          <div className="box">{output2}</div>
        </div>
      </div>
    </div>
  );
}

export default Template;
