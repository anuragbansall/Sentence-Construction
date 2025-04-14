import { useNavigate } from "react-router-dom";
import Button from "../Button";

function HomeActions() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center gap-4 mt-10">
      <Button
        className="px-16 border-blue-700 text-blue-700 hover:bg-blue-50"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Button
        className="px-16 border-blue-700 bg-blue-700 text-white hover:bg-blue-800"
        onClick={() => navigate("/quiz")}
      >
        Start
      </Button>
    </div>
  );
}

export default HomeActions;
