const handleNextQuestion = (
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questions
) => {
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    return false;
  }

  return true;
};

export default handleNextQuestion;
