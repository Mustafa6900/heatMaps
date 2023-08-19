import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Header from '../../components/Header';


const HeatMap = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  // konumu 10 saniyede bir güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(location);
    }, 5000); // 10 saniye
    return () => clearInterval(interval);
  }, [location]);

  // Konum izni isteme fonksiyonu
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('Konum izni verildi');
        try {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setLocation(location);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Konum izni verilmedi');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Konum izni isteme fonksiyonunu çağırın
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="HeatMap" />
      <View style={styles.mapContainer}>
    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default HeatMap;
