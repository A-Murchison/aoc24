import "../site.css";
import React, { useEffect, useState } from "react";
import Template from "./CodePageTemplate";

//TODO: build this out
export function AnswerPageTemplate(
  dayText,
  input,
  partOne,
  partTwo,
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
  aoc.dayText = dayText;
  aoc.input = input;
  aoc.output = answerOne;
  aoc.output2 = answerTwo;
  aoc.partOne = partOne.toString();
  aoc.partTwo = partTwo.toString();

  return <Template aoc={aoc}> </Template>;
}

export default AnswerPageTemplate;
