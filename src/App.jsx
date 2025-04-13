import React, { useContext } from "react";
import ResultPage from "./pages/ResultPage";
import FillInTheBlanksPage from "./pages/FillInTheBlanksPage";
import { QuizContext } from "./context/QuizProvider";

function App() {
  const {
    questions,
    currentQuestionIndex,
    onNext,
    timeLeft,
    selectedOptions,
    setSelectedOptions,
    isQuizFinished,
    error,
    results,
    setResults,
    score,
    setScore,
  } = useContext(QuizContext);

  if (isQuizFinished) {
    return (
      <ResultPage
        results={results}
        setResults={setResults}
        score={score}
        setScore={setScore}
      />
    );
  }

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
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
    />
  );
}

export default App;
