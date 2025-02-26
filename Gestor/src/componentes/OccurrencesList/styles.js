import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width:"90%",
        height:"100%",
    },
    subNavbar: {
        backgroundColor:'#333333',
        width:"100%",
        height: "auto",
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
    },
    textSubNavbar: {
        margin: "3%",
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: 'bold'
    },
    body:{
        backgroundColor:'#FFFFFF',
        width:"100%",
        height: "100%",
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
    },

});

export default styles