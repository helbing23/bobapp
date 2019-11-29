import Firebase from 'firebase';
let firebaseconfig = {
    apiKey: "AIzaSyB21fRJNLbCA4dijLY6nmxAR2TrPsniQi8",
    authDomain: "bobgoa-34308.firebaseapp.com",
    databaseURL: "https://bobgoa-34308.firebaseio.com",
    projectId: "bobgoa-34308",
    storageBucket: "bobgoa-34308.appspot.com",
};
let app = Firebase.initializeApp(firebaseconfig);
export const db = app.database();