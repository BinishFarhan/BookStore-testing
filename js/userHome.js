import { auth, onAuthStateChanged, signOut, database, set, ref, onValue, push } from "./firebase.js"


//refrences
const addBookBtn = document.getElementById("addBookBtn1")

const modal = document.getElementById('exampleModal')
const signOutBtn = document.getElementById('SignOutBtn')
const header = document.getElementById('welcome')
// let userData;

// for books
let title = document.getElementById('titleInp')
let price = document.getElementById('priceInp')
let author = document.getElementById('authorInp')
let image = document.getElementById('imageInp')
let bookURL = document.getElementById('readInp')

const addBookModalBtn = document.getElementById('addBookModalBtn')
const BookCards = document.getElementById('BookCards')
const spinner = document.getElementById('spinner')
const mainHeading = document.getElementById("mainHeading")
const footer = document.getElementById('footer')
function clearInputFields() {
  title.value = ""
  price.value = ""
  author.value = ""
  image.value = ""
  bookURL.value = ""
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("hello");
    onValue(ref(database, `users/${user.uid}`), (snapshot) => {
console.log(snapshot.val());
      header.innerHTML = `<span class="logo-color">Welcome</span> ${snapshot.val().firstName.charAt(0).toUpperCase()}${snapshot.val().firstName.slice(1)} ${snapshot.val().lastName.charAt(0).toUpperCase()}${snapshot.val().lastName.slice(1)}`
      spinner.style.display = "none"
      mainHeading.innerHTML = ` <h3 class="text-center ">
                                  Your <span class="logo-color">Bookshelf</span> , 
                                  Your <span class="logo-color">World</span>
                                </h3>`
      footer.innerHTML = `<div class=" w-100 footer text-light d-flex justify-content-center align-content-center   ">
      <p class="h-25 my-auto footer-font">InkVista © 2024. ALL RIGHTS RESERVED</p>
      </div>`
      if(snapshot.val().Books){
      let books = Object.values(snapshot.val().Books);
      BookCards.innerHTML = ""
      for (let i = 0; i < books.length; i++) {
        console.log(books[i].price);
        BookCards.innerHTML += `<div class="col-12  col-sm-6 col-lg-4 my-3">
                <div class="card mb-3 shadow-lg " style="max-width: 540px;">
                  <div class="row g-0">
                    <div class="col-md-6">
                      <img src="${books[i].image}" class="img-fluid rounded-start img-height w-100 " alt="...">
                    </div>
                    <div class="col-md-6 d-flex justify-content-center  align-items-center">
                      <div class="card-body text-center">
                        <p class="card-title">${books[i].title}</p>
                        <p class="card-title">By: ${books[i].author}</p>
                        <p class="card-title">${books[i].price}</p>
                        <a href="${books[i].bookURL}" class="card-link logo-color">Read Book!</a>
                        <br>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>`
      }
    }else{
      BookCards.innerHTML = `<h3 class="text-center ">No books to show</h3>`

    }
    

  });
    const userBooksRef = ref(database, `users/${user.uid}/Books`);
    addBookModalBtn.onclick = () => {
      if(title.value && price.value && author.value && image.value ){

      console.log("addbook buttonm");
      const newBookRef = push(userBooksRef);
      const newBookRefKey = newBookRef.key;
      const newBookData = {
        title: title.value,
        price: price.value,
        author: author.value,
        image: image.value,
        bookURL: bookURL.value
      };
      console.log("🚀 ~ onAuthStateChanged ~ newBookData:", newBookData)
      set(ref(database, `users/${user.uid}/Books/${newBookRefKey}`), newBookData)
        .then(() => {
          console.log("Book data set successfully");
        })
        .catch((error) => {
          console.error("Error setting book data:", error.message);
        });
        clearInputFields()
      }else{

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please complete all required fields before proceeding.",
        });
        document.getElementById('exampleModal').style.display = "block"
        document.getElementById('closeBtn').onclick = ()=> {
          document.getElementById('exampleModal').style.display = "none"
          clearInputFields()
        }
        
      }

    };
    signOutBtn.onclick = () => {
      console.log("helo");
      signOut(auth)
      console.log("user sign out successfull");
      location.href = "index.html"
    };

    addBookBtn.onclick = () => {
      if (user) {
        addBookBtn.setAttribute("data-bs-toggle", "modal")
        addBookBtn.setAttribute("data-bs-target", "#exampleModal")
        console.log("button click");

      }
    }
  } else {
    console.log("not working");
  }
})

// userData = user


onAuthStateChanged(auth, (user) => {
  if (user) {
    onValue(ref(database, `users/${user.uid}/Cart`), (snapshot) => {
      let cartQuantity = Object.values(snapshot.val());
      // console.log("🚀 ~ o-nValue ~ cartQuantity:", cartQuantity.length)
      let index = 0
      for (let i = 0; i < cartQuantity.length; i++) {
        console.log(cartQuantity[i].quantity);
        index += cartQuantity[i].quantity
      }
      cart.innerHTML = `<i class="bi bi-cart-plus-fill fs-5 text-light "></i>
            <span id="cart-badge" class=" position-absolute top-0 start-100 translate-middle px-2 bg-danger border border-light rounded-circle">
                <span class="badge-font">${index}</span>
            </span>`
    })
  }
})



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