import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from "./styles.js";

export default function Button({icon, navigation, page, text}) {
    let content;

    if (!icon) {
      content = <Text style={Styles.buttonText}>{text}</Text>;
    } else {
      content = <Image style={Styles.buttonicon} source={icon} />;
    }

    return (
      <View style={Styles.container}>
      <TouchableOpacity
        style={Styles.buttonError}
        onPress={() => navigation.navigate(page)}
      >
        {content}
      </TouchableOpacity>
      </View>
    );
  }