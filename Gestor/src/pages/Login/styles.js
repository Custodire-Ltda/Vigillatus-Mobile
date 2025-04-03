import { StyleSheet, Dimensions} from "react-native";

const { width } = Dimensions.get("window"); 
const logoSize = width * 0.4;

const styles = StyleSheet.create({
  logo:{
    width: logoSize,
    height: logoSize
  },
  container:{
    justifyContent:"center",
  },
  containerInput:{
    width:"70%",
    gap:"10%",
  },
  input:{
    backgroundColor:"white",
  },
  containerImage:{
    height:"30%"
  }

});

export default styles;
