import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Card from "../../componentes/Card/index";
import Profile from "../../componentes/Profile";
import GraphComponent from "../../componentes/Graphic"; // Importa o componente de gráfico
import { fetchOccurrencesData } from "../../API/api";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

export default function Main({ navigation }) {
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    const getOccurrencesData = async () => {
      try {
        const data = await fetchOccurrencesData();
        setOccurrences(data);
      } catch (error) {
        console.error("Error fetching occurrences data:", error);
      }
    };

    getOccurrencesData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Profile page='Login' navigation={navigation} exit={<FontAwesome6 name="arrow-right-from-bracket" size={32} />} />
      <View style={Styles.horizontalLine} />
      <View style={Styles.body}>
        <View style={{ alignItems: "start", width: "90%", margin: "2%" }}>
          <Text style={Styles.title}> Últimas Ocorrências:</Text>
        </View>

        {/* <View style={Styles.containerInfo}></View> */}

        <GraphComponent />
      </View>
    </View>
  );
}
