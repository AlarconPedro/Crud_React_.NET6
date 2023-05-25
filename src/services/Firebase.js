import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';	

const firebaseConfig = {
  apiKey: "AIzaSyDkmemXI4o9-j6uSAPRW3zMuQ6rB2QlvtA",
  authDomain: "soumaisfit-fadfd.firebaseapp.com",
  projectId: "soumaisfit-fadfd",
  storageBucket: "soumaisfit-fadfd.appspot.com",
  messagingSenderId: "521464317302",
  appId: "1:521464317302:web:9b5ac10ebd6d3245e1e657",
  measurementId: "G-C0J9B3K3W3"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

  }

  export default firebase;