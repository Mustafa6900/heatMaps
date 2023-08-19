import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const Header = ({ title }) => {
  return (
    <View style={styles.container}>
          

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: "10%",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    letterSpacing: 0.4,
    marginTop: 40,
  },
});

export default Header;

