import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyB57Tw40SqP_T9AuK0HLRYeSdgot-ToUmM",
    authDomain: "kmitlfitnessapp.firebaseapp.com",
    databaseURL: "https://kmitlfitnessapp.firebaseio.com",
    projectId: "kmitlfitnessapp",
    storageBucket: "kmitlfitnessapp.appspot.com",
    messagingSenderId: "835863467660",
    appId: "1:835863467660:web:dad834fdf3886443b9cda9",
    measurementId: "G-TCR1JM1HLH"
 };
 firebase.initializeApp(config);
 export default firebase;