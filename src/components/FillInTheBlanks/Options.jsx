import { useContext } from "react";
import { FillInTheBlanksContext } from ".";
import Button from "../Button";

function Options() {
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
}

export default Options;
