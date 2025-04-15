import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Profile from "../../componentes/Profile";
import GraphComponent from "../../componentes/Graphic";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Gestor from "../../API/Gestor";

export default function Main({ navigation }) {
  const [gestorInfo, setGestorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const gestorService = new Gestor();

  useEffect(() => {
    const fetchGestorInfo = async () => {
      try {
        const gestor = await gestorService.getLoggedGestor();
        setGestorInfo(gestor);
        
        if (!gestor) {
          console.log("É necessário se logar para acessar essa página!");
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Erro ao buscar gestor:", error);
        navigation.navigate("Login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGestorInfo();
  }, []); 

  if (isLoading) {
    return (
      <View style={globalStyles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Profile gestorInfo={gestorInfo} gestorService={gestorService} navigation={navigation} exit={<FontAwesome6 name="arrow-right-from-bracket" size={32} />} />
      <View style={Styles.horizontalLine} />
      <View style={Styles.body}>
        <View style={{ alignItems: "start", width: "90%", margin: "2%" }}>
          <Text style={Styles.title}> Últimas Ocorrências:</Text>
        </View>

        <GraphComponent />
      </View>
    </View>
  );
}
