document.addEventListener("DOMContentLoaded", function () {
  // ==================== LOGIN ACCESS CONTROL ====================
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Please login first to access the Bus Search page.");
    window.location.href = "login.html";
    return; // Stop further script execution
  }

  // ==================== NAV MENU TOGGLE ====================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    // Close menu on link click (mobile UX)
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  // ==================== SEARCH FUNCTIONALITY ====================
  const searchBtn = document.getElementById("searchBtn");
  const destinationInput = document.getElementById("destination");
  const error = document.getElementById("error");

  if (!searchBtn || !destinationInput || !error) {
    console.error("Search elements not found in DOM.");
    return;
  }

  // Restore last searched value from localStorage
  const lastSearch = localStorage.getItem("lastDestination");
  if (lastSearch) {
    destinationInput.value = lastSearch;
  }

  // Handle search button click
  searchBtn.addEventListener("click", () => {
    const place = destinationInput.value.trim().toLowerCase();

    if (place === "") {
      showError("Please enter a destination!");
      return;
    }

    // Save last search to localStorage
    localStorage.setItem("lastDestination", place);

    // Redirect based on destination
    if (place === "ambala") {
      window.location.href = "buses.html";
    } else if (place === "patiala") {
      window.location.href = "busesp.html";
    } else {
      showError("No buses found for this destination!");
    }
  });

  // Allow Enter key to trigger search
  destinationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });

  // Function to show error message
  function showError(message) {
    error.innerText = message;
    error.style.display = "block";
    setTimeout(() => (error.style.display = "none"), 3000);
  }
});
