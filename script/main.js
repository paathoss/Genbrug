// var punto = document.getElementsByClassName('.gm-style img')

// if (punto) {
//     console.log("patata")
// }

var cargarPagina = (id) => {
    document.getElementById("homePage").style.display = "none"
    document.getElementById("estacionesPage").style.display = "none"
    document.getElementById("guiaPage").style.display = "none"
    document.getElementById("aboutPage").style.display = "none"
    document.getElementById("contactPage").style.display = "none"
    document.getElementById(id).style.display = "block"
  }
  cargarPagina("homePage")

//   // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA24jqhiEc50d-BN1BBUrcachEdkBxZkX4",
//   authDomain: "genbrug-1ff7a.firebaseapp.com",
//   projectId: "genbrug-1ff7a",
//   storageBucket: "genbrug-1ff7a.appspot.com",
//   messagingSenderId: "744418506580",
//   appId: "1:744418506580:web:ac0dabe0db183b22493ac1",
//   measurementId: "G-EN6PJPPZSL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);