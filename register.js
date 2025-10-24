console.log("Register.js loaded successfully!");

document.addEventListener("DOMContentLoaded", function() {
    const registerBtn = document.getElementById("registrationBtn");

    registerBtn.addEventListener("click", function() {
        const name = document.querySelector("input[placeholder='Enter Name']").value.trim();
        const studentId = document.querySelector("input[placeholder='22CSE1234']").value.trim();
        const email = document.querySelector("input[type='email']").value.trim();
        const stop = document.querySelector("select").value;
        const password = document.querySelector("input[placeholder='Create password']").value;
        const confirmPassword = document.querySelector("input[placeholder='Repeat password']").value;

        if (!name || !studentId || !email || !password || !confirmPassword) {
            alert("📧 Please fill all the fields.");
            return;
        }

        if (password.length < 6) {
            alert("🔑 Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            alert("🔐 Passwords do not match. Please try again.");
            return;
        }

        // Fetch existing users array from localStorage or create empty array
        let users = JSON.parse(localStorage.getItem("busifyUsers")) || [];

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            alert("👤 An account with this email already exists. Please login instead.");
            window.location.href = "login.html";
            return;
        }

        // Add new user
        const userData = { fullname: name, studentId, email, stop, password };
        users.push(userData);
        localStorage.setItem("busifyUsers", JSON.stringify(users));

        alert("✅ Registration successful! You can now log in.");
        window.location.href = "login.html";
    });
});
