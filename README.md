Proyecto: ¿Y filo qué hace? 📚

“¿Y filo qué hace?” es una plataforma web diseñada para visibilizar la producción académica e investigativa de la Facultad de Filosofía y Humanidades.

El sistema permite la consulta pública de grupos de investigación y sus aportes, con el objetivo de facilitar el acceso a la producción académica y promover la integración de estudiantes a equipos de trabajo.

La lógica del sistema establece que cualquier usuario puede visualizar grupos y aportes, pero la creación y administración de grupos está restringida a usuarios registrados. Cada usuario autenticado actúa como administrador de sus propios grupos, pudiendo crear, editar y eliminar tanto grupos como sus aportes.

🛠️ Tecnologías utilizadas

Node.js & Express.js: servidor y manejo de rutas.
MongoDB & Mongoose: base de datos y modelado de datos.
JWT (jsonwebtoken): autenticación y control de acceso.
bcrypt.js: encriptación de contraseñas.
express-rate-limit: protección contra ataques de fuerza bruta.
express-validator / regex: validación de datos.

🏗️ Estructura del proyecto (MVC)

El proyecto sigue el patrón Modelo–Vista–Controlador (MVC):

/models → esquemas de datos (User, Group, Aporte).
/controllers → lógica de negocio y manejo de requests.
/routes → definición de endpoints de la API.
/middlewares → autenticación y validación de tokens.
/config → configuración de base de datos.

La lógica del sistema se implementa directamente en los controllers, manteniendo una estructura funcional acorde al alcance del proyecto.

Como mejora futura, se propone la incorporación de una capa de services para centralizar la lógica de negocio (validaciones, reglas de permisos y operaciones sobre entidades), lo que permitiría:

reducir la responsabilidad de los controllers
evitar duplicación de lógica
mejorar mantenimiento del código
aumentar escalabilidad del sistema

## 📦 Modelo de Datos

El sistema se estructura en tres entidades principales interconectadas, diseñadas para organizar la producción académica de la facultad.

---

### 👤 Usuario (User)
Es la entidad central de autenticación. Gestiona el acceso y la vinculación con la actividad académica.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `nombre` | String | Nombre del usuario (Opcional). |
| `email` | String | Identificador único y obligatorio. |
| `password` | String | Contraseña encriptada (Obligatorio). |
| `grupoId` | ObjectId | Referencia al grupo al que pertenece (Opcional). |

---

### 🧩 Grupo de Investigación (Group)
Representa la unidad de trabajo. Es el contenedor de la producción y línea académica.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `nombre` | String | Nombre del grupo (Obligatorio). |
| `carrera` | String | Área académica a la que pertenece. |
| `director` | String | Responsable principal del grupo. |
| `miembros` | Array | Lista de integrantes registrados. |
| `createdBy` | ObjectId | Usuario administrador que creó el grupo. |

---

### 📄 Aporte Académico (Aporte)
Publicaciones y materiales generados dentro de un grupo.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `titulo` | String | Título del trabajo o recurso (Obligatorio). |
| `descripcion` | String | Cuerpo o resumen del contenido (Obligatorio). |
| `tipo` | String | Formato (PDF, Evento, Ensayo, etc.). |
| `link` | String | Enlace a material externo o descarga. |
| `grupoId` | ObjectId | Referencia obligatoria al grupo propietario. |

---

### 🧠 Relaciones del Sistema

Para entender cómo fluye la información, el modelo sigue estas reglas de integridad:

* **1:N (Uno a Muchos):** Un **Usuario** puede crear múltiples **Grupos** y múltiples **Aportes**.
* **1:N (Contenedor):** Un **Grupo** centraliza múltiples **Aportes**.
* **Referencia:** Cada **Aporte** está anclado a un único **Grupo**.
* **Asociación:** Un **Usuario** puede o no estar vinculado formalmente a un **Grupo** específico a través de su perfil.

> [!TIP]
> Todos los modelos incluyen automáticamente los campos `createdAt` y `updatedAt` para el control de versiones y auditoría de los datos.

🔑 Endpoints principales

Autenticación (/auth)

POST /auth/register → registro de usuario
POST /auth/login → login y generación de JWT
GET /auth/profile → datos del usuario autenticado (ruta protegida)

Grupos (/groups)

GET /groups → listado de grupos (con filtros por carrera)
POST /groups → creación de grupo (protegido)
PUT /groups/:id → edición de grupo (solo propietario)
DELETE /groups/:id → eliminación de grupo (solo propietario)

Aportes (/aportes)

GET /aportes → listado de aportes (filtrable por grupoId)
POST /aportes → creación de aporte (protegido)
PUT /aportes/:id → edición de aporte (solo autor)
DELETE /aportes/:id → eliminación de aporte (solo autor)

⚙️ Instalación y configuración
Clonar el repositorio
Instalar dependencias: npm install
Crear archivo .env con:

PORT
MONGO_URI
JWT_SECRET

Ejecutar el servidor: npm run dev

🧪 Pruebas de la API

Para controlar el correcto funcionamiento del codigo, se utilizo Postman.
Puede acceder al mismo mediante:

* **Opción 1 (Enlace Online):** [Ver documentación interactiva en Postman] ( https://elements.getpostman.com/redirect?entityId=51206499-1f53e836-a96f-46a0-89a0-a22fdeff3b27&entityType=collection )
* **Opción 2 (Archivo Local):** [Descargar archivo JSON](./y-filo-que-hace-api.json)

### Notas para el testeo:
- La colección incluye ejemplos de carga de datos para cada ruta.
- Se recomienda ejecutar primero el request de **Login** para que el Token se configure automáticamente en las rutas protegidas de Grupos y Aportes.
 
 🖥️ Frontend

El frontend no fue desplegado en producción, pero puede ejecutarse localmente mediante Live Server como maqueta funcional.

Se adjuntan capturas de:

### Vista Principal (Biblioteca)
![Vista Principal](./imagenes/bibliotecacentral.png)

### Detalle del Grupo y aportes
![Detalle de Grupo](./imagenes/grupoyaporte.png)

👤 Autor
Chiiliguay Torramorell Maria Itati. Estudiante de ADA
Trabajo Práctico Integrador:¡Tu Proyecto Back End!

