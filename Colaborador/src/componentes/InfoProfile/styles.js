import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const imageSize = width * 0.4;
const imageRadius = width * 1;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "65%",
  },
  teste: {
    width: "100%",
    alignItems: "center",
    height: "80%",
  },
  imageProfile: {
    borderRadius: imageRadius,
    borderWidth: 18,
    borderColor: "#FFFFFF",
    width: imageSize,
    height: imageSize,
    position: "absolute",
    top: -10,
    zIndex: 1,
  },
  bodyCollborator: {
    width: "90%",
    height: "auto",
    margin: "5%",
  },
  containerCollborator: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: "75%",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    justifyContent: "flex-end",
    top: imageSize / 2,
  },
  collaboratorData: {
    flexDirection: "row",
    margin: "5%",
    width: "90%",
  },
  containerExit: {
    width: "95%",
    alignItems:"flex-end"
  },
});

export default styles;
