import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_KEY,
  authDomain: "fir-tutorial-f0724.firebaseapp.com",
  projectId: "fir-tutorial-f0724",
  storageBucket: "fir-tutorial-f0724.appspot.com",
  messagingSenderId: "867876276758",
  appId: "1:867876276758:web:fe434b3d6bf6391577c337",
  measurementId: "G-8QET3YQQZ5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
 