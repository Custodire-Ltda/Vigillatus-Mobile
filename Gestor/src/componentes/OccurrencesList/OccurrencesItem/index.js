import React from "react";
import { View, Text, Image } from "react-native";
import Styles from "./styles.js";
import InfoRow from "../../InfoRow/index.js";

export default function OcorrencesItem({ setor, status, imagePath, timestamp }) {
  const date = new Date(timestamp);

  const formattedDateTime = date.toLocaleString('pt-BR', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  });

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
              <View style={Styles.textBox}>
                <InfoRow label="Setor" value={setor} blackStyle={{ marginLeft: "5%" }} />
                <InfoRow label="Data" value={formattedDateTime} blackStyle={{ marginLeft: "5%" }} />
                <InfoRow label="Status" value={status} blackStyle={{ marginLeft: "5%" }} />
              </View>
            </View>
          </View>
    </View>
  );
}
