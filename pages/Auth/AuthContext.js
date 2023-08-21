import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigation = useNavigation();

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
      const { email: userEmail } = userCredential.user;
  
      setUser({
        email: userEmail,
        password: password,
      });
  
      Alert.alert("Giriş Başarılı", "Hoşgeldiniz");
      navigation.navigate("Tabbar");
    } catch (error) {
      Alert.alert("Giriş Başarısız", "Lütfen bilgilerinizi kontrol ediniz");
    }
  };
  

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user,password);
      Alert.alert("Kayıt Başarılı", "Hoşgeldiniz");
      navigation.navigate("Tabbar");
    } catch (error) {
      Alert.alert("Kayıt Başarısız", "Lütfen bilgilerinizi kontrol ediniz");
    }
}

const signOutUser = async () => {
  try {
    await signOut(auth);
    setUser(null);
    Alert.alert("Çıkış Başarılı", "Tekrar görüşmek üzere");
    navigation.navigate("Login"); 
  } catch (error) {
    Alert.alert("Çıkış Hatası", "Bir hata oluştu. Lütfen tekrar deneyiniz.");
    console.error(error);
  }
};

  return (
    <AuthContext.Provider value={{ user,signIn, signUp, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};





