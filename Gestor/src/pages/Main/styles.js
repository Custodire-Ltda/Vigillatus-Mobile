import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      horizontalLine: {
        borderBottomColor: '#333333',
        borderBottomWidth: 1,
        width: "90%",
        height: 2,
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
      title: {
        color: "#333333",
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold",
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
      text: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: "bold",
        marginVertical: "3%",
      },
      bodyCard: {
        width: "100%",
        height: "25%",
        alignItems:"center"

      },
      body: {
        flex: 1,
        width: "90%",
        paddingTop: 10,
      },
      
      graphContainer: {
        flex: 1,
        width: '100%',
        marginTop: 10,
        height:"80%"
      },
      
      titleContainer: {
        width: "90%",
        marginLeft: "5%",
        marginBottom: 10,
      },
      
      horizontalLine: {
        borderBottomColor: '#333333',
        borderBottomWidth: 1,
        width: "90%",
        marginVertical: 15,
        alignSelf: 'center'
      },

});

export default styles