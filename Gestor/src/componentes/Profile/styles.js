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
    imageProfile: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: '#CCCCCC'
    },
    textProfile:{
        fontFamily:'Robote',
        fontWeight:'bold',
        fontSize: 24,
        marginLeft:10,
    },
});

export default styles