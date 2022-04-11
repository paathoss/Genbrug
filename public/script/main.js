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
// Set the configuration for your app
// TODO: Replace with your app's config object

  
  // Get a reference to the storage service, which is used to create references in your storage bucket
  
  

const auth = firebase.auth()
const fs = firebase.firestore()
const storage = firebase.storage()

//Links
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const loginCheck = user => {
    if (user){
        loggedInLinks.forEach(link => link.style.display = 'block')
        loggedOutLinks.forEach(link => link.style.display = 'none')
    }
    else{
        loggedInLinks.forEach(link => link.style.display = 'none')
        loggedOutLinks.forEach(link => link.style.display = 'block')
    }
}
var nombreUsuario = null;
var eCoinsUsuario = null;
var userPhoto = null;

//cargarDatosAFirebase
var chargeDataFirebase = (result) =>{
    var myUserId = auth.currentUser.uid;
    var docu = fs.collection('users').doc(myUserId)
    console.log(`Id del usuario: ${myUserId}`)

    docu.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data())
            nombreUsuario = doc.data().userName;
            eCoinsUsuario = doc.data().eCoins;
            userPhoto = auth.currentUser.photoURL;
        }
        else{
            if(result.user.displayName == null){
                result.user.displayName = `${fName} + ' ' + ${lName}`
            }
            return fs.collection('users').doc(result.user.uid).set({
                eCoins: 0,
                userName: result.user.displayName
            });   
        }
    })
}

//SignUp

const signUpForm = document.querySelector('#signUp-form')

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.querySelector('#signUp-email').value
    const password = document.querySelector('#signUp-password').value
    const fName = document.querySelector('#signUp-first-name').value
    const lName = document.querySelector('#signUp-last-name').value
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentential => {
            var myUserId = auth.currentUser.uid;
    var docu = fs.collection('users').doc(myUserId)
    console.log(`Id del usuario: ${myUserId}`)

    docu.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data())
            nombreUsuario = doc.data().userName;
            eCoinsUsuario = doc.data().eCoins;
        }
        else{
            nombrenombre = `${fName} ${lName}`
            return fs.collection('users').doc(userCredentential.user.uid).set({
                eCoins: 0,
                userName: nombrenombre
            });   
        }
    })
            //Clear the form
            signUpForm.reset() 

            //close the modal
            $('#signUpModal').modal('hide')
        })
})

//SignIn

const signInForm = document.querySelector('#login-form')

signInForm.addEventListener('submit', e => {
    e.preventDefault()
    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value
    console.log(email,password)
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredentential => {
            var myUserId = auth.currentUser.uid;
            var docu = fs.collection('users').doc(myUserId)
            console.log(`Id del usuario: ${myUserId}`)

            docu.get().then((doc) => {
                if (doc.exists) {
                    console.log(doc.data())
                    nombreUsuario = doc.data().userName;
                    eCoinsUsuario = doc.data().eCoins;
                }
                else{
                    nombrenombre = `${fName} ${lName}`
                    return fs.collection('users').doc(userCredentential.user.uid).set({
                        eCoins: 0,
                        userName: nombrenombre
                    });   
                }
            })
            //Clear the form
            signUpForm.reset() 

            //close the modal
            $('#signUpModal').modal('hide')
        })
})

//LogOut

const logOut = document.querySelector('#logOut')

logOut.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut().then(() => {
        console.log('sign out')
    })
})
//Google Login
const googleBtn = document.querySelector('#googleLogin-btn')
googleBtn.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
        .then(result => {
            console.log("google sig in")
            chargeDataFirebase(result);
        })
        //Clear the form
        signUpForm.reset()

        //close the modal
        $('#signUpModal').modal('hide')
        
})

//Facebook Login

const facebookBtn = document.querySelector('#facebookLogin-btn')
facebookBtn.addEventListener('click', e => {
    e.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider()
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('facebook sign in')
            
            chargeDataFirebase(result);
        })
        .catch(err => {
            console.log(err)
        })
})


//Posts

/* const postList = document.querySelector('.posts')
const setUpPosts = data => {
    if (data.length) {
        let html = ''
        data.forEach(doc => {
            const post = doc.data()
            console.log(post)
            const li = `
            <li class="list-group-item list-group-item-action">
                <h5>${post.title}</h5>
                <p>${post.description}</p>
            </li>
            `
            html += li
        });
        postList.innerHTML = html
    }
    else {
        postList.innerHTML = `
        <div class="container"><p class="text-center">Logeate para ver las publicaciones</p></div>
        `
    }
} */

//Events
//list for auth state changes

auth.onAuthStateChanged(user => {
    if (user) {
        console.log('auth: sign in')
        fs.collection('posts')
            .get()
            .then((snapshot) => {
              loginCheck(user)
                /* setUpPosts(snapshot.docs) */
            }) 
    }
    else {
      loginCheck(user)
      nombreUsuario = null;
      eCoinsUsuario = null;
      userPhoto = null;
    }
})