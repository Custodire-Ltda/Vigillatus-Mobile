import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Notification from "../../componentes/Notification";
import Search from "../../componentes/ExpansiveSearch";
import Card from "../../componentes/Card"

export default function Setores() {
  return (
    <View style={globalStyles.container}>
      <View style={Styles.header}>
        <Search />
        <Notification />
      </View>
      <View style={Styles.body}>
        <Card/>
        <Card/>
      </View>
    </View>
  );
}
