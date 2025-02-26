import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from "./styles.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Checkbox({ text }) {
  const [selected, setSelected] = useState(false);

  return (
    <View style={Styles.container}>
      <View style={Styles.body}>
        <TouchableOpacity
          style={Styles.touchableContainer}
          onPress={() => setSelected(!selected)}
        >
          {selected && (
            <MaterialCommunityIcons
              name="check-bold"
              size={20}
              color="#4B7296"
            />
          )}
        </TouchableOpacity>
        {text}
      </View>
    </View>
  );
}
