import { useContext, useEffect, useState } from "react";
import { FillInTheBlanksContext } from ".";

function ProgressBar() {
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
}

export default ProgressBar;
