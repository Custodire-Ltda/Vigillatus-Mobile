import React from "react";
import { View, Text, FlatList, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "./styles.js";
import OcorrencesItem from "./OccurrencesItem/index.js";

export default function OccurrencesList({ data, title }) {
const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      <View style={Styles.subNavbar}>
        <Text style={Styles.textSubNavbar}>{title}</Text>
      </View>
      <View style={Styles.body}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Ocorrencia", {item})}>
              <OcorrencesItem {...item}/>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}