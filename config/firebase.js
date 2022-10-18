import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYZuwAyjmIT0MNgUmRHdCJ9qvRDAGytmc",

  authDomain: "crwn-clothing-a59ab.firebaseapp.com",

  databaseURL: "https://crwn-clothing-a59ab.firebaseio.com",

  projectId: "crwn-clothing-a59ab",

  storageBucket: "crwn-clothing-a59ab.appspot.com",

  messagingSenderId: "418535846487",

  appId: "1:418535846487:web:16718c3946ec5fba9d6912",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
