# Usa una imagen base de Node.js
FROM node:16

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Expone el puerto que tu aplicación usará
EXPOSE 5000

# Comando para arrancar tu aplicación
CMD ["npm", "run", "dev"]
