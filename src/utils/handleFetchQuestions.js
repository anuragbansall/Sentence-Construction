const handleFetchQuestions = async (setQuestions) => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:10000";
  try {
    const response = await fetch(`${url}/data`);
    const data = await response.json();
    setQuestions(data.questions || []);
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

export default handleFetchQuestions;
