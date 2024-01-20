import { auth, onAuthStateChanged, signOut, database, set, ref, onValue, push } from "./firebase.js"
console.log("🚀 ~ database:", database)


//refrences
const addBookBtn = document.getElementById("addBookBtn1")
console.log("🚀 ~ addBookBtn:", addBookBtn)

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
onAuthStateChanged(auth, (user) => {
    if (user) {
        
        
        onValue(ref(database, `users/${user.uid}`), (snapshot) => {
            header.innerHTML = `<span class="logo-color">Welcome</span> ${snapshot.val().firstName.charAt(0).toUpperCase()}${snapshot.val().firstName.slice(1)} ${snapshot.val().lastName.charAt(0).toUpperCase()}${snapshot.val().lastName.slice(1)}`
            let books = Object.values(snapshot.val().Books);
            console.log("🚀 ~ onValue ~ books:", books)
            BookCards.innerHTML = ""
            for (let i = 0; i < books.length; i++) {
                console.log(books[i].price);
                BookCards.innerHTML += `<div class="col-12  col-sm-6 col-lg-4 my-3">
                <div class="card mb-3 shadow-lg  " style="max-width: 540px;">
                  <div class="row g-0">
                    <div class="col-md-6">
                      <img src="${books[i].image}" class="img-fluid rounded-start h-100 w-100 " alt="...">
                    </div>
                    <div class="col-md-6 d-flex justify-content-center  align-items-center">
                      <div class="card-body">
                        <p class="card-title">${books[i].title}</p>
                        <p class="card-title">By: ${books[i].author}</p>
                        <p class="card-title">${books[i].price}</p>
                        <a href="${books[i].bookURL}" class="card-link logo-color">Read Book!</a>
                        <br>
                        <a href="#" class="btn mt-3"><i class="bi bi-cart-plus-fill fs-5 text-light fs-6 me-3"></i>Add to Cart</a>
                      </div>
      
                    </div>
                  </div>
                </div>
              </div>`
               
            }



        });
        const userBooksRef = ref(database, `users/${user.uid}/Books`);
        addBookModalBtn.onclick = () => {
            const newBookRef = push(userBooksRef);
            const newBookRefKey = newBookRef.key;

            const newBookData = {
                title: title.value,
                price: price.value,
                author: author.value,
                image: image.value,
                bookURL: bookURL.value

                // Add other book properties as needed
            };

            set(ref(database, `users/${user.uid}/Books/${newBookRefKey}`), newBookData)
                .then(() => {
                    console.log("Book data set successfully");
                })
                .catch((error) => {
                    console.error("Error setting book data:", error.message);
                });
        };
        signOutBtn.onclick = () => {
            signOut(auth)
            console.log("user sign out successfull");
            location.href = "index.html"
        };
        // const email = user.email;
        // console.log("🚀 ~ onAuthStateChanged ~ uid:", email)
        addBookBtn.onclick = () => {
            if (user) {
              title = ""
              price= ""
              author= ""
              image= ""
              bookURL= ""
                addBookBtn.setAttribute("data-bs-toggle", "modal")
                addBookBtn.setAttribute("data-bs-target", "#exampleModal")
                console.log("button click");
            }

        }
    }
    // userData = user
}


);
// setTimeout(() => {
//     console.log(userData);

// }, 2000)
