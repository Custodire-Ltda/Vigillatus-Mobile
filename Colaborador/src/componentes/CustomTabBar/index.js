import { View, Text,TouchableOpacity, Platform , Dimensions } from "react-native";
import Styles from "./styles.js";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

export default function CustomTabBar({state, descriptors, navigation}) {

  const { width } = Dimensions.get("window"); 
  const iconSize = width * 0.075;

  return (
    <View style={Styles.container}>
      <View style={Styles.content}>
        {state.routes.map((route, index)=>{
            const {options} = descriptors[route.key];
            const isFocused = state.index === index;
            const onPress  = () => {
            const event = navigation.emit({
                type:'tabPress',
                target:route.key,
                canPreventDefault: true,
            });
            if(!isFocused && !event.defaultPrevent) {
                navigation.navigate({name: route.name, merge:true});
            }
            };
           return(
            <TouchableOpacity 
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={Styles.buttonTab}
            >
                <View>
                    <View style={[Styles.innerButtom, {backgroundColor: isFocused ? "#333333" : "transparent"}]}>
                        <FontAwesome6
                            name={options.tabBarIcon}
                            size={iconSize}
                            color="#A29F9F"
                        />
                    </View>
                </View>
            </TouchableOpacity>
           ) 
        })};
      </View>
    </View>
  );
}