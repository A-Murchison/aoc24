import inputText from "./day3.txt";
import "../site.css";
import { GetTextFromFile } from "../Helpers/fileReader";
import React, { useEffect, useState } from "react";
import Template from "../Components/CodePageTemplate";
import { GetTemplateData } from "../Helpers/templateData";

export function Day3() {
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
    "3",
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
  //Gets all numbers and commas, we use this to strip mul() and it should output something like 5,9.
  const regex = /[^0-9,]/g;

  while (textInput.indexOf("mul(") > -1) {
    let multiplyStart = textInput.indexOf("mul(");
    let nextMultiplyStart = textInput.indexOf("mul(", multiplyStart + 1);
    let multiplyEnd = textInput.indexOf(")", multiplyStart);

    //if the next mul( has started before the first one ended then we need start from the next mul( and skip curr one
    if (nextMultiplyStart > multiplyEnd || nextMultiplyStart === -1) {
      let textVal = textInput.slice(multiplyStart, multiplyEnd + 1);
      let strippedBack = textVal.replace(regex, "");

      //if the text length minus 'mul()' is more or less than 5 it has an invalid char such as mul(4!, 5)
      if (strippedBack.length === textVal.length - 5) {
        let numVal = strippedBack.split(",");

        let numOne = Number(numVal[0]);
        let numTwo = Number(numVal[1]);

        //sometimes it'll get mul(4, ), this is invalid because numberTwo will be NaN
        if (!Number.isNaN(numOne) && !Number.isNaN(numTwo)) {
          outputVal += numOne * numTwo;
        }
      }

      // strip all chars before the end bracket
      textInput = textInput.substring(multiplyEnd + 1);
    } else {
      textInput = textInput.substring(nextMultiplyStart - 4);
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
  //Gets all numbers and commas, we use this to strip mul() and it should output something like 5,9.
  const regex = /[^0-9,]/g;
  //resumes parsing
  const doText = "do()";
  //pauses parsing
  const dontText = "don't()";
  const mulText = "mul(";

  let doo = true; //doo doo
  let stopAtIndex = 0;
  while (textInput.indexOf(mulText) > -1) {
    if (doo) {
      stopAtIndex = textInput.indexOf(dontText);

      let multiplyStart = textInput.indexOf(mulText);
      let nextMultiplyStart = textInput.indexOf(mulText, multiplyStart + 1);
      let multiplyEnd = textInput.indexOf(")", multiplyStart);

      // part two code
      if (stopAtIndex !== -1 && multiplyEnd > stopAtIndex) {
        textInput = textInput.substring(stopAtIndex + dontText.length);
        doo = false;
      } else if (nextMultiplyStart > multiplyEnd || nextMultiplyStart === -1) {
        let textVal = textInput.slice(multiplyStart, multiplyEnd + 1);
        let strippedBack = textVal.replace(regex, "");

        //if the text length minus 'mul()' is more or less than 5 it has an invalid char such as mul(4!, 5)
        if (strippedBack.length === textVal.length - 5) {
          let numVal = strippedBack.split(",");

          let numOne = Number(numVal[0]);
          let numTwo = Number(numVal[1]);

          //sometimes it'll get mul(4, ), this is invalid because numberTwo will be NaN
          if (!Number.isNaN(numOne) && !Number.isNaN(numTwo)) {
            outputVal += numOne * numTwo;
          }
        }

        // strip all chars before the end bracket
        textInput = textInput.substring(multiplyEnd + 1);
      } else {
        textInput = textInput.substring(nextMultiplyStart - 4); // 4 is the length of mul(
      }
    } else {
      let nextDoIndex = textInput.indexOf(doText);
      textInput = textInput.substring(nextDoIndex + doText.length);
      doo = true;
    }
  }

  return new Promise((resolve, reject) => {
    resolve(outputVal);
  });
}

export default Day3;
