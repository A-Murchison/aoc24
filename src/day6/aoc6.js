import inputText from "./day6.txt";
import "../site.css";
import { GetTextFromFile } from "../Helpers/fileReader";
import { GetTemplateData } from "../Helpers/templateData";

import React, { useEffect, useState } from "react";
import Template from "../Components/CodePageTemplate";

export function Day6() {
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
    "6",
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

  //vertical, horizontal
  let up = [-1, 0];
  let right = [0, 1];
  let down = [1, 0];
  let left = [0, -1];
  let arrows = [up, right, down, left];
  textInput = textInput.replaceAll("\r", "");
  let textByLine = textInput.split("\n");

  //get index of "^" in textByLine, vertical, then horizontal
  let currCoordinates = [];
  for (let i = 0; i < textByLine.length; i++) {
    const line = textByLine[i];
    let upArrowIndex = line.indexOf("^");
    if (upArrowIndex > -1) {
      currCoordinates = [i, upArrowIndex];
    }
  }

  let coordinatesVisited = [
    currCoordinates[0].toString() + "," + currCoordinates[1].toString(),
  ];

  let currentArrow = 0;
  let exitAll = false;
  for (
    let v = currCoordinates[0] + arrows[currentArrow][0];
    v < textByLine[currCoordinates[0]].length && v > -1 && !exitAll;
    v += arrows[currentArrow][0]
  ) {
    let exit = false;

    let currentLine = textByLine[v];
    for (
      let h = currCoordinates[1] + arrows[currentArrow][1];
      h < currentLine.length && h > -1 && !exit;
      h += arrows[currentArrow][1]
    ) {
      if (arrows[currentArrow][1] === 0) {
        exit = true;
      }
      if (currentLine[h] === "#") {
        h -= arrows[currentArrow][1];
        v -= arrows[currentArrow][0];
        currCoordinates = [v, h];
        exit = true;
        currentArrow = nextArrowPosition(arrows, currentArrow);
      } else {
        if (
          h + arrows[currentArrow][1] >= currentLine.length ||
          h + arrows[currentArrow][1] < 0
        ) {
          exitAll = true;
        }
        let updateStr = textByLine[v];
        updateStr = updateStr.split("");
        updateStr[h] = "X";
        updateStr = updateStr.join("");
        textByLine.splice(v, 1);
        textByLine.splice(v, 0, updateStr);

        coordinatesVisited.push(v.toString() + "," + h.toString());
      }
    }
  }

  //function to get only unique values
  const uniqueArray = [...new Set(coordinatesVisited)];
  let outputStr = textByLine.join("\n");
  outputVal = uniqueArray.length;
  return new Promise((resolve, reject) => {
    resolve("total squares:" + outputVal);
  });
}

function nextArrowPosition(arrows, currentArrow) {
  if (currentArrow < arrows.length - 1) {
    currentArrow++;
    return currentArrow;
  } else {
    return 0;
  }
}

// =====PART TWO =====

function partTwo(textInput) {
  let outputVal2 = 0;
  if (textInput === "") {
    return new Promise((resolve, reject) => {
      resolve(outputVal2);
    });
  }

  textInput = textInput.replaceAll("\r", "");
  let textByLine = textInput.split("\n");

  return new Promise((resolve, reject) => {
    resolve(outputVal2);
  });
}

export default Day6;
