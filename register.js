const form = document.getElementById("registerForm");
const errorBox = document.getElementById("error");
const registerBtn = document.getElementById("registerBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorBox.style.display = "none";
  registerBtn.disabled = true;
  registerBtn.textContent = "Creating account...";

  const fullName = form.fullName.value.trim();
  const studentId = form.studentId.value.trim();
  const email = form.email.value.trim();
  const preferredStop = form.preferredStop.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  // Validation
  if (!email.endsWith("@chitkara.edu.in")) {
    return showError("Please use your Chitkara email address.");
  }
  if (password.length < 6) {
    return showError("Password must be at least 6 characters long.");
  }
  if (password !== confirmPassword) {
    return showError("Passwords do not match.");
  }

  // Get existing users
  const users = JSON.parse(localStorage.getItem("busifyUsers")) || [];

  // Check duplicates
  const exists = users.some(u => u.email === email || u.studentId === studentId);
  if (exists) {
    return showError("An account with this email or student ID already exists.");
  }

  // Save new user
  const user = { fullname: fullName, studentId, email, preferredStop, password };
  users.push(user);
  localStorage.setItem("busifyUsers", JSON.stringify(users));

  setTimeout(() => {
    alert(`Welcome, ${fullName}! Your account has been created successfully.`);
    form.reset();
    registerBtn.disabled = false;
    registerBtn.textContent = "Register";
    window.location.href = "login.html";
  }, 1000);
});

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.style.display = "block";
  registerBtn.disabled = false;
  registerBtn.textContent = "Register";
}
