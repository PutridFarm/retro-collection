import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAn_p5uylEdwoCmcxyOifH5Tuu5lD8u9Yk",
    authDomain: "retro-collection-d1e64.firebaseapp.com",
    databaseURL: "https://retro-collection-d1e64.firebaseio.com",
    projectId: "retro-collection-d1e64",
    storageBucket: "retro-collection-d1e64.appspot.com",
    messagingSenderId: "183380534344"
  };
var fire = firebase.initializeApp(config);
export default fire;
