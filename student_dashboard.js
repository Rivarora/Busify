console.log("Student Dashboard JS loaded successfully!");

document.addEventListener("DOMContentLoaded", function() {
    const users = JSON.parse(localStorage.getItem("busifyUsers")) || [];
    const currentUser = users[0];

    // Display welcome message
    if (currentUser) {
        const topbar = document.querySelector(".topbar");
        const welcomeMsg = document.createElement("p");
        welcomeMsg.textContent = `Welcome, ${currentUser.fullname}`;
        welcomeMsg.style.color = "#1976d2";
        welcomeMsg.style.fontWeight = "600";
        topbar.appendChild(welcomeMsg);
    }

    // Dashboard stats
    const totalRoutes = 12;
    const activeBuses = 27;
    const registeredUsers = users.length;
    const openIncidents = 3;

    const statsCards = document.querySelectorAll(".stats .card");
    statsCards[0].querySelector("p").textContent = totalRoutes;
    statsCards[1].querySelector("p").textContent = activeBuses;
    statsCards[2].querySelector("p").textContent = registeredUsers;
    statsCards[3].querySelector("p").textContent = openIncidents;

    // Removed View button section entirely
});

