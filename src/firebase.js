// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsSwTvBvaCTRBnlRFVf2m0t24LPOkC294",
  authDomain: "qrfood-5d473.firebaseapp.com",
  projectId: "qrfood-5d473",
  databaseURL: 'qrfood-5d473-default-rtdb.firebaseio.com',
  storageBucket: "qrfood-5d473.appspot.com",
  messagingSenderId: "480016083178",
  appId: "1:480016083178:web:763e9a96ac765458804f93",
  measurementId: "G-T0D1YQL6E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app };
