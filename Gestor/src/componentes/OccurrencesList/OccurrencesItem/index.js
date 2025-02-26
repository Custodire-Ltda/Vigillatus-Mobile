import React from "react";
import { View, Text, Image } from "react-native";
import Styles from "./styles.js";

export default function OcorrencesItem({ setor, data, status }) {

  return (
    <View>
          <View style={Styles.container}>
            <View style={Styles.box}>
              <View style={Styles.imageBox}>
                <Image
                  style={Styles.image}
                  source={require("../../../images/occurrenceImage.png")}
                />
              </View>
              <View>
                <View style={Styles.textBox}>
                  <Text style={Styles.grayText}>Setor:</Text>
                  <Text style={Styles.blackText}>{setor}</Text>
                </View>
                <View style={Styles.textBox}>
                  <Text style={Styles.grayText}>Data:</Text>
                  <Text style={Styles.blackText}>{data}</Text>
                </View>
                <View style={Styles.textBox}>
                  <Text style={Styles.grayText}>Status:</Text>
                  <Text style={Styles.blackText}>{status}</Text>
                </View>
              </View>
            </View>
            <View style={Styles.horizontalLine} />
          </View>
    </View>
  );
}
