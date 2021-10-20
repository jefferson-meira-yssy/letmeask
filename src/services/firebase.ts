import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import  'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyAywYovhBIUQtAtoh5lG7pdx8-fj6k0Zbg",
    authDomain: "letmeask-aulas-e0e3f.firebaseapp.com",
    databaseURL: "https://letmeask-aulas-e0e3f-default-rtdb.firebaseio.com",
    projectId: "letmeask-aulas-e0e3f",
    storageBucket: "letmeask-aulas-e0e3f.appspot.com",
    messagingSenderId: "727053523608",
    appId: "1:727053523608:web:0087ca3716984c39920eed"
  };

  firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const database = firebase.database();
  
 export { firebase, auth, database}
  


