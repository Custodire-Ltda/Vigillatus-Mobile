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
        justifyContent: 'space-between',
    },
    imageBox:{
        flexDirection:"row", 
        width:"40%"
    },
    image:{
        resizeMode:"contain",
        width:100,
    },
    textBox:{
        flexDirection:"row",
        justifyContent: 'space-between', 
        marginBottom: 5,
        width:"75%"
    }, 
     grayText: {
        color: '#B5B5B5', 
        fontSize:18,
        fontFamily:"Roboto",
         fontWeight: 'bold'
      },
     blackText: {
        color: '#000000', 
        fontSize:18,
        fontFamily:"Roboto",
        fontWeight: 'bold'
      },
      horizontalLine: {
        borderBottomColor: '#B5B5B5',
        borderBottomWidth: 1,
        width: "95%",
        height: 1,
      },
});

export default styles