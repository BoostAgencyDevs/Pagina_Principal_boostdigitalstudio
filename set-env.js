/**
 * @fileoverview Script para inyectar variables de entorno en Angular durante el despliegue.
 * @author Boost Agency Development Team
 * @version 1.1.0
 *
 * ------------------------------------------------------------------------------------------
 * ¿PARA QUÉ SIRVE ESTE ARCHIVO?
 * ------------------------------------------------------------------------------------------
 * Este script se ejecuta automáticamente durante el proceso de despliegue en Netlify.
 * Su única función es reemplazar un marcador de posición en el archivo de entorno de Angular
 * (`src/environments/environment.prod.ts`) con el valor real de la URL de la API.
 *
 * Esto nos permite manejar la URL de la API de forma segura y flexible, sin tener que
 * escribirla directamente en el código fuente.
 *
 * ------------------------------------------------------------------------------------------
 * ¿CÓMO CAMBIO LA URL DE LA API EN EL FUTURO?
 * ------------------------------------------------------------------------------------------
 * NO modifiques este archivo ni el código de Angular. Para cambiar la API, debes ir a:
 *
 * 1. Tu sitio en Netlify (https://app.netlify.com/).
 * 2. Ve a "Site settings" > "Build & deploy" > "Environment".
 * 3. Busca la variable llamada `API_URL` y edita su valor.
 * 4. Vuelve a desplegar el sitio para que los cambios se apliquen.
 * ------------------------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

// Ruta al archivo de entorno de producción
const envFile = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

// Lee la variable de entorno `API_URL` configurada en Netlify.
const apiUrl = process.env['API_URL'];

if (!apiUrl) {
  console.error('Error: La variable de entorno API_URL no está definida.');
  process.exit(1);
}

// Lee el archivo de entorno, reemplaza el marcador `__API_URL__` y guarda los cambios.
fs.readFile(envFile, 'utf8', (err, data) => {
  if (err) return console.error(err);
  const result = data.replace(/__API_URL__/g, apiUrl);
  fs.writeFile(envFile, result, 'utf8', (err) => err && console.error(err));
});