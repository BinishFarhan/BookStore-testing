import { auth, createUserWithEmailAndPassword, database, ref, push, set } from "./firebase.js"

const firstName = document.getElementById("firstNameInp")
const lastName = document.getElementById("lastNameInp")
const email = document.getElementById("emailInp")
const pass = document.getElementById("passInp")
const signupBtn = document.getElementById("regbtn")

const dbRef = ref(database, "users")


function signUp() {
  console.log(firstName.value);
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      user.displayName = `${firstName.value} ${lastName.value}`
  //     // ...
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
      console.log("🚀 ~ signUp ~ errorMessage:", error.message)
    });
  location.href = "login.html"
}
signupBtn.onclick = signUp

