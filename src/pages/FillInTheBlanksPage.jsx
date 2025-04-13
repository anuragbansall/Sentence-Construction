import React from "react";
import FillInTheBlanks from "../components/FillInTheBlanks";
import Loading from "../components/Loading";

function FillInTheBlanksPage({
  questions,
  currentQuestionIndex,
  onNext,
  timeLeft,
  selectedOptions,
  setSelectedOptions,
}) {
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
