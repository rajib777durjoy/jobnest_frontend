// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFJOmyPApkgrLdqo3cbr9GK_vHpOXpM3E",
  authDomain: "jobnest-d3ea8.firebaseapp.com",
  projectId: "jobnest-d3ea8",
  storageBucket: "jobnest-d3ea8.firebasestorage.app",
  messagingSenderId: "575949357303",
  appId: "1:575949357303:web:04a9dc26e024060c37d3f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);