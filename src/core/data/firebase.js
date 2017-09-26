import * as firebase from 'firebase/app';

export const  config = firebase.initializeApp({
    apiKey: "AIzaSyAz25pqsklNn8Dy2hHN-ItL_4EKEzUYELw",
    authDomain: "thestyleofboxing.firebaseapp.com",
    databaseURL: "https://thestyleofboxing.firebaseio.com",
    projectId: "thestyleofboxing",
    storageBucket: "thestyleofboxing.appspot.com",
    messagingSenderId: "280024724304"
});
