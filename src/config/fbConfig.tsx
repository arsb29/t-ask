import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAoJohbGa7XUSUgfp8AaJPuNJr2gcBi_38",
	authDomain: "taskapp29.firebaseapp.com",
	projectId: "taskapp29",
	storageBucket: "taskapp29.appspot.com",
	messagingSenderId: "489582825929",
	appId: "1:489582825929:web:b5d740727a8e71238e5818",
	measurementId: "G-5NLE59KNQW"
};

// Initialize Firebase
try {
	firebase.initializeApp(firebaseConfig);
	firebase.firestore();
	// console.log("Firebase Initialized");
} catch (err) {
	// console.log("Error Initializing Firebase");
}

export default firebase;