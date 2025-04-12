// components/FillInTheBlanks/index.js
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Button from "./Button";

// Create the context for shared state
const FillInTheBlanksContext = createContext();

// Main FillInTheBlanks Component
function FillInTheBlanks({
  question,
  onNextQuestion,
  timeLeft,
  children,
  questions,
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    question.options.map(() => null)
  );

  useEffect(() => {
    setSelectedOptions(question.options.map(() => null));
  }, [question]);

  const handleOptionClick = useCallback(
    (option) => {
      const newSelectedOptions = [...selectedOptions];
      const emptyIndex = newSelectedOptions.indexOf(null);
      if (emptyIndex !== -1) {
        newSelectedOptions[emptyIndex] = option;
        setSelectedOptions(newSelectedOptions);
      }
    },
    [selectedOptions]
  );

  const handleOptionRemove = useCallback(
    (option) => {
      const newSelectedOptions = selectedOptions.map((opt) =>
        opt === option ? null : opt
      );
      setSelectedOptions(newSelectedOptions);
    },
    [selectedOptions]
  );

  const contextValue = useMemo(
    () => ({
      question,
      selectedOptions,
      handleOptionClick,
      handleOptionRemove,
      onNextQuestion,
      timeLeft,
      questions,
    }),
    [
      question,
      selectedOptions,
      timeLeft,
      handleOptionClick,
      handleOptionRemove,
      onNextQuestion,
      questions,
    ]
  );

  return (
    <FillInTheBlanksContext.Provider value={contextValue}>
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4 max-w-2xl">
        {children}
      </div>
    </FillInTheBlanksContext.Provider>
  );
}

// Child components of FillInTheBlanks
const Header = () => {
  const { timeLeft } = useContext(FillInTheBlanksContext);
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl">00:{String(timeLeft).padStart(2, "0")}</h3>
      <Button
        utton
        onClick={() => window.location.reload()}
        title="Quit the test"
      >
        Quit
      </Button>
    </div>
  );
};

const ProgressBar = () => {
  const { questions, question } = useContext(FillInTheBlanksContext);
  const [answeredLines, setAnsweredLines] = useState(0);
  const currentQuestionIndex = questions.indexOf(question) + 1;

  useEffect(() => {
    setAnsweredLines(currentQuestionIndex);
  }, [currentQuestionIndex]);

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      {questions.map((_, index) => (
        <div
          key={index}
          className={`h-1 w-full rounded-full ${
            index < answeredLines ? "bg-orange-300" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
};

const Instruction = () => (
  <p className="text-xl font-medium text-center text-zinc-500">
    Select the missing words in the correct order
  </p>
);

const Sentence = () => {
  const { question, selectedOptions, handleOptionRemove } = useContext(
    FillInTheBlanksContext
  );

  return (
    <div className="mt-8">
      <p className="text-xl font-medium text-center text-zinc-600 leading-[3] flex flex-wrap gap-2">
        {question.question.split("_____________").map((part, index) => (
          <React.Fragment key={index}>
            <span>{part.trim()}</span>
            {index < selectedOptions.length && (
              <span className="font-semibold border-b-2 border-zinc-300 flex items-center justify-center w-[8rem]">
                {selectedOptions[index] ? (
                  <Button
                    className="text-sm"
                    onClick={() => handleOptionRemove(selectedOptions[index])}
                    title="Remove option"
                  >
                    {selectedOptions[index]}
                  </Button>
                ) : (
                  <span className="w-full h-6 inline-block bg-zinc-100 rounded-md"></span>
                )}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

const Options = () => {
  const { question, handleOptionClick, selectedOptions } = useContext(
    FillInTheBlanksContext
  );
  return (
    <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
      {question.options.map((option, index) => (
        <Button
          key={index}
          className="px-4 py-2 border-1 border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-100 transition duration-200"
          disabled={selectedOptions.includes(option)}
          onClick={() => handleOptionClick(option)}
          title="Select option"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

const Submit = () => {
  const { onNextQuestion, selectedOptions } = useContext(
    FillInTheBlanksContext
  );
  return (
    <div className="flex mt-8">
      <Button
        className="ml-auto"
        onClick={onNextQuestion}
        disabled={selectedOptions.includes(null)}
        title="Next question"
      >
        Next
      </Button>
    </div>
  );
};
// Export FillInTheBlanks and all its child components
FillInTheBlanks.Header = Header;
FillInTheBlanks.ProgressBar = ProgressBar;
FillInTheBlanks.Instruction = Instruction;
FillInTheBlanks.Sentence = Sentence;
FillInTheBlanks.Options = Options;
FillInTheBlanks.Submit = Submit;

export { FillInTheBlanksContext };
export default FillInTheBlanks;
