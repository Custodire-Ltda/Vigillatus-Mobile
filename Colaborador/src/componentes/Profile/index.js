import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { fetchCollaboratorData } from "../../API/api";
import Styles from "./styles.js";

export default function Profile() {
    const [collaborator, setCollaborator] = useState(null);
  
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

    return (
      <View style={Styles.container} >
        <View style={Styles.profileBody}>
        {collaborator && (
          <View style={Styles.profile}>
            <Image style={Styles.imageProfile} source={require("../../images/occurrenceImage.png")}/>
            <Text style={Styles.textProfile}>{collaborator.firstName}</Text>
          </View>
        )}
        </View>
      </View>
    );
  }