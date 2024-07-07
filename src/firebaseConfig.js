// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAxExRrQc8NhWBVjnI4iQ9PIcJ44-lY370",
    authDomain: "cleanlif-81ae9.firebaseapp.com",
    projectId: "cleanlif-81ae9",
    storageBucket: "cleanlif-81ae9.appspot.com",
    messagingSenderId: "1017021521840",
    appId: "1:1017021521840:web:18935e499b1d8c0162c075"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Firebase config:', firebaseConfig);
console.log('Firebase Auth:', auth);
console.log('Firebase Firestore:', db);

export { auth, db };
