import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler, TextInput } from 'react-native';
import { useAuth } from '../Auth/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

const ProfileScreen = ({ navigation }) => {
  const { signOutUser, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );
  const onBackPress = () => {
    Alert.alert(
      'Çıkış yapmak istiyor musunuz?',
      '',
      [
        { text: 'Hayır', style: 'cancel', onPress: () => {} },
        {
          text: 'Evet',
          onPress: () => {
            signOutUser();
          },
        },
      ],
      { cancelable: true }
    );
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Header title="Profil" />
      <View style={styles.information}>
      <Text style={styles.title}>E-mail: {user?.email}</Text>
      <View style={styles.passwordContainer}>
        <Text style={styles.passwordLabel}>Şifre:</Text>
        <TextInput
          style={styles.passwordInput}
          value={showPassword ? user?.password : '********'} 
          editable={false} 
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showPasswordButton}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={18}
            color="black"
            style={styles.showPasswordIcon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={onBackPress}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  information: {
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordLabel: {
    fontSize: 18,
    marginRight: 10,
    
  },
  passwordInput: {
    fontSize: 16,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    
  },
  showPasswordButton: {
    marginLeft: 10,
  },
  showPasswordIcon: {
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ProfileScreen;
