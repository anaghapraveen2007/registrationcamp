const API_URL = import.meta.env.VITE_API_URL;

const token = sessionStorage.getItem("adminToken");

if (!token) {
    window.location.href = "./login.html";
}

// Elements
const table = document.getElementById("registrationTable");
const total = document.getElementById("totalRegistrations");
const bvocCount = document.getElementById("bvocCount");
const bcaCount = document.getElementById("bcaCount");

const downloadButton =
    document.getElementById("downloadButton");

const logoutButton =
    document.getElementById("logoutButton");

// Store registrations globally
let registrations = [];


// Load registrations
async function loadRegistrations() {

    try {

        const response = await fetch(
            `${API_URL}/api/registrations`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 401) {

            sessionStorage.removeItem("adminToken");

            window.location.href = "./login.html";

            return;
        }

        if (!response.ok) {

            throw new Error(
                `Failed to load registrations: ${response.status}`
            );

        }

        const data = await response.json();

        registrations = data.registrations || [];

        displayRegistrations();

        updateStatistics();

    } catch (error) {

        console.error(
            "Error loading registrations:",
            error
        );

    }
}


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
downloadButton.addEventListener(
    "click",
    () => {

        const headers = [
            "Student Name",
            "Phone",
            "Department",
            "Year",
            "Parent Name",
            "Parent Phone"
        ];

        const rows =
            registrations.map(
                registration => [

                    registration.fullName,
                    registration.phone,
                    registration.department,
                    registration.year,
                    registration.parentName,
                    registration.parentPhone

                ]
            );

        const csv = [
            headers,
            ...rows
        ]
            .map(row =>
                row
                    .map(value =>
                        `"${String(value)
                            .replaceAll('"', '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob =
            new Blob(
                [csv],
                {
                    type:
                        "text/csv;charset=utf-8;"
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

    }
);


// Logout
logoutButton.addEventListener(
    "click",
    () => {

        sessionStorage.removeItem(
            "adminToken"
        );

        window.location.href =
            "./login.html";

    }
);


// Load data
loadRegistrations();