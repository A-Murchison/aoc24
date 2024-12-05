import inputText from "./day5.txt";
import "../site.css";
import { GetTextFromFile } from "../Helpers/fileReader";
import { GetTemplateData } from "../Helpers/templateData";

import React, { useEffect, useState } from "react";
import Template from "../Components/CodePageTemplate";

export function Day5() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [output2, setOutput2] = useState("");
  useEffect(() => {
    GetTextFromFile(inputText).then((text) => {
      setInput(text);
    });
  }, []);

  useEffect(() => {
    partOne(input).then((result) => {
      setOutput(result);
    });
  });
  useEffect(() => {
    partTwo(input).then((result) => {
      setOutput2(result);
    });
  });

  let aoc = GetTemplateData(
    "5",
    input,
    output,
    output2,
    partOne.toString(),
    partTwo.toString()
  );

  return <Template aoc={aoc}> </Template>;
}

// =====PART ONE =====

function partOne(textInput) {
  let outputVal = 0;
  if (textInput === "") {
    return new Promise((resolve, reject) => {
      resolve(outputVal);
    });
  }

  textInput = textInput.replaceAll("\r", "");
  let textByLine = textInput.split("\n");

  let keys = textByLine.slice(0, textByLine.indexOf(""));
  let keyDict = keys.map((key) => {
    var keyList = key.split("|");
    return { key: keyList[0], value: keyList[1] };
  })
  let values = textByLine.slice(textByLine.indexOf("") + 1, textByLine.length);

  let outputLines = [];
  outputVal = calculateValues(values, keyDict, outputLines, outputVal);

  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
}

function calculateValues(values, keyDict, outputLines, outputVal) {
  for (let i = 0; i < values.length; i++) {
    let currentLine = values[i].split(",");
    currentLine = currentLine.reverse();
    let breakLoops = false;
    for (let j = 0; j < currentLine.length - 1 && !breakLoops; j++) {
      let currentChar = currentLine[j];
      let validValuesAfterCurrent = keyDict.filter((key) => {
        return key.key === currentChar;
      });
      for (let k = j + 1; k < currentLine.length && !breakLoops; k++) {
        let nextChar = currentLine[k];
        if (validValuesAfterCurrent.some((key) => key.value === nextChar)) {
          breakLoops = true;
        }
        else {
          if (j === currentLine.length - 2) {
            outputLines.push(currentLine);
          }
        }
      }
    }
  }

  outputVal = calculateMiddleNumberTotal(outputLines, outputVal);
  return outputVal;
}

function calculateMiddleNumberTotal(outputLines, outputVal) {
  for (let i = 0; i < outputLines.length; i++) {
    let element = outputLines[i];
    let index = (element.length - 1) / 2;
    let val = Number(element[index]);
    outputVal += val;
  }
  return outputVal;
}

// =====PART TWO =====

function partTwo(textInput) {
  let outputVal = 0;
  if (textInput === "") {
    return new Promise((resolve, reject) => {
      resolve(outputVal);
    });
  }

  textInput = textInput.replaceAll("\r", "");
  let textByLine = textInput.split("\n");

  let keys = textByLine.slice(0, textByLine.indexOf(""));
  let keyDict = keys.map((key) => {
    var keyList = key.split("|");
    return { key: keyList[0], value: keyList[1] };
  })
  let values = textByLine.slice(textByLine.indexOf("") + 1, textByLine.length);

  let outputLines = [];
  for (let i = 0; i < values.length; i++) {
    let currentLine = values[i].split(",");
    currentLine = currentLine.reverse();
    let breakLoops = false;
    let pushVal = false;
    for (let j = 0; j < currentLine.length && !breakLoops; j++) {
      let currentChar = currentLine[j];
      let validValuesAfterCurrent = keyDict.filter((key) => {
        return key.key === currentChar;
      });
      for (let k = j + 1; k < currentLine.length && !breakLoops; k++) {
        let nextChar = currentLine[k];
        if (validValuesAfterCurrent.some((key) => key.value === nextChar)) {
          // switch order of nextChar and currentChar 
          currentLine = swapElements(currentLine, j, k);
          pushVal = true;
        }

        if (j === currentLine.length - 2) {
          if (pushVal) {
            outputLines.push(currentLine);
          }
          breakLoops = true;
        }
      }
    }
  }
  outputVal = calculateMiddleNumberTotal(outputLines, outputVal);

  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
}

const swapElements = (arr, pos1, pos2) => {
  const temp = arr[pos1];
  arr[pos1] = arr[pos2];
  arr[pos2] = temp;
  return arr;
};


export default Day5;
