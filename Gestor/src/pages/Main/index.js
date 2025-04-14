import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Profile from "../../componentes/Profile";
import GraphComponent from "../../componentes/Graphic"; // Importa o componente de gráfico
import { fetchOccurrencesData } from "../../API/api";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

export default function Main({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Profile page='Login' navigation={navigation} exit={<FontAwesome6 name="arrow-right-from-bracket" size={32} />} />
      <View style={Styles.horizontalLine} />
      <View style={Styles.body}>
        <View style={{ alignItems: "start", width: "90%", margin: "2%" }}>
          <Text style={Styles.title}> Últimas Ocorrências:</Text>
        </View>

        <GraphComponent />
      </View>
    </View>
  );
}
