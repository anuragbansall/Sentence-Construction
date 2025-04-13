import React, { useContext } from "react";
import { QuizContext } from "../../context/QuizProvider";

const Result = ({ children }) => (
  <div className="mx-auto p-8 w-full flex flex-col items-center gap-8">
    {children}
  </div>
);

function Score() {
  const { score } = useContext(QuizContext);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-green-800">{score}</h1>
      <p className="text-lg text-green-800">Overall Score</p>
      <p className="text-lg text-gray-600 mt-6 text-center max-w-2xl">
        You have completed the quiz. Your score is {score}%.
      </p>
    </div>
  );
}

function PromptResponse({ prompt, response, index, total, isCorrect }) {
  const responseClass = isCorrect
    ? "text-green-700 bg-green-50"
    : "text-red-700 bg-red-50";

  return (
    <div className="max-w-2xl w-full rounded-xl shadow-xl overflow-hidden my-12">
      <div className="bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-zinc-500 bg-zinc-200 font-semibold p-1 rounded-sm">
            Prompt
          </span>
          <p className="text-sm text-zinc-500">
            <span className="text-black">{index + 1}</span>/{total}
          </p>
        </div>
        <p className="text-gray-700 text-lg">{prompt}</p>
      </div>
      <div className="bg-[#F6F9F9] p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-zinc-500">
            Your response
            <span
              className={`ml-2 text-sm font-semibold p-1 rounded-sm ${responseClass}`}
            >
              {isCorrect ? "Correct" : "Incorrect"}
            </span>
          </p>
        </div>
        <p className="text-gray-700 text-lg">{response}</p>
      </div>
    </div>
  );
}

function List() {
  const { results } = useContext(QuizContext);
  return (
    <div className="w-full flex flex-col items-center">
      {results.map((item, index) => (
        <PromptResponse
          key={index}
          prompt={item.prompt}
          response={item.response}
          index={index}
          total={results.length}
          isCorrect={item.isCorrect}
        />
      ))}
    </div>
  );
}

Result.Score = Score;
Result.PromptResponse = PromptResponse;
Result.List = List;

export default Result;
