// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBwYIF16HrP9vsED5oXWwlbZd1uk-QB-H0",
	authDomain: "progresstracker-f3988.firebaseapp.com",
	projectId: "progresstracker-f3988",
	storageBucket: "progresstracker-f3988.firebasestorage.app",
	messagingSenderId: "122551495157",
	appId: "1:122551495157:web:4fe4be78fc9f00418a58bc",
	measurementId: "G-VDM0MDSEQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Đây là dòng bạn cần để export `db`
export const db = getFirestore(app);
