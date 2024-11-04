import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "e-wallet-5e904.firebaseapp.com",
    databaseURL: "https://e-wallet-5e904-default-rtdb.firebaseio.com",
    projectId: "e-wallet-5e904",
    storageBucket: "e-wallet-5e904.appspot.com",
    messagingSenderId: "251171027165",
    appId: "1:251171027165:web:fe1ff055dcec0181120334",
    measurementId: "G-M8R6YT4EET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();