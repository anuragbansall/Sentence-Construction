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
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);

  const onNext = useCallback(() => {
    const isFinished = handleNextQuestion(
      currentQuestionIndex,
      setCurrentQuestionIndex,
      questions
    );

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswers = currentQuestion.correctAnswer;
    const selectedAnswer = selectedOptions;

    // Replace all blanks one by one for prompt and response formatting
    const formatSentence = (sentence, answers) => {
      let i = 0;
      return sentence.replace(/_____________/g, () => answers[i++]);
    };

    const formattedPrompt = formatSentence(
      currentQuestion.question,
      correctAnswers
    );
    const formattedResponse = formatSentence(
      currentQuestion.question,
      selectedAnswer
    );

    const isCorrect = correctAnswers.every(
      (answer, idx) => selectedAnswer[idx] === answer
    );

    const newResult = {
      prompt: formattedPrompt,
      response: formattedResponse,
      isCorrect: isCorrect,
    };

    // Update results first, then calculate score if quiz is finished
    setResults((prevResults) => {
      const updatedResults = [...prevResults, newResult];

      if (isFinished) {
        const correctCount = updatedResults.filter(
          (res) => res.isCorrect
        ).length;
        const calculatedScore = Math.round(
          (correctCount / updatedResults.length) * 100
        );
        setScore(calculatedScore);
        setIsQuizFinished(true);
        console.log("Final Score:", calculatedScore);
      }

      return updatedResults;
    });

    setSelectedOptions([]);
  }, [
    currentQuestionIndex,
    questions,
    selectedOptions,
    setCurrentQuestionIndex,
    setIsQuizFinished,
    setResults,
    setScore,
  ]);

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
      <ResultPage
        results={results}
        setResults={setResults}
        score={score}
        setScore={setScore}
      />
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
