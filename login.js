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

  const users = JSON.parse(localStorage.getItem("busifyUsers")) || [];

  if (users.length === 0) {
    alert("No registered users found. Please sign up first.");
    return;
  }
  const matchedUser = users.find(
    (user) =>
      (user.email === email || user.studentId === email) &&
      user.password === password
  );

  if (matchedUser) {
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    //alert(`Welcome back, ${matchedUser.fullname}!`);
    window.location.href = "student_dashboard.html";
  } else {
    alert("Invalid email/ID or password.");
  }
});

