import Button from "../Button";

function HomeActions() {
  return (
    <div className="w-full flex justify-center items-center gap-4">
      <Button className="px-16 border-blue-700 text-blue-700 hover:bg-blue-50">
        Back
      </Button>
      <Button className="px-16 border-blue-700 bg-blue-700 text-white hover:bg-blue-800">
        Start
      </Button>
    </div>
  );
}

export default HomeActions;
