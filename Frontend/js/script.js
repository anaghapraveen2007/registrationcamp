const API_URL = import.meta.env.VITE_API_URL;

const form = document.getElementById("regForm");

// Validation rules
const rules = {

    fullName: (value) =>
        value.trim().length >= 2
            ? ""
            : "Enter your full name.",

    phone: (value) =>
        /^[0-9]{10}$/.test(value)
            ? ""
            : "Enter a 10-digit phone number.",

    department: (value) =>
        value
            ? ""
            : "Select your department.",

    year: (value) =>
        value
            ? ""
            : "Select your year of study.",

    parentName: (value) =>
        value.trim().length >= 2
            ? ""
            : "Enter your parent's name.",

    parentPhone: (value) =>
        /^[0-9]{10}$/.test(value)
            ? ""
            : "Enter a 10-digit contact number."

};


// Check individual field
function check(input) {

    const field =
        input.closest(".field");

    const message =
        rules[input.id](input.value);

    field.classList.toggle(
        "invalid",
        Boolean(message)
    );

    field.querySelector(
        ".error"
    ).textContent = message;

    return !message;
}


// Allow only numbers in phone fields
document
    .querySelectorAll('input[type="tel"]')
    .forEach((input) => {

        input.addEventListener(
            "input",
            () => {

                input.value =
                    input.value.replace(
                        /\D/g,
                        ""
                    );

            }
        );

    });


// Validate fields when user leaves them
Object.keys(rules).forEach((id) => {

    const input =
        document.getElementById(id);


    input.addEventListener(
        "blur",
        () => {
            check(input);
        }
    );


    input.addEventListener(
        "change",
        () => {
            check(input);
        }
    );

});


// Submit form
form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        // Validate all fields
        const allValid =
            Object.keys(rules)
                .map((id) => {

                    return check(
                        document.getElementById(id)
                    );

                })
                .every(Boolean);


        // Stop if validation fails
        if (!allValid) {

            form
                .querySelector(
                    ".invalid input, .invalid select"
                )
                ?.focus();

            return;
        }


        // Get form data
        const data =
            Object.fromEntries(
                new FormData(form).entries()
            );


        try {

            // Send data to backend
            const response =
                await fetch(
                    `${API_URL}/api/registrations`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(data),
                    }
                );


            const result =
                await response.json();


            // Backend returned an error
            if (!response.ok) {

                alert(
                    result.message ||
                    "Registration failed."
                );

                console.log(result);

                return;
            }


            // Registration successful
            window.location.href =
                "success.html";


        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to the server."
            );

        }

    }
);