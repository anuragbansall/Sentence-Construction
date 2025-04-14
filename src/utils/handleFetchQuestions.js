const handleFetchQuestions = async (setQuestions) => {
  try {
    const response = await fetch(
      "https://json-server-api-1-g4z8.onrender.com/data"
    );
    const data = await response.json();
    setQuestions(data.questions || []); // Limit to 3 questions for testing
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

export default handleFetchQuestions;
