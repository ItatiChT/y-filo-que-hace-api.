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

📦 Modelo de datos

El sistema está compuesto por tres entidades principales: Usuarios, Grupos de investigación y Aportes, que se relacionan entre sí para estructurar la producción académica dentro de la plataforma.

👤 Usuario (User)

El usuario es la entidad central de autenticación del sistema. Permite el registro, inicio de sesión y acceso a funcionalidades protegidas. A su vez, puede estar vinculado a un grupo de investigación.

nombre (String) → nombre del usuario (opcional)
email (String) → identificador único para autenticación (obligatorio / único)
password (String) → contraseña encriptada (obligatorio)
grupoId (ObjectId → Group) → grupo al que puede pertenecer (opcional)
createdAt / updatedAt → campos automáticos del sistema
🧩 Grupo de investigación (Group)

El grupo representa una unidad de trabajo académico dentro de la facultad. Cada grupo es creado por un usuario, quien actúa como su administrador, y concentra información y producción asociada a una línea de investigación.

nombre (String) → nombre del grupo (obligatorio)
carrera (String) → área académica (opcional)
director (String) → responsable del grupo (opcional)
miembros (Array de Strings) → integrantes del grupo (opcional)
contacto (String) → información de contacto (opcional)
resumen (String) → descripción general del grupo (opcional)
icono (String) → representación visual del grupo (opcional)
createdBy (ObjectId → User) → usuario creador del grupo (obligatorio)
createdAt / updatedAt → campos automáticos del sistema
📄 Aporte académico (Aporte)

Los aportes representan las publicaciones realizadas dentro de un grupo de investigación. Cada aporte está asociado a un grupo específico y puede tener un autor vinculado.

grupoId (ObjectId → Group) → grupo al que pertenece (obligatorio)
titulo (String) → título del aporte (obligatorio)
descripcion (String) → contenido del aporte (obligatorio)
autor (ObjectId → User) → usuario autor (opcional)
link (String) → material externo asociado (opcional)
tipo (String) → tipo de aporte (PDF, evento, ensayo, etc.) (opcional)
palabrasClave (Array de Strings) → etiquetas de búsqueda (opcional)
autores (Array de Strings) → autores del trabajo (opcional)
fecha (Date) → fecha del material (opcional)
createdAt / updatedAt → campos automáticos del sistema

🧠 Relación entre entidades
Un usuario puede crear múltiples grupos.
Un usuario puede crear múltiples aportes.
Un grupo puede contener múltiples aportes.
Cada aporte pertenece a un único grupo.
Un usuario puede estar asociado opcionalmente a un grupo.


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

