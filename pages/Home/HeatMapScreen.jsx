import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import * as Location from 'expo-location';
import Header from '../../components/Header';
import { collection, addDoc, onSnapshot } from 'firebase/firestore'; 
import { db } from '../../firebaseConfig';
import { useAuth } from '../Auth/AuthContext';
import MapView, { Marker, Callout } from 'react-native-maps';

const HeatMap = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const { user } = useAuth();
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (location) {
        // Firestore'a konum güncellemesini kaydet
        updateLocation(location.coords.latitude, location.coords.longitude, user.email);
      }
    }, 20000); // 10 saniye
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
          console.error(error);
        }
      } else {
        console.error('Konum izni verilmedi');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const updateLocation = async (latitude, longitude, userEmail) => {
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


  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const userLocationsRef = collection(db, 'locations');
    const unsubscribe = onSnapshot(userLocationsRef, (querySnapshot) => {
      const newLocations = [];

      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const locationData = change.doc.data();
          newLocations.push({
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            userEmail: locationData.userEmail,
          });
        }
      });

      setUserLocations((prevLocations) => [...prevLocations, ...newLocations]);
    });

    return () => unsubscribe();
  }, []);

  
  const customMapStyle = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
        ],
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
                color: '#646464',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#f5f5f5',
            },
        ],
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#bdbdbd',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#eeeeee',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e5e5e5',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dadada',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e',
            },
        ],
    },
    {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e5e5e5',
            },
        ],
    },
    {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
            {
                color: '#eeeeee',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#c9c9c9',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e',
            },
        ],
    },
];

const getColorForUserEmail = (email) => {
  const hash = email.split('').reduce((acc, char) => {
    acc = (acc << 5) - acc + char.charCodeAt(0);
    return acc & acc;
  }, 0);

  const randomColor = `#${hash.toString(16).padStart(6, '0')}`;
  return randomColor;
};

return (
    <View style={styles.container}>
      <Header title="HeatMap" />
      <View style={styles.mapContainer}>
      <MapView style={styles.map}
        customMapStyle={customMapStyle} 
        initialRegion={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.122,
                longitudeDelta: 0.121,
              }
            : {
                latitude: 38.438525,
                longitude: 27.170515,
                latitudeDelta: 0.122,
                longitudeDelta: 0.121,
              }
        }
      >
          {userLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              pinColor={getColorForUserEmail(location.userEmail)}
            >
              <View style={styles.annotationContainer}>
                <View style={[styles.annotationFill, { backgroundColor: getColorForUserEmail(location.userEmail) }]} />
              </View>
              <Callout>
                <Text>User Location</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
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
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 15,
  },
  annotationFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});

export default HeatMap;
