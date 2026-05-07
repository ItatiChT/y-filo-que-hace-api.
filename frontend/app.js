const API = "http://localhost:3000";

// 🔐 RENDER AUTH (usuario / login / logout)
function renderAuth() {
  const cont = document.getElementById("auth");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    cont.innerHTML = `
      <p>Hola, ${user.nombre}</p>
      <button onclick="logout()">Cerrar sesión</button>
    `;
  } else {
    cont.innerHTML = `
      <a href="login.html">Iniciar sesión</a> |
      <a href="register.html">Crear cuenta</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  location.reload();
}

// 📚 VARIABLES GLOBALES
let gruposGlobal = [];

// 📦 CARGAR GRUPOS
async function cargarGrupos() {
  const res = await fetch('https://y-filo-que-hace-api.onrender.com/api/grupos') //fetch(`${API}/groups`); lo cambio para conectar con render
  const grupos = await res.json();

  gruposGlobal = grupos;

  renderGrupos(grupos);
}

// 🎨 RENDER GRUPOS
function renderGrupos(grupos) {
  const contenedor = document.getElementById("biblioteca");
  contenedor.innerHTML = "";

  grupos.forEach((g, i) => {
    const div = document.createElement("div");
    div.classList.add("grupo");

    div.innerText =
      g.nombre.length > 40
        ? g.nombre.substring(0, 40) + "..."
        : g.nombre;

    // 📚 organización tipo estantería
    const fila = Math.floor(i / 4);
    const columna = i % 4;

    div.style.top = `${80 + fila * 120}px`;
    div.style.left = `${80 + columna * 200}px`;

    div.onclick = () => {
      window.location.href = `grupo.html?id=${g._id}`;
    };

    contenedor.appendChild(div);
  });
}

// 🔍 FILTRO SIMPLE POR CARRERA
function filtrar() {
  const texto = document.getElementById("filtro").value.toLowerCase();

  const filtrados = gruposGlobal.filter(g =>
    g.carrera.toLowerCase().includes(texto)
  );

  renderGrupos(filtrados);
}

// 🚀 INICIALIZACIÓN
renderAuth();
cargarGrupos();