import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const imageSize = width * 0.25;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        width:"100%",
    },
    box:{
        flexDirection: "row",
        alignItems: 'center',
        width:"90%",
        justifyContent: 'space-between', 
        padding:"3%"
    },
    imageBox:{
        flexDirection:"row", 
        width:"40%",
        justifyContent:"center",
    },
    image:{
        resizeMode:"contain",
        width:imageSize,
        height:imageSize
    },
    textBox:{
        width:"60%",
        alignItems:"center",
    }, 
});

export default styles