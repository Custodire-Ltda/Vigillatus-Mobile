import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import globalStyles from "../../Styles/globalStyles";
import styles from "./styles.js";
import Search from "../../componentes/ExpansiveSearch";
import OccurrencesList from "../../componentes/OccurrencesList/index.js";

export default function Ocorrencias() {
  const [occurrences, setOccurrences] = useState([]);
  const [filteredOccurrences, setFilteredOccurrences] = useState([]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <Search
            results={occurrences}
            setFilteredResults={setFilteredOccurrences}
          />
        </View>
      </View>
      <OccurrencesList
        title={<Text>Ocorrências</Text>}
        data={filteredOccurrences}
      />
    </View>
  );
}
