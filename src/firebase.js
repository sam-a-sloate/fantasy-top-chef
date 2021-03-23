import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCECnMy461qlMuzgMzq3ta0jVVwz97mXY",
  authDomain: "fantasy-top-chef.firebaseapp.com",
  projectId: "fantasy-top-chef",
  storageBucket: "fantasy-top-chef.appspot.com",
  messagingSenderId: "1079376583752",
  appId: "1:1079376583752:web:eba8e40346d841fe1fcc7d",
  measurementId: "G-5Y47E8KPPK",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const leagueCollection = db.collection("leagueCollection");

// export utils/refs
export { db, auth, usersCollection, leagueCollection };
