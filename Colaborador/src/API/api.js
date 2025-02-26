export const fetchOccurrencesData = async () => {
  try {
    const response = await fetch("https://run.mocky.io/v3/310d1dac-5f3e-40ed-b213-d1148b784030");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching occurrences data:", error);
    throw error; 
  }
}; 

export const fetchCollaboratorData = async () => {
  try {
    const response = await fetch("https://run.mocky.io/v3/3868ae99-b63f-4bb2-aa32-1ecf79dea418");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching occurrences data:", error);
    throw error; 
  }
}; 