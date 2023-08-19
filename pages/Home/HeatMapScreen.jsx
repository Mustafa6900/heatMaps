import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../../components/Header';
const HeatMap = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Header title="HeatMap" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HeatMap;
