import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Originally API was kept in .env, but google's firebase allows for API key restrictions vis HTTP reffers
const firebaseConfig = {
	apiKey: "AIzaSyBp643bq34XtIN_A9nhNy8EaFqnrfIvlwo",
	authDomain: "tictactoe-871b2.firebaseapp.com",
	databaseURL: "https://tictactoe-871b2-default-rtdb.firebaseio.com",
	projectId: "tictactoe-871b2",
	storageBucket: "tictactoe-871b2.appspot.com",
	messagingSenderId: "1029173443938",
	appId: "1:1029173443938:web:42ae276e7bce04731f803b",
	measurementId: "G-FWZWF1HW38",
};

//initialize firebase
const app = initializeApp(firebaseConfig);

//intialize cloud firestore and get a reference to the service

export const db = getFirestore(app);
