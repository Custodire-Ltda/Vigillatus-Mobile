import React from "react";
import { View, Text, Image } from "react-native";
import Styles from "./styles.js";

export default function CollaboratorsItem() {
  return (
    <View style={Styles.container}>
      <View style={Styles.box}>
        <View style={Styles.imageBox}>
          <Image
            style={Styles.image}
            source={require("../../images/occurrenceImage.png")}
          />
        </View>
        <View>
            <Text style={Styles.blackText}>Bruno Freitas</Text>
        </View>
      </View>
      <View style={Styles.horizontalLine} />
    </View>
  );
}
