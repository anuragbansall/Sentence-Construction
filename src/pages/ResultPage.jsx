import React from "react";
import Result from "../components/Result";
import Button from "../components/Button";

function ResultPage({ results, setResults, score, setScore }) {
  return (
    <div className="min-h-screen w-full pt-20 bg-[#F8F8F8] flex flex-col items-center justify-center">
      <Result
        results={results}
        setResults={setResults}
        score={score}
        setScore={setScore}
      >
        <Result.Score />

        <Button className="mx-auto border-blue-700 text-blue-700">
          Go to Dashboard
        </Button>

        <Result.List />
      </Result>
    </div>
  );
}

export default ResultPage;
