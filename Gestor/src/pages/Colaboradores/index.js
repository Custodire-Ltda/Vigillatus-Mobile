import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Notification from "../../componentes/Notification";
import Search from "../../componentes/ExpansiveSearch";
import OccurrencesList from "../../componentes/OccurrencesList";
import CollaboratorsItem from "../../componentes/CollaboratorsItem";

export default function Colaboradores() {
  return (
    <View style={globalStyles.container}>
      <View style={Styles.header}>
        <Search />
        <Notification />
      </View>
      <View style={Styles.body}>
        <OccurrencesList title="Colaboradores">
          <TouchableOpacity>
            <CollaboratorsItem />
          </TouchableOpacity>
        </OccurrencesList>
      </View>
    </View>
  );
}
