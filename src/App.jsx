import React, { useCallback, useEffect, useRef, useState } from "react";
import FillInTheBlanks from "./components/FillInTheBlanks";
import handleNextQuestion from "./utils/handleNextQuestion";
import handleFetchQuestions from "./utils/handleFetchQuestions";
import Loading from "./components/Loading";
import Result from "./components/Result";
import ResultPage from "./pages/ResultPage";
import FillInTheBlanksPage from "./pages/FillInTheBlanksPage";

function App() {
  const initialTime = useRef(30);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime.current);
  const [error, setError] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const onNext = useCallback(() => {
    const isFinished = handleNextQuestion(
      currentQuestionIndex,
      setCurrentQuestionIndex,
      questions
    );

    if (isFinished) {
      setIsQuizFinished(true);
    }
  }, [currentQuestionIndex, questions, setCurrentQuestionIndex]);

  const onFetchQuestions = useCallback(async () => {
    try {
      await handleFetchQuestions(setQuestions);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    onFetchQuestions();
  }, [onFetchQuestions]);

  useEffect(() => {
    if (isQuizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onNext();
          return initialTime.current;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNext, isQuizFinished]);

  useEffect(() => {
    setTimeLeft(initialTime.current);
  }, [currentQuestionIndex]);

  // Temporary quiz finished state for testing
  if (isQuizFinished) {
    return <ResultPage />;
  }

  // Temporary error handling for testing
  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-center text-red-500 font-bold">
          {error} Please try again later.
        </div>
      </div>
    );
  }

  return (
    <FillInTheBlanksPage
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      onNext={onNext}
      timeLeft={timeLeft}
    />
  );
}

export default App;
