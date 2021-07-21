// database/firebaseDb.js

import * as firebase from 'firebase';
// If you enabled Analytics in your project, add the Firebase SDK for Analytics

const firebaseConfig = {
    apiKey: "AIzaSyCkUUIG3C3MK0vUBqK-ZPPEFRXqqWQp6rc",
    authDomain: "covidpass-a499e.firebaseapp.com",
    databaseURL: "https://covidpass-a499e-default-rtdb.firebaseio.com",
    projectId: "covidpass-a499e",
    storageBucket: "covidpass-a499e.appspot.com",
    messagingSenderId: "896494839841",
    appId: "1:896494839841:web:ba2a006180adae41199b60",
    measurementId: "G-PM86Z7BL2S"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

var database = firebase.database();

export default firebase;