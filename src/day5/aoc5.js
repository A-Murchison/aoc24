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

  textInput = textInput.replaceAll("\r", "");
  let textByLine = textInput.split("\n");

  return new Promise((resolve, reject) => {
    resolve(outputVal2);
  });
}

export default Day5;
