// Auto-fill saved email
const savedEmail = localStorage.getItem("savedEmail");
if (savedEmail) {
  document.getElementById("email").value = savedEmail;
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("busifyUser"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  if ((email === storedUser.email || email === storedUser.studentId) && password === storedUser.password) {
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    alert(`Welcome back, ${storedUser.fullname}!`);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email/ID or password.");
  }
});