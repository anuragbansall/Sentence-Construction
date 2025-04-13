import { useContext } from "react";
import { FillInTheBlanksContext } from ".";
import Button from "../Button";

function Submit() {
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
}

export default Submit;
