import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "./styles.js";
import OcorrencesItem from "../../componentes/OccurrencesList/OccurrencesItem/index.js";
import Gestor from "../../API/Gestor.js";
import { api } from "../../API/api.js";

export default function OccurrencesList({ data, title }) {
  const [loggedGestor, setLoggedGestor] = useState({});
  const [occurrencesList, setOccurrencesList] = useState([]);

  const navigation = useNavigation();

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
    <View style={Styles.container}>
      <View style={Styles.subNavbar}>
        <Text style={Styles.textSubNavbar}>{title}</Text>
      </View>
        <FlatList
        style={Styles.body}
          data={occurrencesList}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Ocorrencia", { item })}
            >
            <OcorrencesItem {...item} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={Styles.horizontalLine} />}
        />
    </View>
  );
}
