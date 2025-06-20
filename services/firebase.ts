// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnmLlc6jLMEljrzX1Fh4JpsKgNOPzh70o",
  authDomain: "ehk-project.firebaseapp.com",
  projectId: "ehk-project",
  storageBucket: "ehk-project.appspot.com",
  messagingSenderId: "1097940549393",
  appId: "1:1097940549393:web:d365c2c610b173108316b0",
  measurementId: "G-SC5J33BVER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };