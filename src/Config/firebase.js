// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage"


// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBfK-V8-uhoaZqQv1neGkwvtALV-toesXA",
    authDomain: "aloha-money.firebaseapp.com",
    projectId: "aloha-money",
    storageBucket: "aloha-money.appspot.com",
    messagingSenderId: "509062754311",
    appId: "1:509062754311:web:885934818f6c32759bfaa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const faceBookAuthProvider = new FacebookAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();
export const storage = getStorage(app)
export default app;