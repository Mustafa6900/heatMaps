import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from './AuthContext';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Parolanın görünürlüğünü yönet

  const { signUp } = useAuth(); 

  const handleSignUp = async () => {
    if (password.length < 6) {
      Alert.alert('Şifreniz en az 6 karakter olmalıdır. \nLütfen tekrar deneyiniz.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Geçersiz e-posta adresi \nLütfen tekrar deneyiniz.');
      return;
    }
    signUp(email, password);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <Header title="Kayıt" />
      <BackButton/>
      <View style={styles.inputContainer}>
      <Text style={styles.title}>Üyelik İşlemleri</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordInput}>
        <TextInput
          style={styles.passwordTextInput}
          placeholder="Şifre"
          secureTextEntry={!showPassword} // Parola gizli mi?
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)} // Görünürlük durumunu tersine çevir
        >
          <Ionicons name={!showPassword ? 'eye-off' : 'eye'} size={18} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
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
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordTextInput: {
    flex: 1,
  },
  passwordToggle: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'white',
    width: '60%',
    padding: 10,
    borderRadius: 20,
    marginTop: "5%",
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RegisterScreen;
