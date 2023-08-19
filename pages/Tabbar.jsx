import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './Home/ProfileScreen';
import HeatmapScreen from './Home/HeatMapScreen';
import { Ionicons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

const Tabbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Heatmap') {
            iconName = focused ? 'map' : 'map-outline';
          }

          return <Ionicons name={iconName} size={30} color={"black"} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
      })} 
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Heatmap" component={HeatmapScreen} />
    </Tab.Navigator>
  );
};

export default Tabbar;
