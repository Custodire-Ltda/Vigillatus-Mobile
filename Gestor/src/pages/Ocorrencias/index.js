import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import globalStyles from "../../Styles/globalStyles";
import styles from "./styles.js";
import Search from "../../componentes/ExpansiveSearch";
import OccurrencesList from "../../componentes/OccurrencesList/index.js";
import Gestor from "../../API/Gestor.js";
import { api } from "../../API/api.js";

export default function Ocorrencias() {
  const [occurrences, setOccurrences] = useState([]);
  const [filteredOccurrences, setFilteredOccurrences] = useState([]);
  const [occurrencesList, setOccurrencesList] = useState([]);
  const [loggedGestor, setLoggedGestor] = useState({});

  const gestorService = new Gestor();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gestorInfo = await gestorService.getLoggedGestor();
        const gestorToken = await gestorService.getToken();

        setLoggedGestor(gestorInfo);

        const occurrencesList = await api.get("Ocorrencia/GestorOcorrencias/" + loggedGestor._id, {
          headers: {
            authorization: `Bearer ${gestorToken}`
          }
        });

        setOccurrencesList(occurrencesList.data)

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <Search
            results={filteredOccurrences}
            setFilteredResults={setFilteredOccurrences}
          />
        </View>
      </View>
      <OccurrencesList
        title={<Text>Ocorrências</Text>}
        data={occurrencesList}
      />
    </View>
  );
}
