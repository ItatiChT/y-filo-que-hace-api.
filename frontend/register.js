const API = "http://localhost:3000";

async function register() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Usuario creado, ahora iniciá sesión");
    window.location.href = "login.html";
  } else {
    document.getElementById("error").innerText = data.error;
  }
}