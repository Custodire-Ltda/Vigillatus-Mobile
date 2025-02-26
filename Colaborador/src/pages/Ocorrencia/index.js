import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import globalStyles from "../../Styles/globalStyles";
import Styles from "./styles.js";
import { useRoute } from "@react-navigation/native";
import InfoRow from "../../componentes/InfoRow/index.js";
import formatLastName from "../../componentes/formatLastName/index.js";

export default function Ocorrencia({ navigation }) {
  const route = useRoute();
  const { item } = route.params;

const formattedFullName = `${item.firstName} ${formatLastName(item.lastName)}`;

const formattedFullResponsible = `${item.responsibleFirst} ${formatLastName(item.responsibleLast)}`;

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
          <InfoRow label="Colaborador"  value={formattedFullName} spaceStyle={{ justifyContent:"space-between"}} />
          <View style={Styles.horizontalLine} />
          <InfoRow label="Responsável" value={formattedFullResponsible} spaceStyle={{ justifyContent:"space-between"}} />
          <View style={Styles.horizontalLine} />
          <InfoRow label="Status" value={item.status} spaceStyle={{ justifyContent:"space-between"}} />
        </View>
      </View>
      <TouchableOpacity
        style={Styles.buttonError}
        onPress={() => navigation.navigate("Report")}
      >
        <Image
          style={Styles.buttonicon}
          source={require("../../images/iconError.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
