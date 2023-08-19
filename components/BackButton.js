import React from 'react';
import { TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton() {
  const navigation = useNavigation();

  const handlePress = () => {
      navigation.goBack();
  };


  return (
    <TouchableOpacity onPress={handlePress} style={styles.buttonStyle}>
      <Ionicons name="return-up-back-outline" size={45} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    buttonStyle: {
        left: "5%",
        top: "5%",
        position: 'absolute',
    },
    });



