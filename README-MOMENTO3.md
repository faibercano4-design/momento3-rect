# Actividad Final — Momento 3

Proyecto frontend React + Vite y backend Express conectado a MongoDB mediante Mongoose. El frontend usa Axios.

## Requisitos
- Node.js 20.19+ o 22.12+
- MongoDB local encendido o una URI de MongoDB Atlas

## 1. Configurar backend
En terminal:
```bash
cd backend
npm install
```
Copia `.env.example` a `.env` y ajusta `MONGODB_URI` y `JWT_SECRET`. No publiques el archivo `.env`.
Luego inicia la API:
```bash
npm run dev
```
La API estará en `http://localhost:4000`.

## 2. Configurar frontend
Abre otra terminal en la carpeta raíz `actividad-momento-2`:
```bash
npm install
npm run dev
```
Abre la dirección local que indique Vite. Regístrate desde la pantalla inicial. Para usar otra URL de API crea un `.env` en la raíz con `VITE_API_URL=http://localhost:4000/api`.

## 3. Pruebas y compilación
En la terminal del frontend:
```bash
npm test
npm run build
npm run lint
```
Hay pruebas de componentes en `src/components/*.test.jsx`. Comprueba que el comando de pruebas termine con PASS antes de presentar.

## Qué demostrar
1. Al abrir la app se muestra Login/Registro.
2. Sin sesión, intentar `/catalogo` redirige al Login.
3. Registrar usuario e iniciar sesión.
4. En Catálogo, leer productos de MongoDB (GET), agregar uno (POST) y eliminarlo (DELETE).
5. Cerrar sesión y mostrar que las rutas protegidas vuelven a bloquearse.
6. Ejecutar `npm test` y mostrar al menos dos pruebas en PASS.

## Seguridad / alcance
La autenticación usa JWT y contraseñas con hash bcrypt. Para una entrega de producción faltan medidas adicionales como limitación de intentos, validación más completa y estrategia de almacenamiento de tokens más segura. Favoritos permanecen en el contexto del frontend; los productos se almacenan en MongoDB.
