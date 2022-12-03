// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjkF8pl4BZvVXjX1nPcJobdhgU6nXcSn4",
  authDomain: "todo-6c0be.firebaseapp.com",
  projectId: "todo-6c0be",
  storageBucket: "todo-6c0be.appspot.com",
  messagingSenderId: "725169500453",
  appId: "1:725169500453:web:fd3f2fc307a86880726acc",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
