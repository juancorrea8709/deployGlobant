import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiWQz3wQzfihHIgNsonXp-ni5qkB2Wpb0",
    authDomain: "app-cabletronics.firebaseapp.com",
    projectId: "app-cabletronics",
    storageBucket: "app-cabletronics.appspot.com",
    messagingSenderId: "964266558166",
    appId: "1:964266558166:web:67114d429f42c6f2913f77"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export {db, auth}