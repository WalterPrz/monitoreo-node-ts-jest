# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false
```
3. realizar el comando
```
npm install
```
4. realizar el siguiente comando:
```
npx prisma generate
npx prisma migrate dev
```