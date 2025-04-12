import React, { useCallback, useEffect, useRef, useState } from "react";
import FillInTheBlanks from "./components/FillInTheBlanks";

function App() {
  const initialTime = useRef(30);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime.current);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const handleFetchQuestions = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/data");
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, []);

  useEffect(() => {
    handleFetchQuestions();
  }, [handleFetchQuestions]);

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
    setTimeLeft(initialTime.current);
  }, [currentQuestionIndex]);

  return (
    <div className="min-h-screen w-full bg-[#F8F8F8] flex items-center justify-center">
      {questions.length > 0 && (
        <FillInTheBlanks
          question={questions[currentQuestionIndex]}
          onNextQuestion={handleNextQuestion}
          timeLeft={timeLeft}
        >
          <FillInTheBlanks.Header />
          <FillInTheBlanks.Instruction />
          <FillInTheBlanks.Sentence />
          <FillInTheBlanks.Options />
          <FillInTheBlanks.Submit />
        </FillInTheBlanks>
      )}
    </div>
  );
}

export default App;
