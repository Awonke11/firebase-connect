import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp, getDocs, query } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"

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
const db = getFirestore(app);

// Get all the elements
const userIcon = document.querySelector(".user_icon")
const username = document.querySelector(".user_name")
const storyText = document.querySelector(".user_story")
const submitButton = document.querySelector(".submit_button")
const logoutButton = document.querySelector(".logout")
const displayContainer = document.querySelector(".display")

const getData = () => {
    const q = query(collection(db, "stories"))
        getDocs(q).then(data => {
            if (data.docs.length > 0) {
                displayContainer.innerHTML = ""
                data.forEach((doc) => {
                    const section = document.createElement("section")
                    section.classList.add("story")
                    section.innerHTML = `
                        <header class="story_header">
                            <div 
                                class="user_photo"
                                style="background-image: url(${doc.data()?.imagePhoto}); background-size: 'cover'"
                            ></div>
                            <h3 class="username">${doc.data()?.username}</h3>
                        </header>
                        <p class="story_text">${doc.data()?.story}</p>
                        <section class="story_footer">
                            <iconify-icon icon="uiw:date" class="date_icon"></iconify-icon>
                            <span class="date">${doc.data()?.date.toDate().toDateString()}</span>
                        </section>
                    `
                    displayContainer.appendChild(section)
                })
            }
        }).catch(error => {
            console.log(error)
        })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Setting the user values
        if (user.displayName != null) {
            username.value = user.displayName;
        }

        if (user.photoURL != null) {
            userIcon.style.backgroundImage = `url(${user.photoURL})`;
            userIcon.style.backgroundSize = "cover";
        }

        submitButton.addEventListener("click", (e) => {
            e.preventDefault()
            
            // Form Validation
            if (username.value.length === 0) {
                username.style.border = `1px solid rgb(207, 7, 7)`
                return
            } else {
                username.style.border = `1px solid rgb(136, 136, 136)`
            }

            if (storyText.value.length === 0) {
                storyText.style.border = `1px solid rgb(207, 7, 7)`
                return
            } else {
                storyText.style.border = `1px solid rgb(136, 136, 136)`
            }

            // Adding Story to database
            const storiesRef = collection(db, "stories")

            const dbData = {
                imagePhoto: (user.photoURL != null) ? user.photoURL : "",
                username: username.value,
                story: storyText.value,
                date: Timestamp.now()
            }

            addDoc(storiesRef, dbData).then(() => {
                alert("Your story has been added successfully")
                storyText.value = ""
                getData()
            }).catch((error) => {
                console.log(error)
                alert("Falied to add story")
            })
        })

        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();

            signOut(auth).then(() => {
                window.location.href = "/index.html"
            }).catch(error => {
                console.log(error)
                alert("Falied to Signout")
            })
        })

        getData()
    } else {
        alert("Unauthorized user, create account")
        window.location.href = "/index.html"
    }
})