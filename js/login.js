import { getAuth , auth , signInWithEmailAndPassword,ref,onValue , database} from "./firebase.js"

// Refrences
const email = document.getElementById("inpEmail")
const pass = document.getElementById("inpPass")
const loginBtn = document.getElementById("loginBtn")

function logIn(){
    signInWithEmailAndPassword(auth, email.value, pass.value)
  .then((userCredential) => {
    // Signed in 
    
   
    const user = userCredential.user;
    console.log("🚀 ~ .then ~ user:", user)
    // console.log("🚀 ~ .then ~ user:", user.displayName)
        
    location.href = "userHome.html"
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("🚀 ~ logIn ~ errorMessage:", errorMessage)
  });

}
loginBtn.onclick = logIn