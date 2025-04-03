import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  TouchableOpacity,
} from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Button from "../../componentes/Button";


export default function Login({navigation}){
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView style={[globalStyles.container, Styles.container]}>
      <View style={Styles.containerImage}>
        <Image source={require("../../images/Logo.png")} style={Styles.logo} />
      </View>
      <Animated.View
        style={[
          Styles.containerInput,
          { opacity: opacity, transform: [{ translateY: offset.y }] },
        ]}
      >
        <TextInput
          style={Styles.input}
          placeholder="Emai"
          autoCorrect={false}
          onChange={() => {}}
        />
        <TextInput
          style={Styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChange={() => {}}
        />
          <Button page='Ocorrencias' navigation={navigation} text='Acessar' icon={null}/>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
