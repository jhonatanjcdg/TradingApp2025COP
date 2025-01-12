FROM node:18-alpine

WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

RUN npm install bcrypt

# Reinstala bcrypt dentro del contenedor
# RUN npm rebuild bcrypt --build-from-source

# Construye la aplicación
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "start"]
