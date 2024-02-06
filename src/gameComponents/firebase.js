import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC1NJisdUuWBDKFLKMqf6EXi33HWCTOKTo",
  authDomain: "tic-tac-toe-3bc8a.firebaseapp.com",
  projectId: "tic-tac-toe-3bc8a",
  storageBucket: "tic-tac-toe-3bc8a.appspot.com",
  messagingSenderId: "100596749387",
  appId: "1:100596749387:web:a39789febfafe8603be9ce",
  measurementId: "G-TKSRRDB3PM",
});

export default getFirestore(firebaseApp);
