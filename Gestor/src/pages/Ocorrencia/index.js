import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import globalStyles from "../../Styles/globalStyles";
import Styles from "./styles.js";

export default function Ocorrencia() {
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
          <View style={Styles.textOccurrence}>
            <Text style={Styles.grayText}>Setor:</Text>
            <Text style={Styles.blackText}>Caldeira</Text>
          </View>
          <View style={Styles.horizontalLine} />
          <View style={Styles.textOccurrence}>
            <Text style={Styles.grayText}>Camêra:</Text>
            <Text style={Styles.blackText}>2565F</Text>
          </View>
          <View style={Styles.horizontalLine} />
          <View style={Styles.textOccurrence}>
            <Text style={Styles.grayText}>Data:</Text>
            <Text style={Styles.blackText}>15/02/2025</Text>
          </View>
          <View style={Styles.horizontalLine} />
          <View style={Styles.textOccurrence}>
            <Text style={Styles.grayText}>Hora:</Text>
            <Text style={Styles.blackText}>14:25</Text>
          </View>
          <View style={Styles.horizontalLine} />
          <View style={Styles.textOccurrence}>
            <Text style={Styles.grayText}>Colaborador:</Text>
            <Text style={Styles.blackText}>João Marcelo de Lima</Text>
          </View>
          <View style={Styles.horizontalLine} />
          <View style={Styles.textOccurrence}>
            <Text style={Styles.grayText}>Respónsavel:</Text>
            <Text style={Styles.blackText}>Luana Batista</Text>
          </View>
          <View style={Styles.horizontalLine} />
          <View style={Styles.textOccurrence}>
            <Text style={Styles.grayText}>Status:</Text>
            <Text style={Styles.blackText}>Em análise</Text>
          </View>
        </View>
      </View> 
    </View>
  );
}
