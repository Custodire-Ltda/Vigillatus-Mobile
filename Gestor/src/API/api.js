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


export const fetchGraphData = async () => {
  try {
    const response = await fetch("http://localhost:5000/GraficoOcorrenciasPorSetor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        setor: ['Setor A', 'Setor B', 'Setor C'],
        ocorrencias: [10, 20, 30],
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição do gráfico: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching graph data:", error);
    throw error;
  }
};

