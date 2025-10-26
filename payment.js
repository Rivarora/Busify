// Payment Page Logic

// ✅ Step 1: Ensure user is logged in
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// ✅ Step 2: Get stored users (to update payment info)
let users = JSON.parse(localStorage.getItem("users")) || [];

// ✅ Step 3: Handle form submission
document.querySelector(".payment-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const method = document.getElementById("method").value;

  if (!studentId || !amount || !method) {
    alert("Please fill all fields!");
    return;
  }

  // ✅ Find matching user
  const currentUserIndex = users.findIndex(
    (u) => u.username === user.username
  );

  if (currentUserIndex === -1) {
    alert("User not found!");
    return;
  }

  // ✅ Mark payment done (simulate successful payment)
  users[currentUserIndex].paid = true;
  localStorage.setItem("users", JSON.stringify(users));

  // ✅ Update loggedInUser too
  user.paid = true;
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  // ✅ Show success message
  alert(`✅ Payment of ₹${amount} via ${method.toUpperCase()} successful!`);
  document.querySelector(".payment-form").reset();
});

// ✅ Optional: Pre-fill student ID if user is student
if (user.role === "student") {
  document.getElementById("studentId").value = user.username;
}
