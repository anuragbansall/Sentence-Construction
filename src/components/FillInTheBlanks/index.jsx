import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import Instruction from "./Instruction";
import Sentence from "./Sentence";
import Options from "./Options";
import Submit from "./Submit";

const FillInTheBlanksContext = createContext();

function FillInTheBlanks({
  question,
  onNextQuestion,
  timeLeft,
  children,
  questions,
  selectedOptions,
  setSelectedOptions,
}) {
  useEffect(() => {
    setSelectedOptions(question.options.map(() => null) || []);
  }, [question, setSelectedOptions]);

  const handleOptionClick = useCallback((option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      const emptyIndex = newSelectedOptions.indexOf(null);
      if (emptyIndex !== -1) {
        newSelectedOptions[emptyIndex] = option;
      }
      return newSelectedOptions;
    });
  }, []);

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

FillInTheBlanks.Header = Header;
FillInTheBlanks.ProgressBar = ProgressBar;
FillInTheBlanks.Instruction = Instruction;
FillInTheBlanks.Sentence = Sentence;
FillInTheBlanks.Options = Options;
FillInTheBlanks.Submit = Submit;

export { FillInTheBlanksContext };
export default FillInTheBlanks;
