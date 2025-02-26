import React from "react";
import { View, Text, Image} from "react-native";
import Styles from './styles'

export default function Card({title, children}) {
  return (
    <View style={Styles.container}>
        <Text style={Styles.title}>{title}</Text>
        <View style={Styles.horizontalLine} />
        <View style={Styles.bodyOccurrence}>
            {children}
        </View>
    </View>
  );
}