import { StyleSheet,Dimensions } from "react-native";

const { width } = Dimensions.get("window"); 
const titleSize = width * 0.06;
const fontSize = width * 0.04;
const imageSize = width*0.5;

const styles = StyleSheet.create({
  body: {
    marginTop: "7%",
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: "80%",
    borderRadius: 20,
    marginVertical: "5%",
    alignItems: "center",
    paddingVertical: "10%",
  },
  title: {
    fontSize: titleSize,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  text: {
    fontSize: fontSize,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: "3%",
    marginLeft: "2%",
    width:"95%"
  },
  image: {
    width: imageSize,
    height: imageSize,
    resizeMode: "contain",
    marginVertical: "3%",
  },
  buttonSend: {
    backgroundColor: "#4B7296",
    width: "40%",
    height: "7%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonSend: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default styles;
