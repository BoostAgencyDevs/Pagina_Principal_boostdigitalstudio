/**
 * @fileoverview Configuración de entorno de producción para Boost Agency
 * 
 * Este archivo contiene las variables de configuración específicas
 * para el entorno de producción de la aplicación Angular.
 * 
 * @author Boost Agency Development Team
 * @version 1.0.0
 */

/**
 * Configuración del entorno de producción
 * 
 * Variables disponibles:
 * - production: Indica si es entorno de producción (true para producción)
 * - apiUrl: URL base de la API backend en producción
 */
export const environment = {
  production: true,
  apiUrl: '__API_URL__' // Marcador de posición para la URL de la API
};
