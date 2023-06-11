// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCktJ47jo_riEi4gmAft7K0BkAGZHCrnPg",
    authDomain: "react-3835d.firebaseapp.com",
    projectId: "react-3835d",
    storageBucket: "react-3835d.appspot.com",
    messagingSenderId: "84566467503",
    appId: "1:84566467503:web:0172bc0bf05180f685855a",
    measurementId: "G-W1Z1PD7H2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase();
export const auth = getAuth();