Proyecto: ¿Y filo qué hace? 📚

"¿Y filo qué hace?" es una plataforma web diseñada para visibilizar la producción académica e investigativa de la Facultad de Filosofía y Humanidades. Surge con dos objetivos claros: primero, compartir la producción de la universidad pública, trascendiendo las paredes de la facultad para que cualquier persona interesada pueda conocer, con transparencia, en qué se está trabajando. Segundo, busca que los estudiantes conozcan las investigaciones de sus profesores para facilitar su integración a los grupos de trabajo o, en algún sentido, mapear los temas que más se tratan y detectar aquellos que aún faltan abordar. 
La logica del sistema es la siguiente: cualquier persona puede observar los grupos registrados y los aportes. Sin embargo para poder crear un grupo, se debera tener un usuario registrado. Este usuario sera el administrador del grupo y los aportes, solamente mediante su cuenta se puede añadir, editar o borrar los aportes y el grupo creado.

🚀 Características
Gestión de Grupos: Creación y visualización de grupos académicos por carrera.

Aportes Académicos: Publicación de textos, eventos, materiales y notas de investigación.

Seguridad: Autenticación de usuarios mediante JWT (JSON Web Tokens).

Privacidad: Solo los creadores autorizados pueden gestionar el contenido de sus grupos.

Protección: Implementación de Rate Limiting para prevenir ataques de fuerza bruta en el acceso.

🛠️ Tecnologías utilizadas
Backend: Node.js y Express.js

Base de Datos: MongoDB con Mongoose (ODM).

Seguridad: Bcrypt.js (hasheo de contraseñas) y JWT (autorización).

Validaciones: Express-rate-limit y Regex para integridad de datos.

🏗️ Estructura del Proyecto (MVC)
El proyecto sigue el patrón Modelo-Vista-Controlador para asegurar la escalabilidad:

/models: Definición de los esquemas de datos (User, Group, Aporte).

/controllers: Lógica de negocio y procesamiento de peticiones.

/routes: Definición de los puntos de entrada (endpoints) de la API.

/middlewares: Capa de seguridad y validación de tokens.

/config: Configuración de la conexión a la base de datos.

La lógica de proyecto se implementa dentro de los controllers, manteniendo una estructura funcional adecuada para el alcance actual. Como mejora futura, se propone la incorporación de una capa de services, encargada de centralizar la lógica de negocio (validaciones, reglas de permisos y operaciones sobre entidades). Esa futura incorporacion permitir reducir la responsabilidad de los controller, evitar la duplicación de lógica, mejorar el mantenimiento del código y aumentar la escalabilidad del sistema

🔑 Endpoints Principales
 Autenticación (/auth)
POST /auth/register — Registro de nuevos académicos y usuarios.

POST /auth/login — Inicio de sesión y obtención del token (JWT).

GET /auth/profile — Obtención de los datos del perfil actual. Esta opcion es una ruta protegida, se penso para facilitar la visualizacion del token o los datos del mismo usuario registrado.

 Grupos de Investigación (/groups)
GET /groups — Listado de todos los grupos (admite filtros por carrera vía query strings).

POST /groups — Creación de un nuevo grupo de investigación. (Ruta Protegido) Actualmente, un usuario puede crear dos grupos, pero a futuro, podria restringirse a solo un grupo por persona.

PUT /groups/:id — Actualización de los datos del grupo. (Protegido - Solo dueño)

DELETE /groups/:id — Eliminación definitiva del grupo. (Protegido - Solo dueño)

 Aportes y Contenido (/aportes)
GET /aportes — Visualización de aportes (se puede filtrar por grupoId).

POST /aportes — Publicación de nuevo contenido académico. (Protegido - Solo creador del grupo)

PUT /aportes/:id — Edición de un aporte existente. (Protegido - Solo autor)

DELETE /aportes/:id — Eliminación de un aporte. (Protegido - Solo autor)

⚙️ Instalación y Configuración
1.Clonar el repositorio.

2.Instalar dependencias:   npm install

3.Configurar el archivo .env con las siguientes variables:

PORT: Puerto del servidor.

MONGO_URI: Cadena de conexión a MongoDB.

JWT_SECRET: Clave secreta para los tokens.

4.Iniciar el servidor: npm run dev


🧪 Pruebas de la API

Para controlar el correcto funcionamiento del codigo, se utilizo Postman.
Puede acceder al mismo mediante:

* **Opción 1 (Enlace Online):** [Ver documentación interactiva en Postman] ( https://elements.getpostman.com/redirect?entityId=51206499-1f53e836-a96f-46a0-89a0-a22fdeff3b27&entityType=collection )
* **Opción 2 (Archivo Local):** [Descargar archivo JSON](./y-filo-que-hace-api.json)

### Notas para el testeo:
- La colección incluye ejemplos de carga de datos para cada ruta.
- Se recomienda ejecutar primero el request de **Login** para que el Token se configure automáticamente en las rutas protegidas de Grupos y Aportes.
 

### Notas sobre frontend: No se llego a cargarlo a Render, pero se pudo visualizar a idea (a modo de maqueta) con live server. Adjunto imagenes

### Vista Principal (Biblioteca)
![Vista Principal](./imagenes/bibliotecacentral.png)

### Detalle del Grupo y aportes
![Detalle de Grupo](./imagenes/grupoyaporte.png)

👤 Autor
Chiiliguay Torramorell Maria Itati. Estudiante de ADA
Trabajo Práctico Integrador:¡Tu Proyecto Back End!

