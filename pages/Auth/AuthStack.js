import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './AuthContext';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ProfileScreen from '../Home/ProfileScreen';
import HeatMapScreen from '../Home/HeatMapScreen';
import Tabbar from '../Tabbar.jsx';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false,navigationBarHidden: true}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="HeatMap" component={HeatMapScreen} />
      <Stack.Screen name="Tabbar" component={Tabbar} />
    </Stack.Navigator>
  );
};

export default AuthStack;
