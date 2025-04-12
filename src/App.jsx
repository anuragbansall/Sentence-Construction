import React, { useCallback, useEffect, useRef, useState } from "react";
import FillInTheBlanks from "./components/FillInTheBlanks";

const question = [
  {
    questionId: "b28af948-db8b-465e-92e6-3d42534c4533",
    question:
      "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
    questionType: "text",
    answerType: "options",
    options: ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
    correctAnswer: ["User-centric", "Incorporated", "Enhancing", "Cultivating"],
  },
  {
    questionId: "6e6534ea-260a-4c26-96fd-f830b27601fb",
    question:
      "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
    questionType: "text",
    answerType: "options",
    options: ["Captivating", "Eclectic", "Garnering", "Blended"],
    correctAnswer: ["Eclectic", "Blended", "Captivating", "Garnering"],
  },
  {
    questionId: "7186e3da-0384-460a-af19-5a3984758e78",
    question:
      "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
    questionType: "text",
    answerType: "options",
    options: ["Pioneering", "Paving", "Overcoming", "Opened up"],
    correctAnswer: ["Pioneering", "Opened up", "Overcoming", "Paving"],
  },
  {
    questionId: "10cbe3c2-13bb-4973-a794-18bf309b0791",
    question:
      "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
    questionType: "text",
    answerType: "options",
    options: ["Improving", "Reducing", "Enabled", "Revolutionary"],
    correctAnswer: ["Revolutionary", "Enabled", "Improving", "Reducing"],
  },
];

function App() {
  const initialTime = useRef(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime.current);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return initialTime.current;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleNextQuestion]);

  useEffect(() => {
    setTimeLeft(10);
  }, [currentQuestionIndex]);

  return (
    <div className="min-h-screen w-full bg-[#F8F8F8] flex items-center justify-center">
      <FillInTheBlanks
        question={question[currentQuestionIndex]}
        onNextQuestion={handleNextQuestion}
        timeLeft={timeLeft}
      >
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
