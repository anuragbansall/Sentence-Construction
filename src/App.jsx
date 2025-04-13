import React, { useCallback, useEffect, useRef, useState } from "react";
import FillInTheBlanks from "./components/FillInTheBlanks";
import handleNextQuestion from "./utils/handleNextQuestion";
import handleFetchQuestions from "./utils/handleFetchQuestions";
import Loading from "./components/Loading";

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
    return (
      <div className="min-h-screen w-full bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-center text-xl font-bold text-gray-700">
          Quiz Finished! Thank you for participating.
        </div>
      </div>
    );
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
    <div className="min-h-screen w-full bg-[#F8F8F8] flex items-center justify-center">
      {questions.length > 0 ? (
        <FillInTheBlanks
          question={questions[currentQuestionIndex]}
          onNextQuestion={onNext}
          timeLeft={timeLeft}
          questions={questions}
        >
          <FillInTheBlanks.Header />
          <FillInTheBlanks.ProgressBar />
          <FillInTheBlanks.Instruction />
          <FillInTheBlanks.Sentence />
          <FillInTheBlanks.Options />
          <FillInTheBlanks.Submit />
        </FillInTheBlanks>
      ) : (
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Loading />
          Loading questions...
        </div>
      )}
    </div>
  );
}

export default App;
