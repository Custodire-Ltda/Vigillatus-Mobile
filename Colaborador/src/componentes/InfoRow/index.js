import React from "react";
import { View, Text} from "react-native";
import Styles from "./styles.js";

export default function InfoRow({ label, value, blackStyle, spaceStyle}) {
  return (
    <View style={[Styles.textBox, spaceStyle]}>
      <Text style={Styles.grayText}>{label}:</Text>
      <Text style={[Styles.blackText,blackStyle]}>{value}</Text>
    </View>
  );
}
