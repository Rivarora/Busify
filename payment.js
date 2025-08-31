// payment.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("paymentForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the page from refreshing

    // Get values
    let name = document.getElementById("studentName").value;
    let id = document.getElementById("studentId").value;
    let amount = document.getElementById("amount").value;
    let email = document.getElementById("email").value;

    // Simple checks
    if (name === "" || id === "" || amount === "" || email === "") {
      alert("⚠️ Please fill all fields!");
      return;
    }

    if (amount <= 0) {
      alert("⚠️ Amount should be greater than 0");
      return;
    }

    alert("✅ Payment submitted successfully!");
    form.reset(); // Clear the form
  });
});
