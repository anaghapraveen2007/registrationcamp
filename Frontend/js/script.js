form.addEventListener("submit", (event) => {

    event.preventDefault();

    const allValid = Object.keys(rules)
        .map((id) => {
            return check(document.getElementById(id));
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
    const data = Object.fromEntries(
        new FormData(form).entries()
    );

    // Temporary: display registration data
    console.log("Registration data:", data);

    // Redirect to success page
    window.location.href = "success.html";
});