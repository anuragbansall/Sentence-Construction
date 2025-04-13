import { useContext } from "react";
import { FillInTheBlanksContext } from ".";
import Button from "../Button";

function Header() {
  const { timeLeft } = useContext(FillInTheBlanksContext);
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl">00:{String(timeLeft).padStart(2, "0")}</h3>
      <Button onClick={() => window.location.reload()} title="Quit the test">
        Quit
      </Button>
    </div>
  );
}

export default Header;
