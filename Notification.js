// Notification Page Logic

// ✅ Step 1: Ensure user is logged in
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// ✅ Step 2: Load notifications from localStorage
let notifications = JSON.parse(localStorage.getItem("notifications")) || [
  {
    date: "28 Aug 2025",
    text: "Route 5 bus will be delayed by 20 minutes due to traffic.",
    color: "#ff4d4d",
  },
  {
    date: "25 Aug 2025",
    text: "Monthly pass renewal starts from today.",
    color: "#ffa500",
  },
  {
    date: "20 Aug 2025",
    text: "New bus added for Route 3.",
    color: "#0d47a1",
  },
];

// ✅ Step 3: Render notifications
const container = document.querySelector(".container");
const title = document.querySelector(".container h2");
const existingCards = document.querySelectorAll(".notification-card");
existingCards.forEach((el) => el.remove()); // Remove static ones

notifications.forEach((n) => {
  const card = document.createElement("div");
  card.classList.add("notification-card");
  card.style.borderLeft = `5px solid ${n.color}`;
  card.innerHTML = `<p><strong>${n.date}:</strong> ${n.text}</p>`;
  container.appendChild(card);
});

// ✅ Step 4 (Optional): Allow admin to add new notifications
if (user.role === "admin") {
  const addBtn = document.createElement("button");
  addBtn.textContent = "➕ Add Notification";
  addBtn.style.marginTop = "20px";
  addBtn.style.padding = "10px 15px";
  addBtn.style.background = "#1976d2";
  addBtn.style.color = "white";
  addBtn.style.border = "none";
  addBtn.style.borderRadius = "6px";
  addBtn.style.cursor = "pointer";

  addBtn.addEventListener("click", () => {
    const text = prompt("Enter new notification text:");
    if (!text) return;
    const newNote = {
      date: new Date().toLocaleDateString(),
      text,
      color: "#0d47a1",
    };
    notifications.unshift(newNote);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    alert("Notification added successfully!");
    location.reload();
  });

  container.appendChild(addBtn);
}
