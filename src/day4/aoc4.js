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
  
  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
}



export default Day4;
