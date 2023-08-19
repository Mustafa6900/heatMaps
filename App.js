import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './pages/Auth/AuthContext';
import AuthStack from './pages/Auth/AuthStack';
import app from './firebaseConfig';


const App = () => {
  
  return (
      
    <NavigationContainer>
      <AuthProvider>
        <AuthStack />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;