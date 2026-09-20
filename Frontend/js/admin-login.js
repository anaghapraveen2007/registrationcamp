const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;


    /*
      TEMPORARY LOGIN
  
      Do NOT use this for production.
      Authentication should eventually
      happen on the backend.
    */

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        sessionStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        window.location.href =
            "dashboard.html";

    } else {

        loginError.textContent =
            "Invalid username or password.";

    }

});