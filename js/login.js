import { getAuth , auth , signInWithEmailAndPassword,ref,onValue , database} from "./firebase.js"

// Refrences
const email = document.getElementById("inpEmail")
const pass = document.getElementById("inpPass")
const loginBtn = document.getElementById("loginBtn")

function logIn(){
    signInWithEmailAndPassword(auth, email.value, pass.value)
  .then((userCredential) => {
    const user = userCredential.user;
    location.href = "userHome.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: "error",
      text: `${errorMessage}`,
    });
  });
}
loginBtn.onclick = logIn


let toggleBtn = document.getElementById("toggleBtn")
let navbar = document.getElementById('navbarSupportedContent')


window.onkeyup = function () {
  if (event.key === "Escape") {
    toggleBtn.click()
  }
}
window.onclick = function (event) {
  const targetElement = event.target;
  const navbar = document.getElementById('navbarSupportedContent');
  const toggleBtn = document.getElementById('toggleBtn');
  if (navbar.classList.contains('show')) {
    toggleBtn.click();
  }
};