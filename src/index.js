import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBCb1n9HKzlLlRnxqM6TuMUHdWgtV6OMOU",
  authDomain: "cart-363db.firebaseapp.com",
  projectId: "cart-363db",
  storageBucket: "cart-363db.appspot.com",
  messagingSenderId: "716923089584",
  appId: "1:716923089584:web:da857df39a9b2963ff8175"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
