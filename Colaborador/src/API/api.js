export const fetchOccurrencesData = async () => {
  try {
    const response = await fetch("https://run.mocky.io/v3/1e05ca81-e502-4b9b-a97d-d5912b4990f5");
    if (!response.ok) {
      throw new Error("Erro na requisição: ${response.status} - ${response.statusText}");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching occurrences data:", error);
    throw error; 
  }
}; 

export const fetchCollaboratorData = async () => {
  try {
    const response = await fetch("https://run.mocky.io/v3/891792b3-7a3c-4dc2-a401-23d519f24de5");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching collaborator data:", error);
    throw error; 
  }
}; 