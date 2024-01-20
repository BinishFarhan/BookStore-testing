import { auth, onAuthStateChanged, signOut, database, set, ref, onValue, push } from "./firebase.js"

const addBookBtn1Home = document.getElementById('addBookBtn1Home')
addBookBtn1Home.onclick = () => {
    addBookBtn1Home.setAttribute("data-bs-toggle", "modal")
    addBookBtn1Home.setAttribute("data-bs-target", "#exampleModal")

}

// console.log(database);
var booksCard = document.getElementById("books")
// // console.log("🚀 ~ books:", books)

onValue(ref(database, `users`), (snapshot) => {
    // console.log(snapshot.val());
    let users = Object.values(snapshot.val());
    // console.log("🚀 ~ onValue ~ users:", users)
    // let userBooks = []
    let allBooks = []
    for(let i = 0 ; i < users.length; i++){
        let userBooks = Object.values(users[i].Books);
        allBooks = allBooks.concat(userBooks);
    }
    for(let i = 0; i <allBooks.length; i++){
        console.log(allBooks[i]);
        booksCard.innerHTML += `<div class="col-12  col-sm-6 col-lg-4 my-3">
        <div class="card mb-3 shadow-lg   " >
          <div class="row g-0  ">
            <div class="col-md-6">
              <img src="${allBooks[i].image}" class="img-fluid rounded-start h-100 w-100 " alt="...">
            </div>
            <div class="col-md-6 d-flex justify-content-center  align-items-center">
              <div class="card-body text-center >
                <p class="card-title">${allBooks[i].title}</p>
                <p class="card-title">By: ${allBooks[i].author}</p>
                <p class="card-title">${allBooks[i].price}</p>
                <a href="${allBooks[i].bookURL}" class="card-link logo-color">Read Book!</a>
                <br>
                <a href="#" class="btn mt-3 d-flex align-items-center  justify-content-center  "><i class="bi bi-cart-plus-fill fs-5 text-light fs-6 me-2 d-none d-lg-block  "></i>Add to Cart</a>
              </div>

            </div>
          </div>
        </div>
      </div>`
        

        }
    }
)
    
    
//        // let users = Object.values(snapshot.val());
//     // let allBooks = []
//     // for(let i = 0 ; i < users.length; i++){
//     //     let userBooks = Object.values(users[i].Books);
//     //     allBooks = allBooks.concat(userBooks);
//     // }
//     // for(let i = 0; i <allBooks.length; i++){
//     //     console.log(allBooks[i]);
//     //     booksCard.innerHTML += `<h2>${allBooks[i].title}</h2>
//     //         <h2>${allBooks[i].price}</h2>`
//     //     }
//     // }
 
// // )
// // for(let i = 0; i < users.length; i++){
//     //     // userArr.push(users[i])
//                 //     console.log(users[i]);

//                 // }
//                 // for(let i = 0 ; i < userArr.length; i++){
//                     //     let books = Object.entries(userArr[i][1]);
//                     //     booksArr.push(books[0]);
//                     // }
//                     // // console.log("🚀 ~ onValue ~ booksArr:", booksArr)
//                     // for(let i = 0; i < booksArr.length; i++){
//                         //     let booksDet = Object.entries(booksArr[i][1]);
//                         //     bookDetail.push(booksDet)
//                         // } 
//                         // console.log("🚀 ~ onValue ~ bookDetail:", bookDetail)
//                         // // for(let i = 0; i < booksArr.length; i++){
//                             // //     let book = booksArr[i][1]
                            

//     // // console.log("🚀 ~ onValue ~ books:", books)
//     // let booksArr = Object.entries(books)
//     // // console.log("🚀 ~ onValue ~ booksArr:", booksArr)
//     // // header.innerHTML = `Welcome ${snapshot.val().firstName} ${snapshot.val().lastName} `

// // });

