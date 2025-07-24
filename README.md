# Frontend-BOOST-AGENCY
Frontend

# Despliegue del Frontend Angular en Netlify

## Estructura del Proyecto

- `/frontend`: Aplicación Angular (solo esta carpeta se despliega en Netlify)
- `/backend`: API Node.js (se despliega por separado, por ejemplo en Railway)

---

## 1. Construcción del Proyecto Angular

Ejecuta el siguiente comando desde la carpeta raíz del proyecto:

```bash
ng build --configuration production
```

Esto generará la carpeta de salida en:

```
frontend/dist/<nombre-del-proyecto>
```

> **Nota:** Reemplaza `<nombre-del-proyecto>` por el nombre real de la carpeta generada dentro de `dist` (por ejemplo, `frontend/dist/frontend`).

---

## 2. Configuración de Netlify (`netlify.toml`)

Crea (o edita) el archivo `netlify.toml` en la raíz del proyecto o dentro de `/frontend` con el siguiente contenido:

```toml
[build]
  base = "frontend"
  publish = "frontend/dist/<nombre-del-proyecto>"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

> **Importante:** Cambia `<nombre-del-proyecto>` por el nombre real de la carpeta generada en `dist`.

---

## 3. Despliegue en Netlify

### a) Subida manual

1. Inicia sesión en [Netlify](https://app.netlify.com/).
2. Haz clic en “Add new site” > “Deploy manually”.
3. Sube el contenido completo de la carpeta `dist/<nombre-del-proyecto>` (después de ejecutar el build).

### b) Conexión automática vía GitHub

1. Conecta tu repositorio de GitHub a Netlify.
2. En la configuración de **Build & Deploy**:
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist/<nombre-del-proyecto>`

---

## 4. Notas sobre rutas Angular

El archivo `netlify.toml` incluye una regla de redirección:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Esto permite que Angular maneje correctamente las rutas internas del frontend (Single Page Application).

---

## 5. Importante

- **Solo el frontend se despliega en Netlify.**
- El backend (`/backend`) debe desplegarse por separado (por ejemplo, en Railway, Render, etc.).
- Asegúrate de que las variables de entorno y endpoints del frontend apunten correctamente al backend desplegado.

------------------------------------------------------------

----
----
----
----
----
----
# Frontend - BOOST AGENCY

Este repositorio contiene el código fuente del frontend de la aplicación, desarrollado con Angular.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:
- **Node.js**: Versión 18.x o superior.
- **Angular CLI**: `npm install -g @angular/cli`

---

## Guía de Inicio Rápido

Sigue estos pasos para tener el proyecto corriendo en tu máquina local.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/BoostAgencyDevs/Pagina_Principal_boostdigitalstudio.git
```

### 2. Instalar Dependencias

Navega a la carpeta del frontend y ejecuta `npm install`.

```bash
cd Pagina_Principal_boostdigitalstudio/frontend
npm install
```

### 3. Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo local:

```bash
ng serve -o
```

Esto abrirá automáticamente tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

---

## Configuración de Entornos

El proyecto utiliza dos archivos de entorno principales para gestionar las URLs de la API.

-   `src/environments/environment.ts`
    -   **Uso**: Desarrollo local.
    -   **Descripción**: Este archivo se usa cuando ejecutas `ng serve`. Ya está configurado para apuntar a la API de desarrollo en Railway. No necesitas modificarlo para trabajar localmente.

-   `src/environments/environment.prod.ts`
    -   **Uso**: Producción (Netlify).
    -   **Descripción**: Contiene un marcador de posición `__API_URL__`. Este valor es reemplazado **automáticamente** por Netlify durante el proceso de despliegue.

---

## Despliegue (Deploy) en Netlify

El despliegue de este proyecto está **automatizado** a través de Netlify y GitHub.

### ¿Cómo funciona?

1.  **Activador**: Cada vez que se hace un `git push` a la rama `main`, Netlify detecta el cambio.
2.  **Construcción (Build)**: Netlify ejecuta el comando definido en el archivo `netlify.toml`.
    -   `command = "ng build --configuration production && sed -i 's|__API_URL__|'\"$API_URL\"'|g' dist/frontend/main.*.js"`
    -   Este comando primero compila la aplicación de Angular para producción y luego reemplaza el marcador `__API_URL__` con la variable de entorno `$API_URL` configurada en Netlify.
3.  **Publicación**: Netlify publica el contenido de la carpeta `dist/frontend`.

### Variable de Entorno en Netlify

Para que el despliegue funcione correctamente, es **crucial** que la siguiente variable de entorno esté configurada en el panel de Netlify:

-   **Key**: `API_URL`
-   **Value**: `http://api-nodejs-production-f88a.up.railway.app/api` (o la URL de producción final del backend).

Puedes encontrar esta configuración en:
`Netlify > Site settings > Build & deploy > Environment > Environment variables`.

**¡No es necesario hacer ningún despliegue manual!** Simplemente sube tus cambios a la rama `main` y Netlify se encargará del resto.



¿Dudas? Consulta este README o contacta al equipo de desarrollo.

