import React, { useContext } from "react";
import { FillInTheBlanksContext } from ".";
import Button from "../Button";

function Sentence() {
  const { question, selectedOptions, handleOptionRemove } = useContext(
    FillInTheBlanksContext
  );

  return (
    <div className="mt-6 px-4">
      <p className="text-2xl font-medium text-zinc-600 text-justify leading-[2] sm:leading-[3]">
        {question.question.split("_____________").map((part, index) => (
          <span key={index} className="inline">
            <span>{part}</span>
            {index < selectedOptions.length && (
              <span className="inline-block align-middle mx-1">
                {selectedOptions[index] ? (
                  <Button
                    className="text-sm px-2 py-1 bg-zinc-200 hover:bg-zinc-300 rounded-md transition"
                    onClick={() => handleOptionRemove(selectedOptions[index])}
                    title="Remove option"
                  >
                    {selectedOptions[index]}
                  </Button>
                ) : (
                  <span className="inline-block w-[6rem] h-6 bg-zinc-100 rounded-md"></span>
                )}
              </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}

export default Sentence;
