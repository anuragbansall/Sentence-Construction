import { useContext } from "react";
import { QuizContext } from "../../context/QuizProvider";
import StatCard from "./StatCard";

function HomeStats() {
  const { questions, initialTime } = useContext(QuizContext);

  return (
    <div className="w-full my-20 md:my-30 flex flex-col sm:flex-row justify-center items-center">
      <StatCard
        label="Time Per Question"
        value={`${initialTime} seconds`}
        bordered
      />
      <StatCard label="Total Question" value={questions.length} bordered />
      <StatCard label="Coins" value={10} />
    </div>
  );
}

export default HomeStats;
