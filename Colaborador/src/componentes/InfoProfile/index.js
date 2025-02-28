import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import InfoRow from "../../componentes/InfoRow/index";
import { fetchCollaboratorData } from "../../API/api";
import Ionicons from "react-native-vector-icons/Ionicons";
import Styles from "./styles.js";
import { useNavigation } from '@react-navigation/native';
//import formatLastName from "../../componentes/formatLastName/index.js";

export default function Profile() {
  const [collaborator, setCollaborator] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getCollaboratorData = async () => {
      try {
        const data = await fetchCollaboratorData();
        setCollaborator(data);
      } catch (error) {
        console.error("Error fetching collaborator data:", error);
      }
    };

    getCollaboratorData();
  }, []);

  if (!collaborator) {
    return (
      <View style={Styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

 // const formattedFullName = `${collaborator.firstName} ${formatLastName(collaborator.lastName)}`;

  return (
    <View style={Styles.container}>
      <TouchableOpacity style={Styles.containerExit} onPress={() => navigation.navigate("Login")} >
        <Ionicons name="exit" size={45} color="#A29F9F" />
      </TouchableOpacity>
      <View style={Styles.teste}>
        <Image
          style={Styles.imageProfile}
          source={require("../../images/occurrenceImage.png")}
        />
        <View style={Styles.containerCollborator}>
          {collaborator && (
            <View style={Styles.bodyCollborator}>
              <InfoRow
                label="Nome"
                value={collaborator.nomeColaborador}
                blackStyle={{ marginLeft: "3%" }}
                spaceStyle={{ marginBottom: "3%" }}
              />
              <InfoRow
                label="Email"
                value={collaborator.email}
                blackStyle={{ marginLeft: "3%" }}
                spaceStyle={{ marginBottom: "3%" }}
              />
              <InfoRow
                label="Telefone"
                value={collaborator.telefone}
                blackStyle={{ marginLeft: "3%" }}
                spaceStyle={{ marginBottom: "3%" }}
              />
              <InfoRow
                label="Registro"
                value={collaborator.registro}
                blackStyle={{ marginLeft: "3%" }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
