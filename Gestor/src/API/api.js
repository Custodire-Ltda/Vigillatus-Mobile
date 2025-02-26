export const fetchOccurrencesData = async () => {
  try {
    const response = await fetch("https://run.mocky.io/v3/48734b40-1b52-4d6a-8ce9-a0e3cf4b67e5");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching occurrences data:", error);
    throw error; 
  }
}; 