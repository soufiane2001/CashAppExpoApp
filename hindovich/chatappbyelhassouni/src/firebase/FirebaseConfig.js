import { initializeApp } from "firebase/app";
import { getAuth,initializeAuth,getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore} from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9V6XyTitN6CXO9XkbupgkPb0vrDPPuZg",
    authDomain: "realtima-auth.firebaseapp.com",
    databaseURL: "https://realtima-auth-default-rtdb.firebaseio.com",
    projectId: "realtima-auth",
    storageBucket: "realtima-auth.appspot.com",
    messagingSenderId: "95925375333",
    appId: "1:95925375333:web:320262a9381aacaded118c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db = getDatabase(app);