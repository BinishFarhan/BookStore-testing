import { auth, onAuthStateChanged, signOut, database,set, ref, onValue, push } from "./firebase.js"
console.log("🚀 ~ database:", database)


//refrences
const addBookBtn = document.getElementById("addBookBtn1")
const modal = document.getElementById('exampleModal')
const signOutBtn = document.getElementById('SignOutBtn')
const header = document.getElementById('welcome')
// let userData;

// for books
const title = document.getElementById('titleInp')
const price = document.getElementById('priceInp')
const addBookModalBtn = document.getElementById('addBookModalBtn')
const BookCards = document.getElementById('BookCards')
onAuthStateChanged(auth, (user) => {
    if (user) {
        onValue(ref(database, `users/${user.uid}`), (snapshot) => {
            let books = Object.values(snapshot.val().Books);
            console.log("🚀 ~ onValue ~ books:", books)
            BookCards.innerHTML = ""
            for(let i = 0; i < books.length; i++){
                console.log(books[i].price);
                BookCards.innerHTML +=  `<h2>${books[i].title}</h2>
                <h2>${books[i].price}</h2> `
            }
            header.innerHTML = `Welcome ${snapshot.val().firstName} ${snapshot.val().lastName}`
            
            

        });
        const userBooksRef = ref(database, `users/${user.uid}/Books`);
        addBookModalBtn.onclick = () => {
            const newBookRef = push(userBooksRef);
            const newBookRefKey = newBookRef.key;
          
            const newBookData = {
              title: title.value,
              price: price.value
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
            location.href = "login.html"
        };
        const uid = user.email;
        console.log("🚀 ~ onAuthStateChanged ~ uid:", uid)
        addBookBtn.onclick = () => {
            if (user) {
                addBookBtn.setAttribute("data-bs-toggle", "modal")
                addBookBtn.setAttribute("data-bs-target", "#exampleModal")
                console.log("button click");
            }

        }
    } else {
        addBookBtn.onclick = () => {
            console.log("user not logged in");
        }

    }
    // userData = user
}


);
// setTimeout(() => {
//     console.log(userData);

// }, 2000)
