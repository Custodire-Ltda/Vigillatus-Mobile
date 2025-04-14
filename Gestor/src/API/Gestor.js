import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Gestor {
  // Chaves para armazenamento
  static GESTOR_KEY = '@loggedGestor';
  static TOKEN_KEY = '@authToken';

  async getGestor(id) {
    try {
      const response = await api.get(`GestorDados/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar gestor:", error);
      return null;
    }
  }

  // Armazenar gestor logado (async)
  async loggedGestor(gestor) {
    try {
      await AsyncStorage.setItem(Gestor.GESTOR_KEY, JSON.stringify(gestor));
    } catch (error) {
      console.error("Erro ao salvar gestor:", error);
      throw error;
    }
  }

  // Recuperar gestor logado (async)
  async getLoggedGestor() {
    try {
      const gestor = await AsyncStorage.getItem(Gestor.GESTOR_KEY);
      return gestor ? JSON.parse(gestor) : null;
    } catch (error) {
      console.error("Erro ao recuperar gestor:", error);
      return null;
    }
  }

  // Limpar dados do gestor (async)
  async clearLoggedGestor() {
    try {
      await AsyncStorage.removeItem(Gestor.GESTOR_KEY);
    } catch (error) {
      console.error("Erro ao limpar gestor:", error);
      throw error;
    }
  }

  // Verificar login (async)
  async isLoggedIn() {
    const gestor = await this.getLoggedGestor();
    return gestor !== null;
  }

  // Armazenar token (async)
  async setToken(token) {
    try {
      await AsyncStorage.setItem(Gestor.TOKEN_KEY, token);
    } catch (error) {
      console.error("Erro ao salvar token:", error);
      throw error;
    }
  }

  // Recuperar token (async)
  async getToken() {
    try {
      const token = await AsyncStorage.getItem(Gestor.TOKEN_KEY);
      console.log('Token recuperado:', token);
      return token;
    } catch (error) {
      console.error("Erro ao recuperar token:", error);
      return null;
    }
  }

  async updateGestor(gestorData, foto) {
    try {
      const token = await this.getToken();
      const loggedGestor = await this.getLoggedGestor();
      const id = loggedGestor?._id;

      if (!id) throw new Error('Gestor não autenticado');

      const formData = new FormData();
      
      // Adiciona campos ao FormData
      Object.keys(gestorData).forEach(key => {
        formData.append(key, gestorData[key]);
      });

      // Adiciona a foto se existir
      if (foto) {
        formData.append('foto', {
          uri: foto.uri,
          type: foto.type || 'image/jpeg',
          name: foto.fileName || `photo_${Date.now()}.jpg`
        });
      }

      const response = await api.put(`/Gestor/${id}`, formData, {
        headers: { 
          authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Atualiza dados locais
      await this.loggedGestor(response.data.gestor);

      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar gestor:", error);
      throw error;
    }
  }
}

export default Gestor;