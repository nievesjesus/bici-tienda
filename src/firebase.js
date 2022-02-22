// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import manual para agregar la funcion que obtiene la instancia de firestore
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcLzffv6R72RA0v_H4qXmdsgvHa-wQ9rg",
  authDomain: "coderhouse-bici-tienda.firebaseapp.com",
  projectId: "coderhouse-bici-tienda",
  storageBucket: "coderhouse-bici-tienda.appspot.com",
  messagingSenderId: "779232218368",
  appId: "1:779232218368:web:a1ff857eeb8e1f42d3b7e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportar la base de datos de firestore para usarla en la app
export const db = getFirestore(app);