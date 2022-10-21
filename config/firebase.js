import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYZuwAyjmIT0MNgUmRHdCJ9qvRDAGytmc",

  authDomain: "crwn-clothing-a59ab.firebaseapp.com",

  databaseURL: "https://crwn-clothing-a59ab.firebaseio.com",

  projectId: "crwn-clothing-a59ab",

  storageBucket: "crwn-clothing-a59ab.appspot.com",

  messagingSenderId: "418535846487",

  appId: "1:418535846487:web:16718c3946ec5fba9d6912",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
