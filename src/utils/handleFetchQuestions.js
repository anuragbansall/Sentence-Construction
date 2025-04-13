const handleFetchQuestions = async (setQuestions) => {
  try {
    const response = await fetch("http://localhost:3001/data");
    const data = await response.json();
    setQuestions(data.questions.slice(0, 3) || []); // Limit to 3 questions for testing
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

export default handleFetchQuestions;
