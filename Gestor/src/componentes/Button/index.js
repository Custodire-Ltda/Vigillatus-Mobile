import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from "./styles.js";

export default function Button({ icon, navigation, page, text, onPress }) {
  const handlePress = () => {
    if (onPress) {
      onPress(); // Prioriza a função personalizada
    } else if (page && navigation) {
      navigation.navigate(page);
    }
  };

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        style={Styles.buttonError}
        onPress={handlePress}
      >
        {icon ? (
          <Image style={Styles.buttonicon} source={icon} />
        ) : (
          <Text style={Styles.buttonText}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}