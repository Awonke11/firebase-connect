// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyArgrQQIB65MdcsqDnZE8Vs-POBy5OwaUY",
  authDomain: "fir-connect-5dd25.firebaseapp.com",
  projectId: "fir-connect-5dd25",
  storageBucket: "fir-connect-5dd25.appspot.com",
  messagingSenderId: "426090292848",
  appId: "1:426090292848:web:e42f1f4cdd580882a5b6b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const googleButton = document.querySelector(".container");
const connectedContainer = document.querySelector(".connected");
const logoutButton = document.querySelector(".connected-button");

connectedContainer.style.display = "none";
googleButton.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(() => {
        alert("Signed in successfully")
        googleButton.style.display = "none";
        connectedContainer.style.display = "flex";
    }).catch((err) => {
        alert("Signed in unsuccessfully")
        googleButton.style.display = "flex";
        connectedContainer.style.display = "none";
    })
})

logoutButton.addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Signout successfully")
        connectedContainer.style.display = "none";
        googleButton.style.display = "flex";
    }).catch(() => {
        alert("Failed to logout")
        connectedContainer.style.display = "flex";
        googleButton.style.display = "none";
    })
})