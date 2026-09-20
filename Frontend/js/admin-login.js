const API_URL = import.meta.env.VITE_API_URL;
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        try {

            const response =
                await fetch(
                    `${API_URL}/api/auth/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            username,
                            password,
                        }),
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                loginError.textContent =
                    result.message;

                return;
            }


            sessionStorage.setItem(
                "adminToken",
                result.token
            );


            window.location.href =
                "dashboard.html";


        } catch (error) {

            console.error(error);

            loginError.textContent =
                "Unable to connect to server.";

        }

    }
);