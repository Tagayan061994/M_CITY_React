import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjnAv-mYvZYGcoDjQUmxpJaQlgmP0kSXg",
  authDomain: "city-ac16f.firebaseapp.com",
  databaseURL: "https://city-ac16f.firebaseio.com",
  projectId: "city-ac16f",
  storageBucket: "city-ac16f.appspot.com",
  messagingSenderId: "250715479169",
  appId: "1:250715479169:web:50d85556ae8a40e2620180",
  measurementId: "G-L05NR9GXG0"
};

firebase.initializeApp(firebaseConfig);

//connecting with database
const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('clubs');
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref('teams');
// firebaseDB.ref("clubs").once("value").then((snapshot) => {
//     console.log(snapshot.val());
//   });

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB
}