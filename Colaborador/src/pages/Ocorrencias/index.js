import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import globalStyles from "../../Styles/globalStyles";
import Profile from "../../componentes/Profile/index";
import OccurrencesList from "../../componentes/OccurrencesList/index.js";
import { fetchOccurrencesData } from "../../API/api.js";

export default function Ocorrencias() {
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
      <Profile />
      <OccurrencesList title={<Text>Ocorrências</Text>} data={occurrences} />
    </View>
  );
}
