import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDc2__0zuXEomkgvLJqDiqoU8cbBwSH3ro",
  authDomain: "gramai-85795.firebaseapp.com",
  projectId: "gramai-85795",
  storageBucket: "gramai-85795.appspot.com",
  messagingSenderId: "379498691284",
  appId: "1:379498691284:web:2a66c2835b774ac2569941",
  measurementId: "G-D13MTCXDYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Setup Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Google Sign-In Function
const doSignInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In Successful:", result);
    return result;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    throw error;
  }
};

export { app, auth, doSignInWithGoogle };
  