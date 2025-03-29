import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: 'AIzaSyA7iRhlrgnn44g-NiDJCNTjIZpa0Xt7mY0',
    authDomain: 'flask-chat-9e635.firebaseapp.com',
    projectId: 'flask-chat-9e635',
    storageBucket: 'flask-chat-9e635.firebasestorage.app',
    messagingSenderId: '594505769024',
    appId: '1:594505769024:web:280db3b1e516f581ea7fa5',
    measurementId: 'G-YL8QV4KWW5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
