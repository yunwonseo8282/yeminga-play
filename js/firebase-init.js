import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBOwDbqvyezs4DTLNeOQDLdr_SwcfK20KY",
  authDomain: "yeminga-play.firebaseapp.com",
  projectId: "yeminga-play",
  storageBucket: "yeminga-play.firebasestorage.app",
  messagingSenderId: "548522537082",
  appId: "1:548522537082:web:16884b030c308a37dc8bc3",
  measurementId: "G-5RL7MBR191"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("Firebase 초기화 성공");
