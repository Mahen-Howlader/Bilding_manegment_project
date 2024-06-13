// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBgipcW4hZfn6zOmjFpveEOJ_Gq9Fer_8c",
//     authDomain: "building-management-6d596.firebaseapp.com",
//     projectId: "building-management-6d596",
//     storageBucket: "building-management-6d596.appspot.com",
//     messagingSenderId: "271796464454",
//     appId: "1:271796464454:web:9324d4e9a8e644b73ad347"

//     // apiKey: import.meta.env.VITE_APIKEY,
//     // authDomain: import.meta.env.VITE_AUTHDOMAIN,
//     // projectId: import.meta.env.VITE_PROJECTID,
//     // storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//     // messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//     // appId: import.meta.env.VITE_APPID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyA4EPs6Xin5G7Cklpvb88aWJlsAIRfkiY4",
    authDomain: "assignment-12-9a28a.firebaseapp.com",
    projectId: "assignment-12-9a28a",
    storageBucket: "assignment-12-9a28a.appspot.com",
    messagingSenderId: "446456956654",
    appId: "1:446456956654:web:c27350de99b61b4d36d5ff"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;