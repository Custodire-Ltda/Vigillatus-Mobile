import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Card from "../../componentes/Card/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import InfoProfile from "../../componentes/InfoProfile/index";
import { fetchOccurrencesData } from "../../API/api";

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
      <View style={Styles.containerInfo}>
        <InfoProfile
          exit={<Ionicons name="exit" size={45} color="#A29F9F" />}
        />
        <View style={{ alignItems: "start", width: "90%", margin: "2%" }}>
          <Text style={Styles.title}> Últimas Ocorrências:</Text>
        </View>
        <View style={Styles.bodyCard}>
          <FlatList
            data={occurrences}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            snapToOffsets={Array.from({ length: occurrences.length }).map(
              (_, i) => i * (350 - 20) + i * 40
            )}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            scrollEventThrottle={16}
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if (index < 3) {
                return (
                  <TouchableOpacity
                    style={{ marginHorizontal: 10, alignItems: "center" }}
                    onPress={() => navigation.navigate("Ocorrencia", { item })}
                  >
                    <Card {...item} />
                  </TouchableOpacity>
                );
              }
              return null;
            }}
          />
        </View>
      </View>
    </View>
  );
}
