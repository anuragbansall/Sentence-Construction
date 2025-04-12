import React from "react";
import FillInTheBlanks from "./components/FillInTheBlanks";

const question = {
  question:
    "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
  options: ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
  correctAnswer: ["User-centric", "Incorporated", "Enhancing", "Cultivating"],
};

function App() {
  return (
    <div className="min-h-screen w-full bg-[#F8F8F8] flex items-center justify-center">
      <FillInTheBlanks question={question}>
        <FillInTheBlanks.Header />
        <FillInTheBlanks.Instruction />
        <FillInTheBlanks.Sentence />
        <FillInTheBlanks.Options />
        <FillInTheBlanks.Submit />
      </FillInTheBlanks>
    </div>
  );
}

export default App;
