import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from "./styles.js";

export default function Profile({ exit, navigation,page }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.profileBody}>
        <View style={Styles.profile}>
          <Image
            style={Styles.imageProfile}
            source={require("../../images/occurrenceImage.png")}
          />
          <Text style={Styles.textProfile}>Felipe João</Text>
        </View>
        {exit && (
          <TouchableOpacity onPress={() => navigation.navigate(page)}>
            {exit}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
