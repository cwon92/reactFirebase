// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRYdW0Gk9b_HfKQ-aYWKZ6FHEUpxIDkas",
  authDomain: "fir-prac-88a9c.firebaseapp.com",
  projectId: "fir-prac-88a9c",
  storageBucket: "fir-prac-88a9c.appspot.com",
  messagingSenderId: "674003966766",
  appId: "1:674003966766:web:96c8856b9127836ddbf8bf",
  measurementId: "G-L7JYDZ8V3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);