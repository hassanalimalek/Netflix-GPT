// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAQvQ4TSJ-fcHCPL3W5q6Z_lpbaYkT1zFQ',
  authDomain: 'netflixgpt-22820.firebaseapp.com',
  projectId: 'netflixgpt-22820',
  storageBucket: 'netflixgpt-22820.appspot.com',
  messagingSenderId: '978465155380',
  appId: '1:978465155380:web:1d26a0c65d9cd26aca5d61',
  measurementId: 'G-C1FEYHWVKH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
