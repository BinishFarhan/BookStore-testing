// import { auth, onAuthStateChanged, signOut, database, set, ref, onValue, push } from "./firebase.js"

// const addBookBtn1Home = document.getElementById('addBookBtn1Home')
// addBookBtn1Home.onclick = () => {
//     addBookBtn1Home.setAttribute("data-bs-toggle", "modal")
//     addBookBtn1Home.setAttribute("data-bs-target", "#exampleModal")

// }

// console.log(database);
// var booksCard = document.getElementById("books")
// // console.log("🚀 ~ books:", books)

// onValue(ref(database, `users`), (snapshot) => {
//     let users = Object.values(snapshot.val());
//     // let userBooks = []
//     let allBooks = []
//     for(let i = 0 ; i < users.length; i++){
//         let userBooks = Object.values(users[i].Books);
//         allBooks = allBooks.concat(userBooks);
//     }
//     for(let i = 0; i <allBooks.length; i++){
//         console.log(allBooks[i]);
//         booksCard.innerHTML += `<h2>${allBooks[i].title}</h2>
//             <h2>${allBooks[i].price}</h2>`
//         }
//     }
// )
    
    
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
