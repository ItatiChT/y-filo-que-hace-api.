const API = "http://localhost:3000";

// 👉 obtener id de la URL
const params = new URLSearchParams(window.location.search);
const grupoId = params.get("id");

// 🔐 Mostrar acciones según permisos
function renderAcciones(grupo) {
  const acciones = document.getElementById("acciones");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ no logueada
  if (!token || !user) {
    acciones.innerHTML = `<p>Iniciá sesión para publicar aportes</p>`;
    return;
  }

  // ❌ no es dueña del grupo
  if (!grupo.createdBy || grupo.createdBy.toString() !== user.id) {
    acciones.innerHTML = `<p>No tenés permisos para publicar en este grupo</p>`;
    return;
  }

  // ✅ puede publicar
  acciones.innerHTML = `
    <h3>Nuevo aporte</h3>

    <input id="titulo" placeholder="Título"><br><br>

    <textarea id="descripcion" placeholder="Descripción"></textarea><br><br>

    <button onclick="crearAporte('${grupo._id}')">
      Publicar
    </button>
  `;
}

// 📦 Cargar grupo + aportes
async function cargarGrupo() {

  console.log("🚀 cargarGrupo se está ejecutando");

  const resGrupo = await fetch(`${API}/groups`);
  const grupos = await resGrupo.json();

  const grupo = grupos.find(g => g._id === grupoId);

  if (!grupo) {
    document.getElementById("grupoInfo").innerHTML =
      "<p>Grupo no encontrado</p>";
    return;
  }

  renderAcciones(grupo);

  const info = document.getElementById("grupoInfo");

  info.innerHTML = `
    <h1>${grupo.nombre}</h1>
    <p><b>Carrera:</b> ${grupo.carrera}</p>
    <p><b>Director:</b> ${grupo.director || "No especificado"}</p>
    <p>${grupo.resumen || ""}</p>
  `;

  const resAportes = await fetch(`${API}/aportes?grupoId=${grupoId}`);
  const aportes = await resAportes.json();

  const cont = document.getElementById("aportes");

  cont.innerHTML = "";

  if (aportes.length === 0) {
    cont.innerHTML = `<p>No hay aportes todavía</p>`;
    return;
  }

  aportes.forEach(a => {
    cont.innerHTML += `
      <div class="aporte">
        <h3>${a.titulo}</h3>
        <p>${a.descripcion}</p>
      </div>
    `;
  });
}

cargarGrupo();

// ➕ Crear aporte
async function crearAporte(grupoId) {

  const token = localStorage.getItem("token");

  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;

  if (!titulo || !descripcion) {
    alert("Completá todos los campos");
    return;
  }

  const res = await fetch(`${API}/aportes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      titulo,
      contenido: descripcion,
      groupId: grupoId
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Aporte creado");
    location.reload();
  } else {
    alert(data.error || "Error al crear aporte");
  }
}