import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Header from '../../components/Header';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../Auth/AuthContext';


const HeatMap = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (location) {
        // Firestore'a konum güncellemesini kaydet
        updateLocation(location.coords.latitude, location.coords.longitude, user.email);
      }
    }, 10000); // 10 saniye
    return () => clearInterval(interval);
  }, [location]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
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

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const updateLocation = async (latitude, longitude,userEmail) => {
    try {
      await addDoc(collection(db, 'locations'), {
        userEmail,
        latitude,
        longitude,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

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
