import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Header from '../../components/Header';
import { collection, addDoc, onSnapshot } from 'firebase/firestore'; 
import { db } from '../../firebaseConfig';
import { useAuth } from '../Auth/AuthContext';
import MapView, { Marker, Callout } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';


const LOCATION_BACK_HEATMAP = 'background-location-task';

TaskManager.defineTask(LOCATION_BACK_HEATMAP, async ({ data, error }) => {
  if (error) {
    console.error('Error occurred:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log('Locations captured in background:', locations);

    // Background konumları Firestore' kaydet
    const location = locations[0];
    const userEmail = 'unknown'; 
    updateLocation(location.coords.latitude, location.coords.longitude, userEmail);
  }
});


const HeatMap = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const { user } = useAuth();
  const [userLocations, setUserLocations] = useState([]);

  
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Konum İzni',
          message: 'Uygulama konumunuzu kullanmak istiyor.',
          buttonPositive: 'Tamam',
          buttonNegative: 'İptal',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Konum izni verildi');
        // Konum izni verildiyse, konum bilgilerini alabilirsiniz.
      } else {
        console.log('Konum izni verilmedi');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (location) {
        // Firestore'a konum güncellemesini kaydet
        updateLocation(location.coords.latitude, location.coords.longitude, user.email);
      }
    }, 10000); 
    return () => clearInterval(interval);
  }, [location]);

    
  useEffect(() => {
    requestLocationPermission();
  }, []);



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


return (
    <View style={styles.container}>
      <Header title="Isı Haritası" />
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
 
            >
              <View style={styles.annotationContainer}>
                <View style={styles.annotationFill} />
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
