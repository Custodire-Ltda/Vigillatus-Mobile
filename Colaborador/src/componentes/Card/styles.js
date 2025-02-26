import { StyleSheet,Dimensions } from "react-native";

const { width } = Dimensions.get("window"); 
const fontSize = width * 0.035;
const titleSize = width * 0.045;

const styles = StyleSheet.create({
    container:{
      width: 350,
      height: "100%",
      backgroundColor: "#4B7296",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
    horizontalLine: {
      borderBottomColor: "#FFFFFF",
      borderBottomWidth: 1,
      width: "90%",
      height: 2,
    },
    bodyOccurrence: {
      flexDirection: "row",
      width: "100%",
      height:"65%",
      alignItems: "center",
      justifyContent:"center",
    },
    title: {
      color: "#FFFFFF",
      fontSize: titleSize,
      fontFamily: "Roboto",
      fontWeight: "bold",
      marginBottom: "2%",
    },
    text: {
      color: "#FFFFFF",
      fontSize: fontSize,
      fontFamily: "Roboto",
      fontWeight: "bold",
      marginVertical: "3%",
    },
    bodyText: {
      marginLeft: "5%", 
      width:"40%"
    },
    image: {
      width: "40%", 
      height: "100%", 
      resizeMode: "contain",
    },
  });
  
  export default styles;
  