import inputText from "./day2.txt";
import "../site.css";
import { GetTextFromFile } from "../Helpers/fileReader";
import React, { useEffect, useState } from "react";
import Template from "../Components/CodePageTemplate";
import { GetTemplateData } from "../Helpers/templateData";

export function Day2() {
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
    "2",
    input,
    output,
    output2,
    partOne.toString() +
      "\n " +
      areRowsSafe.toString() +
      "\n " +
      isLevelSafe.toString(),
    partTwo.toString() +
      "\n " +
      areRowsSafe.toString() +
      "\n " +
      isLevelSafe.toString()
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

  for (let index = 0; index < textByLine.length; index++) {
    let line = textByLine[index];
    let rows = line.split(" ");

    let safe = areRowsSafe(rows)[0];
    if (safe) {
      outputVal++;
    }
  }

  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
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

  for (let index = 0; index < textByLine.length; index++) {
    let line = textByLine[index];
    let rows = line.split(" ");
    let result = areRowsSafe(rows);
    let safe = result[0];
    let badLevel = result[1];

    //Generate 3 arrays to test if removing a single element will make the row safe
    let rowsCurrIndex = Array.from(rows);
    let rowsNextIndex = Array.from(rows);
    let rowsFirstIndex = Array.from(rows);

    if (!safe) {
      rowsFirstIndex.splice(0, 1);
      let first = areRowsSafe(rowsFirstIndex)[0];

      rowsCurrIndex.splice(badLevel, 1);
      let curr = areRowsSafe(rowsCurrIndex)[0];

      rowsNextIndex.splice(badLevel - 1, 1);
      let next = areRowsSafe(rowsNextIndex)[0];

      safe = curr || next || first;
    }
    if (safe) {
      outputVal++;
    }
  }

  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
}

function areRowsSafe(rows) {
  let safe = true;
  let direction = "";
  let badLevel = null;
  for (let i = 1; i < rows.length && safe; i++) {
    let curr = Number(rows[i - 1]);
    let next = Number(rows[i]);
    let diff = curr - next; //desc
    if (i === 1) {
      if (diff > 0) {
        direction = "d"; //descending
      } else if (diff < 0) {
        direction = "a"; //ascending
      }
    }
    safe = isLevelSafe(direction, diff, safe);
    if (!safe) {
      badLevel = i;
    }
  }
  return [safe, badLevel];
}

function isLevelSafe(direction, diff, safe) {
  // diff of 0 is unsafe
  if (diff === 0) {
    safe = false;
    return safe;
  } else {
    //descending
    if (diff > 0 && direction !== "d") {
      safe = false;
      return safe;
    }
    //ascending
    else if (diff < 0 && direction !== "a") {
      safe = false;
      return safe;
    }
  }

  diff = Math.abs(diff);
  safe = diff !== 0 && diff <= 3;
  return safe;
}

export default Day2;
