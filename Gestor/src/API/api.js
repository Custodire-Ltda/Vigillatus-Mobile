import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:5000',
  timeout: 10000,
  headers: {
      'Content-Type': 'application/json'
  }
})

export const fetchOccurrencesData = async () => {
  try {
    const response = await fetch("http://10.0.2.2:3000/GraficoOcorrenciasPorSetor", { method: "POST" }); // todo: Rota temporária! Mudar dps
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching occurrences data:", error);
    throw error; 
  }
};

export const fetchGraphData = async () => {
  try {
    const response = await fetch("http://10.0.2.2:3000/GraficoOcorrenciasPorColaborador", { // todo: Rota temporária! Mudar dps
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        data: [
          {"_id": "Colaborador 1", "quantidade": 15},
          {"_id": "Colaborador 2", "quantidade": 10},
          {"_id": "Colaborador 3", "quantidade": 5},
          {"_id": "Colaborador 4", "quantidade": 3},
          {"_id": "Colaborador 5", "quantidade": 1}
        ]
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