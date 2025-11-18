import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXAicmD51rYAqAoAiAlrbP7k_Zib6URCo",
  authDomain: "probuyecom.firebaseapp.com",
  projectId: "probuyecom",
  storageBucket: "probuyecom.firebasestorage.app",
  messagingSenderId: "1058603077465",
  appId: "1:1058603077465:web:6712c91c663bdf14f70648",
  measurementId: "G-8CGXFB8V7E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
