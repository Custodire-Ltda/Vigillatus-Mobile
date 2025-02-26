import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "./styles.js";
import OcorrencesItem from "../../componentes/OccurrencesList/OccurrencesItem/index.js";

export default function OccurrencesList({ data, title }) {
  const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      <View style={Styles.subNavbar}>
        <Text style={Styles.textSubNavbar}>{title}</Text>
      </View>
        <FlatList
        style={Styles.body}
          data={data}
          keyExtractor={(item) => item.id.toString()}
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
