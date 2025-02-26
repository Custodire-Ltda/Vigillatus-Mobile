import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Profile from "../../componentes/Profile/index";
import Card from "../../componentes/Card/index";

export default function Main({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Profile />
      <View style={Styles.horizontalLine} />
      <View style={{ alignItems: "start", width: "90%", margin: "2%" }}>
        <Text style={Styles.title}> Últimas Ocorrências:</Text>
      </View>
      <TouchableOpacity
        style={Styles.touchable}
        onPress={() => navigation.navigate("Ocorrencias")}
      >
        <Card title={<Text>João Felipe</Text>}>
          <Image
            style={Styles.image}
            source={require("../../images/occurrenceImage.png")}
          />
          <View style={Styles.bodyText}>
            <Text style={Styles.text}>Engenheiro Eletricista</Text>
            <Text style={Styles.text}>06/11/2023</Text>
            <Text style={Styles.text}>Caldeira - SPOL22</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <View style={Styles.containerInfo}></View>
    </View>
  );
}
