import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDb7WPq54MKTTFrDDZQGh3cHc3F74H_6jU",
    authDomain: "kailani-8567e.firebaseapp.com",
    projectId: "kailani-8567e",
    storageBucket: "kailani-8567e.appspot.com",
    messagingSenderId: "219839335114",
    appId: "1:219839335114:web:fa4a8cc98a722dc24c4233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;