// ==================== NAV MENU TOGGLE ====================
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Close menu on link click (mobile UX)
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  // ==================== LOGIN ACCESS CONTROL ====================
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("Please sign in to access the Bus Search page.");
    window.location.href = "login.html"; // redirect to login
    return;
  }

  // ==================== SEARCH FUNCTIONALITY ====================
  const searchBtn = document.getElementById("searchBtn");
  const destinationInput = document.getElementById("destination");
  const error = document.getElementById("error");

  // Restore last searched value from localStorage
  const lastSearch = localStorage.getItem("lastDestination");
  if (lastSearch) {
    destinationInput.value = lastSearch;
  }

  // Search button click
  searchBtn.addEventListener("click", () => {
    let place = destinationInput.value.trim().toLowerCase();

    if (place === "") {
      showError("Please enter a destination!");
      return;
    }

    // Save to localStorage
    localStorage.setItem("lastDestination", place);

    if (place === "ambala") {
      window.location.href = "buses.html";
    } else if (place === "patiala") {
      window.location.href = "busesp.html";
    } else {
      showError("No buses found for this destination!");
    }
  });

  // Allow Enter key for search
  destinationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });

  // Function to show error
  function showError(message) {
    error.innerText = message;
    error.style.display = "block";
    setTimeout(() => (error.style.display = "none"), 3000);
  }
});
