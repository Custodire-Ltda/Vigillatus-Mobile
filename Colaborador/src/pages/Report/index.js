import React from "react";
import { View, Text, Image } from "react-native";
import globalStyles from "../../Styles/globalStyles";
import Styles from "./styles";
import Checkbox from "../../componentes/Checkbox";

export default function Report() {


  return (
    <View style={globalStyles.container}>
      <View style={Styles.body}>
        <Image source={require("../../images/iconErrorRed.png")} />
        <Text style={Styles.title}>Houve um erro?</Text>
        <Text style={Styles.text}>
          Caso não seja você na imagem disponibilizada da ocorrência, por favor,
          reporte abaixo.
        </Text>
        <Image
          style={Styles.image}
          source={require("../../images/occurrenceImage.png")}
        />
        <Checkbox
          text={
            <Text style={Styles.text}>
              Afirmo que não sou o colaborador capturado na imagem.
            </Text>
          }
        />
      </View>
      <View style={Styles.buttonSend}>
        <Text style={Styles.textButtonSend}>Enviar</Text>
      </View>
    </View>
  );
}
