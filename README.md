# 📌 BackEscuela - Backend

## 📖 Descripción
_BackEscuela_ es el backend del sistema de gestión escolar. Proporciona endpoints para la administración de alumnos, cursos, materias y más.

## 🚀 Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB / PostgreSQL (según corresponda)
- JWT para autenticación
- Sequelize / Mongoose (según el ORM/ODM utilizado)

## 📂 Estructura del Proyecto
```
.
├── config/          # Configuración del proyecto
├── controllers/     # Controladores de las rutas
├── middleware/      # Middlewares para autenticación, validaciones, etc.
├── migrations/      # Migraciones de base de datos
├── models/         # Modelos de datos
├── routes/         # Definición de rutas
├── services/       # Lógica de negocio y conexión a BD
├── .env            # Variables de entorno
├── api.http        # Pruebas de API en VSCode
├── package.json    # Dependencias del proyecto
├── server.js       # Punto de entrada del servidor
```

## 🛠️ Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/BackEscuela.git
cd BackEscuela
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz con los siguientes valores:
```
PORT=5000
DB_URI=mongodb://localhost:27017/escuela
JWT_SECRET=tu_clave_secreta
```

### 4️⃣ Ejecutar el servidor en modo desarrollo
```bash
npm run dev
```

### 5️⃣ Acceder a la API
El servidor correrá en:
```
http://localhost:5000
```

## ✅ Endpoints Principales
- **GET** `/alumnos` → Obtener lista de alumnos
- **POST** `/alumnos` → Crear un nuevo alumno
- **PUT** `/alumnos/:id` → Actualizar información de un alumno
- **DELETE** `/alumnos/:id` → Eliminar un alumno

## 📄 Licencia
Este proyecto está bajo la licencia [MIT].

---

👨‍💻 **Desarrollado por [Tu Nombre]**

