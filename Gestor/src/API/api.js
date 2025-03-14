export const fetchOccurrencesData = async () => {
  try {
    const response = await fetch("https://run.mocky.io/v3/2900cbdc-dce0-450b-be8c-da321b16bc57");
    if (!response.ok) {
      throw new Error("Erro na requisição: ${response.status} - ${response.statusText}");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching occurrences data:", error);
    throw error; 
  }
}; 
