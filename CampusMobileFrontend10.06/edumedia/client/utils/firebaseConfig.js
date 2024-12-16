import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCKJ2qvjnyy0eUjOfwor9Sa0A9lzT7WZl8",
  authDomain: "campus-90b17.firebaseapp.com",
  projectId: "campus-90b17",
  storageBucket: "campus-90b17.appspot.com",
  messagingSenderId: "938972454288",
  appId: "1:938972454288:android:8f3ba69e0b4950dd66e715",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
