# 📌 Proyecto: Final Programacion III (Frontend)

## 📖 Descripción
Escuela

El sistema a implementar debe contemplar las funcionalidades:
-	Administración de alumnos: se registran los alumnos que asisten a la entidad y se asocian a un curso determinado (comisión).
-	Administración de cursos: las materias ya ingresadas en el sistema, deberán estar asociadas a un año y a un curso determinado (o un curso deberá tener materias asignadas)
-	Generación de “boletín” de calificaciones asociado a cada alumno

## 🚀 Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB
- JWT para autenticación
- Mongoose

## 📂 Estructura del Proyecto
```
.
├── config/          # Configuración del proyecto
├── controllers/     # Controladores de las rutas
├── middleware/      # Middlewares para autenticación, validaciones, etc.
├── migrations/      # Migraciones de base de datos
├── models/          # Modelos de datos
├── routes/          # Definición de rutas (VER)
├── services/        # Lógica de negocio y conexión a BD (VER)
├── .env             # Variables de entorno
├── api.http         # Pruebas de API en VSCode
├── package.json     # Dependencias del proyecto
├── server.js        # Punto de entrada del servidor
```

## 🛠️ Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/FrancoJGrieco/BackEscuela.git
cd BackEscuela
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz con los siguientes valores:
```
PORT=3030
DB_URI=mongodb://localhost:27017/escuela
SECRET=sladkjfñljsdapofksdhafh
```

### 4️⃣ Ejecutar el servidor en modo desarrollo
```bash
npm run dev
```

### 5️⃣ Acceder a la API
El servidor correrá en:
```
http://localhost:3030
```

## ✅ Endpoints Principales
- **GET** `/alumnos` → Obtener lista de alumnos
- **POST** `/alumnos` → Crear un nuevo alumno
- **PUT** `/alumnos/:id` → Actualizar información de un alumno
- **DELETE** `/alumnos/:id` → Eliminar un alumno

---

👨‍💻 **Desarrollado por Franco Grieco**

