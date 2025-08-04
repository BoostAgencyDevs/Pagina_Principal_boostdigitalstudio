# Frontend-BOOST-AGENCY
Frontend

# Despliegue del Frontend Angular en Netlify

## Estructura del Proyecto

- `/frontend`: Aplicación Angular (solo esta carpeta se despliega en Netlify)
- `/backend`: API Node.js (se despliega por separado, por ejemplo en Railway)

---

## 🛒 MEJORAS IMPLEMENTADAS EN LA TIENDA (Agosto 2025)

### **Sistema de Carrito Completo**
- ✅ **Modal de carrito separado**: Componente independiente con HTML, CSS y TS
- ✅ **Gestión de cantidades**: Botones + y - perfectamente centrados
- ✅ **Persistencia en localStorage**: El carrito se mantiene entre sesiones
- ✅ **Cálculo automático**: Subtotal, impuestos (19% IVA) y total
- ✅ **Eliminación de productos**: Botón de eliminar individual
- ✅ **Carrito vacío**: Mensaje informativo cuando no hay productos

### **Sistema de Monedas por Ubicación**
- ✅ **Detección automática**: Basada en el idioma del navegador
- ✅ **Monedas soportadas**: USD, COP (Colombia), EUR, MXN (México), ARS (Argentina)
- ✅ **Selector de moneda**: En el panel de control lateral
- ✅ **Formato localizado**: Separadores de miles y decimales según región
- ✅ **Persistencia**: La moneda seleccionada se guarda en localStorage

#### **Detección Automática por País:**
- **Español (es-CO)**: Peso Colombiano (COP) - $4,000,000
- **Español (es-MX)**: Peso Mexicano (MXN) - $18,000
- **Español (es-AR)**: Peso Argentino (ARS) - $100,000
- **Español (es)**: Por defecto Peso Colombiano (COP)
- **Inglés**: Dólar Estadounidense (USD) - $1.00
- **Otros**: Euro (EUR) - €0,85

### **Integración con Stripe**
- ✅ **Botones de compra**: En modal de producto y carrito completo
- ✅ **Simulación completa**: Preparado para conexión real con Stripe
- ✅ **Datos estructurados**: Productos, cantidades, metadatos
- ✅ **URLs de retorno**: Success y cancel configuradas
- ✅ **Documentación**: Archivos STRIPE_INTEGRATION.md y STRIPE_SETUP.md

### **Mejoras de Accesibilidad**
- ✅ **Alt text en imágenes**: Descriptivo y accesible
- ✅ **Title attributes**: En botones e imágenes
- ✅ **Navegación por teclado**: Todos los elementos son accesibles
- ✅ **Contraste adecuado**: Cumple estándares WCAG

### **Efectos de Sonido Profesionales**
- ✅ **Sonidos elegantes**: Usando Web Audio API
- ✅ **Feedback auditivo**: Para categorías, modales, carrito y compras
- ✅ **Sonido de gota**: Para selección de categorías
- ✅ **Sonidos de compra**: Para confirmación de transacciones

### **Estructura Técnica Implementada**

#### **Componentes Creados:**
- `CarritoModalComponent`: Modal completo del carrito
- `CurrencyService`: Servicio de gestión de monedas

#### **Archivos de Documentación:**
- `STRIPE_INTEGRATION.md`: Documentación completa de integración
- `STRIPE_SETUP.md`: Guía rápida de configuración

#### **Funcionalidades Clave:**
- **Panel lateral derecho**: Filtros, búsqueda, selector de moneda, carrito
- **Modal de producto**: Imagen, descripción, botones de compra
- **Carrito completo**: Gestión de cantidades, eliminación, totales
- **Responsive design**: Funciona en todas las pantallas
- **Animaciones**: Efectos suaves y profesionales

---

## 🎨 OPTIMIZACIONES DE RESPONSIVE DESIGN (ÚLTIMAS ACTUALIZACIONES)

### **Metodología Desktop-First Implementada**
- **Breakpoints utilizados:** `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1920px+)
- **Contenedor global:** `max-w-[1800px] mx-auto` para consistencia en todas las pantallas
- **Padding lateral uniforme:** `px-4 md:px-6 lg:px-8 xl:px-12 3xl:px-16`

### **Optimizaciones Específicas por Breakpoint**

#### **LG (1024px) - Pantallas de Escritorio Pequeñas**
- **Tipografía ajustada:** Títulos reducidos de `text-5xl` a `text-3xl`
- **Botones optimizados:** Padding reducido a `px-4 py-2` para evitar desborde
- **Contenedores:** Espaciado interno ajustado a `p-4` y gaps a `gap-3`

#### **XL+ (1280px+) - Pantallas Grandes**
- **Botones estandarizados:** Ancho fijo `w-48 xl:w-52 3xl:w-56`
- **Espaciado profesional:** Gaps entre elementos `gap-6 xl:gap-8 3xl:gap-10`
- **Tipografía escalada:** Textos adaptados para mejor legibilidad

#### **3XL (1920px+) - Pantallas de Alta Resolución**
- **Contenido optimizado:** Espaciado lateral de solo 20px (`3xl:px-5`)
- **Máximo aprovechamiento:** Eliminación de `max-w-[1920px]` para ocupar más ancho
- **Experiencia premium:** Contenido adaptado para monitores de alta resolución

### **Componentes Optimizados**
- ✅ **Header:** Breakpoint móvil cambiado de `lg` a `xl` para mejor experiencia en tablets
- ✅ **Inicio:** Todas las secciones (Hero, Diseño Estratégico, Futuro Digital, Slogan + Botones, Blog, Estadísticas, Newsletter)
- ✅ **Layout:** Alineación consistente entre header, body y footer
- ✅ **Botones:** Estandarización de tamaños y efectos hover
- ✅ **Tienda:** Sistema completo de carrito, monedas y Stripe

### **Características Técnicas**
- **HTML Structure Preservation:** Solo se modificaron clases CSS, sin alterar estructura
- **Funcionalidad Intacta:** Todas las animaciones y efectos mantienen su comportamiento
- **Performance Optimized:** Clases Tailwind optimizadas para mejor rendimiento

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
2. Haz clic en "Add new site" > "Deploy manually".
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

---

## Configuración de Stripe (Opcional)

Para activar los pagos en la tienda, sigue estos pasos:

### 1. Instalar Dependencias
```bash
npm install @stripe/stripe-js
```

### 2. Configurar Variables de Entorno
Crea `src/environments/stripe.ts`:
```typescript
export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_TU_CLAVE_AQUI',
  currency: 'usd',
  successUrl: 'https://tudominio.com/success',
  cancelUrl: 'https://tudominio.com/tienda'
};
```

### 3. Backend (Node.js)
Crea un servidor simple para manejar las sesiones de Stripe:
```javascript
const express = require('express');
const stripe = require('stripe')('sk_test_TU_CLAVE_SECRETA');

app.post('/api/create-checkout-session', async (req, res) => {
  // Lógica de creación de sesión
});
```

### 4. Documentación Completa
Consulta los archivos:
- `STRIPE_INTEGRATION.md`: Documentación técnica completa
- `STRIPE_SETUP.md`: Guía rápida de configuración

¿Dudas? Consulta este README o contacta al equipo de desarrollo.


## Cambios recientes (Junio 2024)

- Ajuste en la Franja 1 de la página de inicio para tablets pequeñas: imagen y texto más pequeños, margen eliminado, y luego texto ligeramente aumentado para mejor legibilidad. No se modificaron móviles ni desktop.
- Panel de control de la tienda ahora aparece al inicio en móviles. Footer de la tienda optimizado para tablets mini con diseño especial. Desktop y móviles no fueron modificados.
- Todos los cambios documentados en `DOCUMENTACION_BOOST_AGENCY.md`.

