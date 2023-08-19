import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../Auth/AuthContext'; 

const ProfileScreen = ({ navigation }) => {
  const { signOutUser } = useAuth(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
   
      <View>
        <TouchableOpacity style={styles.button} onPress={signOutUser}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
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
