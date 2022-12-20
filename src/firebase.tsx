// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUI2hijo6QCIybMlWon1uZFqLNYiCbP3U",
  authDomain: "booksonlineupload.firebaseapp.com",
  projectId: "booksonlineupload",
  storageBucket: "booksonlineupload.appspot.com",
  messagingSenderId: "642632277395",
  appId: "1:642632277395:web:249d6cd9fb2a8b11761c66",
  measurementId: "G-6VHHPJHF2J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
