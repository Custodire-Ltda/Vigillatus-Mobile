import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import Styles from "./styles";
import globalStyles from "../../Styles/globalStyles";
import Button from "../../componentes/Button";
import { api } from "../../API/api";
import Gestor from "../../API/Gestor";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
  
    setLoading(true);
    
    try {
      const res = await api.post('/Gestor/Login', {
        email: email.trim(),
        senha: password,
      });

      if (res.data && res.data.gestor && res.data.token) {
        const gestorService = new Gestor();
        
        await gestorService.setToken(res.data.token);
        await gestorService.loggedGestor(res.data.gestor);

        navigation.navigate('Ocorrencias');
      } else {
        throw new Error('Dados incompletos na resposta');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Falha no login';
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[globalStyles.container, Styles.container]}
      behavior="padding"
    >
      <View style={Styles.containerImage}>
        <Image 
          source={require("../../images/Logo.png")} 
          style={Styles.logo} 
          resizeMode="contain"
        />
      </View>

      <Animated.View
        style={[
          Styles.containerInput,
          { 
            opacity: opacity, 
            transform: [{ translateY: offset.y }] 
          },
        ]}
      >

        <TextInput
          style={Styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />


      <View style={Styles.passwordContainer}>
        <TextInput
          style={Styles.inputPassword}
          placeholder="Senha"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={Styles.toggleText}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </Text>
        </TouchableOpacity>
      </View>
        <Button 
          text='Acessar'
          onPress={handleLogin}
          navigation={navigation}
        />
      </Animated.View>
    </KeyboardAvoidingView>
  );
}