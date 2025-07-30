# 📌 Proyecto: Final Programacion III (BackEnd)

## 📖 Descripción
BackEscuela es el módulo backend del sistema de gestión escolar. 
Proporciona una API para administrar:

- Alumnos
- Boletines
- Comisiones
- Cursos
- Materias

Permitiendo la creación, modificación, eliminación y consulta de información académica.

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
DB_URL=mongodb://localhost:27017/escuela
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
---

👨‍💻 **Desarrollado por Franco Grieco**

