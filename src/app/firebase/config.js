
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBbTrFv95xSzQJ1tnmVHlEheS5ZBrSlHj0",
  authDomain: "al-hikma-6a2c1.firebaseapp.com",
  projectId: "al-hikma-6a2c1",
  storageBucket: "al-hikma-6a2c1.appspot.com",
  messagingSenderId: "553061471074",
  appId: "1:553061471074:web:ef1612cbc60fc8e421123b"
};




const app = initializeApp(firebaseConfig);

//AUTHENTICATION
export const auth = getAuth(app)


//FIRESTORE
export const db = getFirestore(app)