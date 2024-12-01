import "../site.css";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export function Template(params) {
  const nodes = document.querySelectorAll("pre code");
  nodes.forEach((node) => hljs.highlightBlock(node));

  const dayText = params.aoc.dayText;
  const input = params.aoc.input;
  const output = params.aoc.output;
  const output2 = params.aoc.output2;
  const partOne = params.aoc.partOne;
  const partTwo = params.aoc.partTwo;
  return (
    <div className="container">
      <h1 className="title">{dayText}</h1>
      <div className="box-container">
        <div className="box-item">
          <span className="box-title">Input Text</span>
          <div className="box-input-text scrollDiv">{input}</div>
        </div>       
      </div>
      <div className="row">

          <div class="code-container">
            <span>Part One</span>
            <pre>
              <code>{partOne}</code>
            </pre>
          </div>
          <div class="code-container">
            <span>Part Two</span>
            <pre>
              <code>{partTwo}</code>
            </pre>
        </div>
        </div>

      <div className="box-container">
      <div className="box-item">
          <span className="box-title">Answer P1</span>
          <div className="box">{output}</div>
        </div>
        <div className="box-item">
          <span className="box-title">Answer P2</span>
          <div className="box">{output2}</div>
        </div>    
      </div>
    </div>
  );
}

export default Template;