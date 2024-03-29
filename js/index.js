import { auth, onAuthStateChanged, signOut, database, set, ref, onValue, push } from "./firebase.js"

const addBookBtn1Home = document.getElementById('addBookBtn1Home')
if (addBookBtn1Home) {
  addBookBtn1Home.onclick = () => {
    addBookBtn1Home.setAttribute("data-bs-target", "#exampleModal")
    addBookBtn1Home.setAttribute("data-bs-toggle", "modal")
  }
}

const booksCard = document.getElementById("books")

onValue(ref(database, `users`), (snapshot) => {
  // console.log(snapshot.val());
  let users = Object.values(snapshot.val());
  // console.log("🚀 ~ onValue ~ users:", users)

  let userBooks = []
  let allBooks = []
  for (let i = 0; i < users.length; i++) {
    if (users[i].Books) { // Check if Books property exists and is not null/undefined
      let userBooks = Object.values(users[i].Books);
      allBooks = allBooks.concat(userBooks);
  } else {
      console.log("User", users[i], "does not have any books.");
  } // allBooks = allBooks.concat(userBooks);
  }
  console.log("🚀 ~ onValue ~ allBooks:", allBooks)
  booksCard.innerHTML = ""
  for (let i = 0; i < allBooks.length; i++) {
    if (booksCard) {
      
      booksCard.innerHTML += `<div class="col-12  col-sm-6 col-lg-4 my-3">
        <div class="card mb-3 shadow-lg   " >
          <div class="row g-0  ">
            <div class="col-md-6">
              <img src="${allBooks[i].image}" class="img-fluid rounded-start img-height w-100 " alt="...">
            </div>
            <div class="col-md-6 d-flex justify-content-center  align-items-center">
              <div class="card-body text-center" >
                <p class="card-title">${allBooks[i].title}</p>
                <p class="card-title">By: ${allBooks[i].author}</p>
                <p class="card-title">${allBooks[i].price}</p>
                <a href="${allBooks[i].bookURL}" class="card-link logo-color">Read Book!</a>
                <br>
                <button class=" btn mt-3 d-flex align-items-center  justify-content-center mx-auto cart-Btn"><i class="bi bi-cart-plus-fill fs-5 text-light fs-6 me-2 d-none d-lg-block"  ></i>Add to Cart</button>
              </div>

            </div>
          </div>
        </div>
      </div>`
    }

  }

})

const navUl = document.getElementById('nav-ul')
const navLoginBtn = document.getElementById('nav-login-btn')
// const cartBtn = document.getElementsById('cart-Btn')
// console.log("🚀 ~ cartBtn:", cartBtn)
const cart = document.getElementById('cart')
let index = 0

function attachCartButtonEventListeners(user) {
if(user){
  return new Promise((resolve, reject) => {
    const booksCard = document.getElementById("books");

    const handleClick = (event) => {
      const target = event.target;
      console.log(target);
      if (target.classList.contains('cart-Btn')) {
        console.log('hello');
        

        const userCartRef = ref(database, `users/${user.uid}/Cart`);
        const cartRef = push(userCartRef);
        const cartRefKey = cartRef.key;
        const cartData = {
          quantity: 1
        };

        set(ref(database, `users/${user.uid}/Cart/${cartRefKey}`), cartData)
          .then(() => {
            console.log("Book data set successfully");
          })
          .catch((error) => {
            console.error("Error setting book data:", error.message);
          });
      }
    };

    booksCard.addEventListener('click', handleClick);

    onValue(ref(database, `users/${user.uid}/Cart`), (snapshot) => {
      if(snapshot.val()){
      let cartQuantity = Object.values(snapshot.val());
      console.log("🚀 ~ onValue ~ cartQuantity:", cartQuantity)
      // console.log("🚀 ~ o-nValue ~ cartQuantity:", cartQuantity.length)
      index = 0
      for(let i=0; i < cartQuantity.length; i++){
        console.log(cartQuantity[i].quantity);
    
        index += cartQuantity[i].quantity
        
      }
      
      cart.innerHTML = `<i class="bi bi-cart-plus-fill fs-5 text-light "></i>
                <span id="cart-badge" class=" position-absolute top-0 start-100 translate-middle px-2 bg-danger border border-light rounded-circle">
                    <span class="badge-font">${index}</span>
                </span>`
      console.log(index);
      resolve();
    }
    });
  });
}
}

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      attachCartButtonEventListeners(user);
      if (navUl) {
        navUl.innerHTML += `<li class="nav-item me-4 mt-2 ">
        <a class="nav-link nav-anchor" href="./userHome.html#myCollection">My Account</a>
      </li>`
        navLoginBtn.setAttribute("href", "./userHome.html")
      }
    }else{
      booksCard.addEventListener('click', ()=>{
        Swal.fire({
          icon: "info",
          text: "Wish to buy books !",
          confirmButtonText: "Log In",
        });
      });
    }
    // ... (rest of your code)
  });
});   
   
   
   
    
    
    // console.log(user);



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