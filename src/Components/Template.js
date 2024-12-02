import "../site.css";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export function Template(params) {
  const nodes = document.querySelectorAll("pre code");
  nodes.forEach((node) => hljs.highlightBlock(node, { languages: ["javascript"] }));

  const dayText = params.aoc.dayText;
  const input = params.aoc.input;
  const output = params.aoc.output;
  const output2 = params.aoc.output2;
  const partOne = params.aoc.partOne;
  const partTwo = params.aoc.partTwo;
  return (
    <div className="container dark-background">
      <h1 className="title">{dayText}</h1>
      <div className="box-container">
        <div className="box-item">
          <span className="box-title">Input Text</span>
          <div className="box-input-text scrollDiv">{input}</div>
        </div>
      </div>
      <div className="row">
        <div className="code-container">
          <span>Part One</span>
          <pre>
            <code>{partOne}</code>
          </pre>
        </div>
        <div className="code-container">
          <span>Part Two</span>
          <pre>
            <code>{partTwo}</code>
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
