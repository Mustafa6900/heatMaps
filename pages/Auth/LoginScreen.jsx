import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from './AuthContext'; 
import Header from '../../components/Header';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Parolanın görünürlüğünü yönet
  const { signIn } = useAuth();

  const handleLogin = async () => {
    signIn(email, password);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Header title="Giriş" />
      <View style={styles.inputContainer}>
      <Text style={styles.title}>Hoş Geldiniz</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Şifre"
          secureTextEntry={!isPasswordVisible} // Parola gizli mi?
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>  
          <Ionicons 
            name={isPasswordVisible ? 'eye' : 'eye-off'} // Görünürlük durumunu tersine çevir
            size={18}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonTextLogin}>Giriş</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonTextRegister}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
  
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
  },
  buttonLogin: {
    backgroundColor: 'white',
    width: '60%',
    padding: 10,
    borderRadius: 20,
    marginTop: '5%',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonTextLogin: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonTextRegister: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    marginTop: '5%',
  },
});

export default LoginScreen;
