import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import globalStyles from "../../Styles/globalStyles";
import Notification from "../../componentes/Notification"
import Search from "../../componentes/ExpansiveSearch"
import OccurrencesList from "../../componentes/OccurrencesList/index.js";
import { fetchOccurrencesData } from "../../API/api.js";

export default function Ocorrencias() {
  const [occurrences, setOccurrences] = useState([]);
  const [filteredOccurrences, setFilteredOccurrences] = useState([]);

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
              <Search results={occurrences} setFilteredResults={setFilteredOccurrences} />
      <Notification/>
      <OccurrencesList title={<Text>Ocorrências</Text>} data={filteredOccurrences} />
    </View>
  );
}
