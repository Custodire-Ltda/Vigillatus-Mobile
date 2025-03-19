export const fetchOccurrencesData = async () => {
  try {
    const response = await fetch("https://run.mocky.io/v3/7e7c54f9-d4ae-4766-9cba-fa79d4c5e2a7");
    if (!response.ok) {
      throw new Error("Erro na requisição: ${response.status} - ${response.statusText}");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching occurrences data:", error);
    throw error; 
  }
}; 
