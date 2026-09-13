
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlgz3g6PWcALMPVaQiiPFBKON7JYO21dE",
  authDomain: "x-clone-2-5e13a.firebaseapp.com",
  projectId: "x-clone-2-5e13a",
  storageBucket: "x-clone-2-5e13a.firebasestorage.app",
  messagingSenderId: "29113549687",
  appId: "1:29113549687:web:e8c608bc8e9c02d556d772",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;