import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchOccurrencesData = async (id, token) => {
  try {
    const response = await api.get(`/Ocorrencia/ContarOcorrencias/${id}`, {
      headers: { 
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching occurrences data:", error);
    throw error; 
  }
};

export const fetchGraphData = async (id, token) => {
  try {
    const response = await api.get(`/Ocorrencia/TopColaboradores/${id}`, {
      headers: { 
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching graph data:", error);
    throw error;
  }
};