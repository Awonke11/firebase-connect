import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD1ZqsN6iy7ZSu5XIsdiVWibyzOCCFrx48",
    authDomain: "stories-a21bc.firebaseapp.com",
    projectId: "stories-a21bc",
    storageBucket: "stories-a21bc.appspot.com",
    messagingSenderId: "198542325082",
    appId: "1:198542325082:web:d030bd2d532f35aabe6f63",
    measurementId: "G-Z54MV2JB0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Getting the elements
const emailInput = document.querySelector("#user_email")
const emailError = document.querySelector("#email_error")
const passwordInput = document.querySelector("#user_password")
const passwordError = document.querySelector("#password_error")
const formButton = document.querySelector(".submit_button")
const googleButton = document.querySelector(".google_button")

formButton.addEventListener("click", (e) => {
    e.preventDefault()

    // Form Validation
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]*$/;
    if (!emailInput.value.match(validRegex)) {
        emailError.innerText = "Enter a valid email"
        return
    }
    emailError.innerText = ""

    if (passwordInput.value.toString().length < 5) {
        passwordError.innerText = "Password length must be greater than 5"
        return
    }
    passwordError.innerText = ""

    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value).then((user) => {
        window.location.href = "/home.html"
    }).catch((error) => {
        alert("User not created")
        console.log(error)
    })
})

googleButton.addEventListener("click",  (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((user) => {
        window.location.href = "/home.html"
    }).catch(error => {
        alert("Not signed in")
        console.log(error)
    })
})