import React, { useContext, useEffect } from "react";
import FillInTheBlanks from "../components/FillInTheBlanks";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizProvider";

function FillInTheBlanksPage() {
  const {
    questions,
    currentQuestionIndex,
    onNext,
    timeLeft,
    selectedOptions,
    setSelectedOptions,
    isQuizFinished,
    isQuizStarted,
    setIsQuizStarted,
    error,
  } = useContext(QuizContext);

  const navigate = useNavigate();

  // Start the quiz when the component mounts
  useEffect(() => {
    if (!isQuizStarted) {
      setIsQuizStarted(true);
    }
  }, [isQuizStarted, setIsQuizStarted]);

  useEffect(() => {
    if (isQuizFinished) {
      navigate("/result");
    }
  }, [isQuizFinished, navigate]);

  useEffect(() => {
    if (questions.length === 0 && !error) {
      navigate("/");
    }
  }, [questions, error, navigate]);

  return (
    <div className="min-h-screen w-full bg-[#F8F8F8] flex items-center justify-center">
      {questions.length > 0 ? (
        <FillInTheBlanks
          question={questions[currentQuestionIndex]}
          onNextQuestion={onNext}
          timeLeft={timeLeft}
          questions={questions}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
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

export default FillInTheBlanksPage;
