import React from "react";
import { View, Text, Image } from "react-native";
import Styles from "./styles";

export default function Card({ setor, data, firstName, hora }) {
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{firstName}</Text>
      <View style={Styles.horizontalLine} />
      <View style={Styles.bodyOccurrence}>
        <Image
          style={Styles.image}
          source={require("../../images/occurrenceImage.png")}
        />
        <View style={Styles.bodyText}>
          <Text style={Styles.text}>{hora}</Text>
          <Text style={Styles.text}>{data}</Text>
          <Text style={Styles.text}>{setor}</Text>
        </View>
      </View>
    </View>
  );
}
