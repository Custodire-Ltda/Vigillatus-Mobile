import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchOccurrencesData } from "../../API/api.js";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import OccurrencesList from "../../componentes/OccurrencesList/index.js";
import Search from "../../componentes/ExpansiveSearch";
import Notification from "../../componentes/Notification";

export default function Ocorrencias() {
  const [occurrences, setOccurrences] = useState([]);
  const [filteredOccurrences, setFilteredOccurrences] = useState([]);

  useEffect(() => {
    const getOccurrencesData = async () => {
      try {
        const data = await fetchOccurrencesData();
        setOccurrences(data);
        setFilteredOccurrences(data);
      } catch (error) {
        console.error("Error fetching occurrences data:", error);
      }
    };
    getOccurrencesData();
  }, []);  


  return (
    <View style={globalStyles.container}>
      <View style={Styles.header}>
        <Search results={occurrences} setFilteredResults={setFilteredOccurrences} />
        <Notification />
      </View>
      <View style={Styles.body}>
      <OccurrencesList title={<Text>Ocorrências</Text>} data={filteredOccurrences} />
      </View>
    </View>
  );
}
