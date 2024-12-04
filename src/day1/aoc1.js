import inputText from "./day1.txt";
import "../site.css";
import { GetTextFromFile } from "../Helpers/fileReader";
import { GetTemplateData } from "../Helpers/templateData";

import React, { useEffect, useState } from "react";
import Template from "../Components/CodePageTemplate";

export function Day1() {
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
    "1",
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

  let firstOutputArr = [];
  let secondOutputArr = [];

  let splitInput = textInput.split("\n");

  for (let index = 0; index < splitInput.length; index++) {
    let element = splitInput[index];
    element = element.replace("\r", "");
    let nums = element.split(" ");
    let firstVal = nums[0];
    firstOutputArr.push(firstVal);
    let lastVal = nums[nums.length - 1];
    secondOutputArr.push(lastVal);
  }

  firstOutputArr.sort();
  secondOutputArr.sort();

  for (let index = 0; index < firstOutputArr.length; index++) {
    outputVal += Math.abs(secondOutputArr[index] - firstOutputArr[index]);
  }

  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
}

// =====PART TWO =====

function partTwo(textInput) {
  let outputVal2 = 0;
  if (textInput === "") {
    return new Promise((resolve, reject) => {
      resolve(outputVal2);
    });
  }

  let firstOutputArr = [];
  let secondOutputArr = [];

  let splitInput = textInput.split("\n");

  for (let index = 0; index < splitInput.length; index++) {
    let element = splitInput[index];
    element = element.replace("\r", "");
    let nums = element.split(" ");
    let firstVal = nums[0];
    firstOutputArr.push(firstVal);
    let lastVal = nums[nums.length - 1];
    secondOutputArr.push(lastVal);
  }

  for (let index = 0; index < firstOutputArr.length; index++) {
    let count = 0;
    let firstInput = firstOutputArr[index];
    let startIndex = secondOutputArr.indexOf(firstInput);
    let startIndexLen = firstInput.length;
    if (startIndex === -1 || startIndexLen === 0) {
      continue;
    } else {
      while (startIndex !== -1) {
        count += 1;
        startIndexLen = firstInput.length;
        startIndex = secondOutputArr.indexOf(
          firstOutputArr[index],
          startIndex + 1
        );
      }
      let outputNum = Number(firstInput);
      outputVal2 += outputNum * count;
    }
  }
  return new Promise((resolve, reject) => {
    resolve(outputVal2);
  });
}

export default Day1;
