// Load users from localStorage or empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

// ✅ Sign Up Function
function signUp() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const message = document.getElementById("message");

  if (!name || !email || !password) {
    message.textContent = "⚠️ Please fill all fields.";
    message.style.color = "red";
    return;
  }

  const exists = users.some(u => u.email === email);
  if (exists) {
    message.textContent = "🚫 Email already exists.";
    message.style.color = "red";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "✅ Registration successful! Go to login.";
  message.style.color = "green";

  // Optional clear fields
  document.getElementById("regName").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regPassword").value = "";
}

// ✅ Login Function
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("message");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("loginToken", `${user.email}_${Date.now()}`);
    window.location.href = "dashboard.html";
  } else {
    message.textContent = "❌ Invalid email or password.";
    message.style.color = "red";
  }
}
function showStorage() {
  const users = localStorage.getItem("users");
  const currentUser = localStorage.getItem("currentUser");
  const token = localStorage.getItem("loginToken");

  const output = `
🧑‍🤝‍🧑 Users:\n${users || "No users found"}

👤 Current User:\n${currentUser || "No user logged in"}

🔐 Login Token:\n${token || "No token found"}
`;

  document.getElementById("storageData").textContent = output;
}


// ✅ Toggle Show/Hide Password (used in signup)
function togglePassword() {
  const input = document.getElementById("regPassword");
  input.type = input.type === "password" ? "text" : "password";
}
