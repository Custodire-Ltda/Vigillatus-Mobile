import { StyleSheet,Dimensions } from "react-native";

const { width } = Dimensions.get("window"); 
const fontSize = width * 0.038;

const styles = StyleSheet.create({
  textBox: {
    flexDirection: "row",
    width:"100%",
  },
  grayText: {
    color: "#B5B5B5",
    fontSize: fontSize,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  blackText: {
    color: "#000000",
    fontSize: fontSize,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

export default styles;
