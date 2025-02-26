import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        width:"100%",
        height:"auto",
    },
    box:{
        flexDirection: "row",
        margin:20,
        alignItems: 'center',
        width:"90%",
    },
    imageBox:{
        width:"30%",
        alignItems:"center"
    },
    image:{
        resizeMode:"contain",
        borderRadius:100,
    }, 
     blackText: {
        color: '#000000', 
        fontSize:18,
        fontFamily:"Roboto",
        fontWeight: 'bold',
        margin:10,
      },
      horizontalLine: {
        borderBottomColor: '#B5B5B5',
        borderBottomWidth: 1,
        width: "95%",
        height: 1,
      },
});

export default styles