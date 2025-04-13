const handleFetchQuestions = async (setQuestions) => {
  try {
    const response = await fetch("http://localhost:3001/data");
    const data = await response.json();
    setQuestions(data.questions || []);
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

export default handleFetchQuestions;
