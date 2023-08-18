import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './Home/ProfileScreen';
import HeatmapScreen from './Home/HeatMapScreen';
import { Ionicons } from '@expo/vector-icons'; // Expo Icons kullanmak için

const Tab = createBottomTabNavigator();

const Tabbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Heatmap') {
            iconName = focused ? 'map' : 'map-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        
  
      })} 
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Heatmap" component={HeatmapScreen} />
    </Tab.Navigator>
  );
};

export default Tabbar;
