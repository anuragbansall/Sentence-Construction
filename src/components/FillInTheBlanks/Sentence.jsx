import React, { useContext } from "react";
import { FillInTheBlanksContext } from ".";
import Button from "../Button";

function Sentence() {
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
}

export default Sentence;
