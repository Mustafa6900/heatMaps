import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); 
    };
  }, []);


  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      Alert.alert("Giriş Başarılı", "Hoşgeldiniz");
     
    } catch (error) {
      Alert.alert("Giriş Başarısız", "Lütfen bilgilerinizi kontrol ediniz");
    }
  };

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      Alert.alert("Kayıt Başarılı", "Hoşgeldiniz");
    } catch (error) {
      Alert.alert("Kayıt Başarısız", "Lütfen bilgilerinizi kontrol ediniz");
    }
}

  return (
    <AuthContext.Provider value={{ user, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};





