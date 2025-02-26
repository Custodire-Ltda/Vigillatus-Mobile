import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width:"95%",
        height:"auto"
    },
    profileBody:{
        flexDirection: "row",
        alignItems: 'center',
        margin:20,
        justifyContent:"space-between"
    },
    profile:{
        flexDirection: "row",
        alignItems: 'center',
    },
    imageProfile:{
        borderRadius:100,
    },
    textProfile:{
        fontFamily:'Robote',
        fontWeight:'bold',
        fontSize: 24,
        marginLeft:10,
    },
});

export default styles