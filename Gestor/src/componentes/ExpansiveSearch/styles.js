import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width:60,
        height:60,
        backgroundColor:"#333333",
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
    },
    containerPressed:{
        flex:1,
        height:60,
        backgroundColor:"white",
        borderRadius:20,
        borderWidth:2,
        elevation:5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4,
        borderColor:"gray",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
    },
    input:{
        width:"80%",
        height:"100%",
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: 'bold',
    },
    body:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        margin:10,
        width:"100%",
    }
});

export default styles