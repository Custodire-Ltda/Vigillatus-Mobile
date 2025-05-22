import { StyleSheet, Dimensions} from "react-native";

const { width } = Dimensions.get("window"); 
const logoSize = width * 0.4;

const styles = StyleSheet.create({
  logo:{
    width: logoSize,
    height: logoSize
  },
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",

  },
  containerInput:{
    width:"70%",
    height:"20%",
    gap:"15%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
  },
  
  inputPassword: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  
  toggleText: {
    color: "#007BFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
  input:{
    backgroundColor:"white",
    height:"28%",
    borderRadius:8,
    fontSize:18,
    paddingHorizontal: 10
  },
  containerImage:{
    height:"30%"
  }

});

export default styles;
