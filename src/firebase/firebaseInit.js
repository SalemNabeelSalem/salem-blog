import firebase from "firebase/app";
import "firebase/firestore";

// web app's firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBMUM3d4NYTIMiCCejhd8flYijTQdP7Y4k",
  authDomain: "salemblog-b34ca.firebaseapp.com",
  projectId: "salemblog-b34ca",
  storageBucket: "salemblog-b34ca.appspot.com",
  messagingSenderId: "253140184077",
  appId: "1:253140184077:web:67ba7a02c142d91279f944",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
