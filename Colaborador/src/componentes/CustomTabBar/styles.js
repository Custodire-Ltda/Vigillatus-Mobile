import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    },
    content:{
        flexDirection:"row",
        marginBottom:Platform.OS==='ios'? 38 : 24,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        bottom:10,
        backgroundColor:"#rgba(255,255,255,0.9)",
        height:"auto",
        gap:8,
        elevetion:100,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.2,
        shadowRadius:3.80,
        borderRadius:20,
    },
    buttonTab:{
        justifyContent:"center",
        alignItems:"center",
        padding:10,
    },
    innerButtom:{
         padding:7, 
         borderRadius:15,
    }
});

export default styles