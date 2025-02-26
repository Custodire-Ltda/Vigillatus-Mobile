import React from "react";
import { View, Text, Image } from "react-native";
import Styles from "./styles.js";

export default function Profile({exit}) {
    return (
      <View style={Styles.container} >
        <View style={Styles.profileBody}>
          <View style={Styles.profile}>
            <Image style={Styles.imageProfile} source={require('../../images/occurrenceImage.png')}/>
            <Text style={Styles.textProfile}>Felipe João</Text>
          </View>
          {exit}
        </View>
      </View>
    );
  }