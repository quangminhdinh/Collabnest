import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyAuSGOEEZxvIe3txTDlkb8QVO1Uah2ap3I",
    authDomain: "collabnest.firebaseapp.com",
    databaseURL: "https://collabnest.firebaseio.com",
    projectId: "collabnest",
    storageBucket: "collabnest.appspot.com",
    messagingSenderId: "471530065190",
    appId: "1:471530065190:web:56b45e5e7fca5f9e6fc5e7",
    measurementId: "G-B6ZTZWDREV"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
    }
  }
  export default Firebase;