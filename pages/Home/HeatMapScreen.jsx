import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HeatMap = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heat Map</Text>
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
  },
});

export default HeatMap;
