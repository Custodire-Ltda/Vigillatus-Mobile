import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      horizontalLine: {
        borderBottomColor: '#333333',
        borderBottomWidth: 1,
        width: "90%",
        height: 2,
      },
      bodyCollborator:{
        backgroundColor:'#FFFFFF',
        width:"90%",
        height:"40%",
        borderRadius:20,
      },
      containerInfo:{
        width:"100%",
        height:"92%",
        alignItems:"center",
        marginVertical:"5%",
      },
      touchable:{
        width:"100%",
        height:"100%",
        alignItems:"center"
      },
      title:{
        color: '#333333',
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: 'bold',
      },
      collaboratorData:{
        flexDirection:"row",
        margin:"5%",
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
       bodyText: {
        flex: 1, 
        justifyContent: "center",
        marginLeft: 10, 
      },
      image: {
        width: "40%", 
        height: "90%", 
        resizeMode: "contain",
      },
      text: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: "bold",
        marginVertical: "3%",
      },

});

export default styles