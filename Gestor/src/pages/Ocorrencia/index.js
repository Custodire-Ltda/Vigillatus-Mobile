import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import globalStyles from "../../Styles/globalStyles";
import Styles from "./styles.js";
import { useRoute } from "@react-navigation/native";
import InfoRow from "../../componentes/InfoRow/index.js";

export default function Ocorrencia({ navigation }) {
  const route = useRoute();
  const { item } = route.params;

  return (
    <View style={globalStyles.container}>
      <View style={Styles.body}>
        <View style={Styles.imageOccurrence}>
          <Image
            style={Styles.image}
            source={require("../../images/occurrenceImage.png")}
          />
        </View>
        <View style={Styles.bodyText}>
          <InfoRow label="Setor" value={item.setor} spaceStyle={{ justifyContent:"space-between"}} />
          <View style={Styles.horizontalLine} />
          <InfoRow label="Camêra" value={item.camera} spaceStyle={{ justifyContent:"space-between"}} />
          <View style={Styles.horizontalLine} />
          <InfoRow label="Data" value={item.data} spaceStyle={{ justifyContent:"space-between"}} />
          <View style={Styles.horizontalLine} />
          <InfoRow label="Hora" value={item.hora} spaceStyle={{ justifyContent:"space-between"}} />
          <View style={Styles.horizontalLine} />
          <InfoRow label="Colaborador"  value={item.nomeColaborador} spaceStyle={{ justifyContent:"space-between"}} />
          <View style={Styles.horizontalLine} />
          <InfoRow label="Responsável" value={item.nome} spaceStyle={{ justifyContent:"space-between"}} />
          <View style={Styles.horizontalLine} />
          <InfoRow label="Status" value={item.status} spaceStyle={{ justifyContent:"space-between"}} />
        </View>
      </View>
    </View>
  );
}
