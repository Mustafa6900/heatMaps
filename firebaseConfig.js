import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBt47rd0Jx7grm8zKOv9h8BO4-ZnGHIbEQ",
  authDomain: "heatmap-5d18d.firebaseapp.com",
  projectId: "heatmap-5d18d",
  storageBucket: "heatmap-5d18d.appspot.com",
  messagingSenderId: "220485130929",
  appId: "1:220485130929:web:dabe0cad944371657ba090"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
export default app;