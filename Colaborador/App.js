import { StyleSheet, Text, View, StatusBar  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CustomTabBar from "./src/componentes/CustomTabBar";
import Main from "./src/pages/Main";
import Ocorrencias from "./src/pages/Ocorrencias";
import Ocorrencia from "./src/pages/Ocorrencia";
import Report from "./src/pages/Report";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarShowLabel:false,
      tabBarStyle: {
        backgroundColor: "#FFFFFF",
        borderRadius:12,
        width:"50%",
      },
      tabBarActiveTintColor: "#333333",
      tabBarItemStyle: {
        borderRadius:10,
        margin:5,
      },
    }}
    tabBar={(props)=> <CustomTabBar {...props}/>}
  > 
      <Tab.Screen name="Main" component={Main} options={{ headerShown: false, tabBarIcon:"house-chimney"}} />
      <Tab.Screen name="Ocorrencias" component={Ocorrencias} options={{ headerShown: false, tabBarIcon:"helmet-safety" }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#333333", 
          },
          headerTintColor: "#FFFFFF", 
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Ocorrencias"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Ocorrencia" component={Ocorrencia}  />
        <Stack.Screen name="Report" component={Report}  />
      </Stack.Navigator>
      <StatusBar 
        backgroundColor="#333333"
        barStyle="ligth-content"
      />
    </NavigationContainer>
  );
}
