import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from "./styles.js";

export default function Profile({ gestorInfo, gestorService, navigation, exit }) {
  const DEFAULT_IMAGE = require('../../images/occurrenceImage.png');
  const gestorFoto = gestorInfo.foto 
    ? { uri: `data:${gestorInfo.foto.contentType};base64,${gestorInfo.foto.data}` } 
    : DEFAULT_IMAGE;

  const logoff = () => {
    gestorService.clearLoggedGestor();
    navigation.navigate("Login");
  } 

  if (gestorInfo) {
    return (
      <View style={Styles.container}>
        <View style={Styles.profileBody}>
          <View style={Styles.profile}>
            <Image
              style={Styles.imageProfile}
              source={gestorFoto}
            />
            <Text style={Styles.textProfile}>{gestorInfo.nome}</Text>
          </View>
          {exit && (
            <TouchableOpacity onPress={() => logoff()}>
              {exit}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
}
