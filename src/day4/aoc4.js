import inputText from "./day4.txt";
import "../site.css";
import { GetTextFromFile } from "../Helpers/fileReader";
import React, { useEffect, useState } from "react";
import Template from "../Components/Template";

export function Day4() {
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

  let aoc = {};
  aoc.dayText = "4";
  aoc.input = input;
  aoc.output = output;
  aoc.output2 = output2;
  aoc.partOne = partOne.toString();
  aoc.partTwo = partTwo.toString();

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
  let textArray = textInput.split("\n");

  for (let i = 0; i < textArray.length; i++) {
    let currLine = textArray[i];
    for (let j = 0; j < currLine.length; j++) {
      outputVal += GetXmas(textArray, i, j, 0, -1);
      outputVal += GetXmas(textArray, i, j, 0, 1);

      outputVal += GetXmas(textArray, i, j, -1, 0);
      outputVal += GetXmas(textArray, i, j, 1, 0);

      outputVal += GetXmas(textArray, i, j, 1, -1);
      outputVal += GetXmas(textArray, i, j, 1, 1);
      outputVal += GetXmas(textArray, i, j, -1, -1);
      outputVal += GetXmas(textArray, i, j, -1, 1);
    }
  }

  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
}

function GetXmas(textArray, i, j, v, h) {
  let result = 0;
  if (textArray[i][j] === "X") {
    if (
      ((v >= 0 && i + 3 < textArray.length) || (v <= 0 && i - 3 >= 0)) &&
      ((h >= 0 && j + 3 < textArray[i].length) || (h <= 0 && j - 3 >= 0))
    ) {
      if (textArray[i + v][j + h] === "M") {
        if (textArray[i + v + v][j + h + h] === "A") {
          if (textArray[i + v + v + v][j + h + h + h] === "S") {
            result++;
          }
        }
      }
    }
  }
  return result;
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
  let textArray = textInput.split("\n");

  for (let i = 0; i < textArray.length; i++) {
    let currLine = textArray[i];
    for (let j = 0; j < currLine.length; j++) {
      outputVal += GetMas(textArray, i, j, 1, -1);
      outputVal += GetMas(textArray, i, j, 1, 1);
      outputVal += GetMas(textArray, i, j, -1, -1);
      outputVal += GetMas(textArray, i, j, -1, 1);
    }
  }

  outputVal = outputVal / 2;
  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
}

function GetMas(textArray, i, j, v, h) {
  let result = 0;
  if (textArray[i][j] === "M") {
    if (
      ((v >= 0 && i + 2 < textArray.length) || (v <= 0 && i - 2 >= 0)) &&
      ((h >= 0 && j + 2 < textArray[i].length) || (h <= 0 && j - 2 >= 0))
    ) {
      if (textArray[i + v][j + h] === "A") {
        if (textArray[i + v + v][j + h + h] === "S") {
          let isCross = CheckOtherDiagnol(textArray, i, j, h, v);
          if (isCross) {
            result++;
          }
        }
      }
    }
  }
  return result;
}

function CheckOtherDiagnol(textArray, i, j, h, v) {
  let first = textArray[i][j + h + h];
  let second = textArray[i + v + v][j];
  return (first === "M" && second === "S") || (first === "S" && second === "M");
}

export default Day4;
