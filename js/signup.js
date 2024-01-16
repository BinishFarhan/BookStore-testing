import { auth, createUserWithEmailAndPassword, database, ref, push, set } from "./firebase.js"
console.log("🚀 ~ database:", database)

const firstName = document.getElementById("inpFirstName")
const lastName = document.getElementById("inpLastName")
const email = document.getElementById("inpEmail")
const pass = document.getElementById("inpPass")
const signupBtn = document.getElementById("signupBtn")

// const dbRef = ref(database, "users")


function signUp() {
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("🚀 ~ .then ~ user:", user)
      user.displayName = `${firstName.value} ${lastName.value}`
      // ...
      console.log("🚀 ~ .then ~ user.displayName:", user.email)
      
      set(ref(database, `users/${user.uid}`), {
        firstName: firstName.value,
        lastName: lastName.value
      })
      .then(() => {
        console.log("User data set successfully");
      })
      .catch((error) => {
        console.error("Error setting user data:", error.message);
      });
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("🚀 ~ signUp ~ errorMessage:", error)
      // ..
    });
  // location.href = "login.html"
}
signupBtn.onclick = signUp

