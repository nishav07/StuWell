const signupBtn = document.querySelector("#signup");
const loginBtn = document.querySelector("#login");

const loginContainer = document.querySelector("#login-container");
const signUpContainer = document.querySelector("#signup-container");

signupBtn.addEventListener("click", () => {
    loginContainer.classList.add("hidden");
    signUpContainer.classList.remove("hidden");
})

loginBtn.addEventListener("click", () => {
    signUpContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden"); 
})