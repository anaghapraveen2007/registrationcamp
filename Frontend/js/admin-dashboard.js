const API_URL = import.meta.env.VITE_API_URL;

if (
    sessionStorage.getItem("adminLoggedIn") !== "true"
) {

    window.location.href = "login.html";

}

async function loadRegistrations() {

    const token =
        sessionStorage.getItem(
            "adminToken"
        );


    if (!token) {

        window.location.href =
            "login.html";

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/registrations`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


        if (response.status === 401) {

            sessionStorage.removeItem(
                "adminToken"
            );

            window.location.href =
                "login.html";

            return;
        }


        const data =
            await response.json();


        displayRegistrations(
            data.registrations
        );


        updateStatistics(
            data.registrations
        );


    } catch (error) {

        console.error(error);

    }

}


// Elements
const table =
    document.getElementById("registrationTable");

const total =
    document.getElementById("totalRegistrations");

const bvocCount =
    document.getElementById("bvocCount");

const bcaCount =
    document.getElementById("bcaCount");


// Display registrations
function displayRegistrations() {

    table.innerHTML = "";


    registrations.forEach(
        (registration, index) => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

        <td>${index + 1}</td>

        <td>${registration.fullName}</td>

        <td>${registration.phone}</td>

        <td>${registration.department}</td>

        <td>${registration.year}</td>

        <td>${registration.parentName}</td>

        <td>${registration.parentPhone}</td>

      `;


            table.appendChild(row);

        }
    );

}


// Statistics
function updateStatistics() {

    total.textContent =
        registrations.length;


    bvocCount.textContent =
        registrations.filter(
            registration =>
                registration.department === "BVoc SD"
        ).length;


    bcaCount.textContent =
        registrations.filter(
            registration =>
                registration.department === "BCA"
        ).length;

}


// Download CSV
document
    .getElementById("downloadButton")
    .addEventListener("click", () => {

        const headers = [
            "Student Name",
            "Phone",
            "Department",
            "Year",
            "Parent Name",
            "Parent Phone"
        ];


        const rows =
            registrations.map(registration => [

                registration.fullName,
                registration.phone,
                registration.department,
                registration.year,
                registration.parentName,
                registration.parentPhone

            ]);


        const csv = [

            headers,

            ...rows

        ]
            .map(row =>
                row
                    .map(value =>
                        `"${String(value).replaceAll('"', '""')}"`
                    )
                    .join(",")
            )
            .join("\n");


        const blob =
            new Blob(
                [csv],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "camp-registrations.csv";

        link.click();


        URL.revokeObjectURL(url);

    });


// Logout
document
    .getElementById("logoutButton")
    .addEventListener("click", () => {

        sessionStorage.removeItem(
            "adminLoggedIn"
        );

        window.location.href =
            "login.html";

    });


// Initial render
displayRegistrations();

updateStatistics();