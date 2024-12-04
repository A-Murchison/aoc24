import "../site.css";
import { GetTextFromFile } from "../Helpers/fileReader";
import React, { useEffect, useState } from "react";
import Template from "./CodePageTemplate";

export function AnswerPageTemplate(
  inputText,
  codeOne,
  codeTwo,
  answerOne,
  answerTwo
) {
  const [output, setOutput] = useState("");
  const [output2, setOutput2] = useState("");

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
  aoc.dayText = "1";
  aoc.input = input;
  aoc.output = answerOne;
  aoc.output2 = answerTwo;
  aoc.partOne = codeOne.toString();
  aoc.partTwo = codeTwo.toString();

  return <Template aoc={aoc}> </Template>;
}

export default AnswerPageTemplate;
