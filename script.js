var firebaseConfig = {
    apiKey: "AIzaSyCq6QJFIUrO7xmwmVSHGtyWl5eTGzR_53A",
    authDomain: "maze-c2979.firebaseapp.com",
    databaseURL: "https://maze-c2979-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "maze-c2979",
    storageBucket: "maze-c2979.appspot.com",
    messagingSenderId: "1068575863922",
    appId: "1:1068575863922:web:ceb015118e19b57b9bbeeb"
}

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var auth = firebase.auth();

auth.onAuthStateChanged(user => {
    if (user) {
        // hideAllElements(accountDetailsContainer, "My Account");
        // diplayAccountDetails(user);
        // isEmailVerified();
        console.log("signed in")
    }else hideAllElements(signInContainer, "Sign In");
});


const signInButton = document.getElementById("signin-btn");

// signUpButton.addEventListener("click", signup_verify);
signInButton.addEventListener("click", signInUser);
// signOutButton.addEventListener("click", () => {
//    if(confirm("Sign out of account?")) auth.signOut();
// });

function signInUser(){
    if(emailSignIn.value.trim()==""||passwordSignIn.value.trim()=="") signinAlert.textContent = "Enter all the given info";
    else{
        auth.signInWithEmailAndPassword(emailSignIn.value, passwordSignIn.value)
        .then(() => signinAlert.textContent = "")
        .catch((error) => {
            if(error.code = "auth/wrong-password"){
                signinAlert.textContent = "Password is invalid.";
                passwordSignIn.focus();
            }else signinAlert.textContent = error.message;
        });
    }
}

function hideAllElements(exemption, title){
    accountDetailsContainer.classList.toggle("hide", true);
    signInContainer.classList.toggle("hide", true);
    signUpContainer.classList.toggle("hide", true);
    forgotPasswordContainer.classList.toggle("hide", true);
    changePasswordContainer.classList.toggle("hide", true);
    exemption.classList.remove("hide");
    accountTitle.textContent = (title || "Account") + " - Predictions";
}