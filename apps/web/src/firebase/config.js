// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 🔥 ESTA LÍNEA FALTABA

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtJcOeRTq0BbzHBtyLha0Tn_KPO0q2s9M",
  authDomain: "credicontrol-ai.firebaseapp.com",
  projectId: "credicontrol-ai",
  storageBucket: "credicontrol-ai.firebasestorage.app",
  messagingSenderId: "220256037086",
  appId: "1:220256037086:web:c60f4176d8cdaf49773a4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 EXPORT CORRECTO
export const db = getFirestore(app);