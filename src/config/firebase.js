// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM5p-R-GmoRE_NRnW87x-ZUgO19MRgUuU",
  authDomain: "desarrollo-b39a0.firebaseapp.com",
  projectId: "desarrollo-b39a0",
  storageBucket: "desarrollo-b39a0.appspot.com",
  messagingSenderId: "247814804816",
  appId: "1:247814804816:web:c377b3a63df298d5b40855"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//module.exports = firebase;