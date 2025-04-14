import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import handleNextQuestion from "../utils/handleNextQuestion";
import handleFetchQuestions from "../utils/handleFetchQuestions";

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const initialTime = useRef(3);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime.current);
  const [error, setError] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const isNextCalled = useRef(false);

  const formatSentence = (sentence, answers) => {
    let i = 0;
    return sentence
      .replace(/_____________/g, () => answers[i++])
      .replaceAll("null", "no answer");
  };

  const onNext = useCallback(() => {
    if (isNextCalled.current) return;

    isNextCalled.current = true;

    const isFinished = handleNextQuestion(
      currentQuestionIndex,
      setCurrentQuestionIndex,
      questions
    );

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswers = currentQuestion.correctAnswer;
    const selectedAnswer = selectedOptions;

    const isCorrect = correctAnswers.every(
      (answer, idx) => selectedAnswer[idx] === answer
    );

    const newResult = {
      prompt: formatSentence(currentQuestion.question, correctAnswers),
      response: formatSentence(currentQuestion.question, selectedAnswer),
      isCorrect,
    };

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
      }

      return updatedResults;
    });

    setSelectedOptions([]);
  }, [currentQuestionIndex, questions, selectedOptions]);

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
        if (prev <= 1 && !isNextCalled.current) {
          onNext();
          return initialTime.current;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      isNextCalled.current = false;
    };
  }, [onNext, isQuizFinished]);

  useEffect(() => {
    setTimeLeft(initialTime.current);
    isNextCalled.current = false;
  }, [currentQuestionIndex]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        onNext,
        timeLeft,
        selectedOptions,
        setSelectedOptions,
        results,
        score,
        isQuizFinished,
        error,
        setResults,
        setScore,
        initialTime: initialTime.current,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
