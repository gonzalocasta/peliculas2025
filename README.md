# peliculas2025

## Aplicación de Películas con API de TMDB

Esta aplicación web permite gestionar una colección de películas favoritas e integra la API de The Movie Database (TMDB) para obtener información de películas en tiempo real.

### ✅ Estado de la API

La API de TMDB está **correctamente configurada y conectada**:
- **API Key:** `e36380673a55edd20e2d16524a88153d`
- **Base URL:** `https://api.themoviedb.org/3`
- **Estado:** ✅ Verificada y funcionando

### Verificar Configuración

Para verificar que la API está correctamente configurada, ejecuta:

```bash
node verify-api-config.js
```

Este script verificará automáticamente:
- ✅ Configuración de la API key
- ✅ URLs de endpoints
- ✅ Funciones de servicio
- ✅ Integración en HTML

### Archivos Principales

- `config.js` - Configuración de la API de TMDB
- `api-service.js` - Servicios para interactuar con la API
- `script.js` - Lógica principal de la aplicación
- `index.html` - Aplicación principal
- `demo-api.html` - Demo interactivo para probar la API

### Probar la API

#### Opción 1: Demo Interactivo (Recomendado)
Abre `demo-api.html` en un navegador y prueba:
- Buscar películas por título
- Ver películas populares
- Obtener detalles de películas específicas

#### Opción 2: Consola del Navegador
1. Abre `index.html` en un navegador
2. Abre la consola de desarrollo (F12)
3. Ejecuta:
```javascript
// Obtener películas populares
getPopularMovies().then(movies => console.log(movies));

// Buscar películas
searchMovies('Matrix').then(results => console.log(results));
```

### Documentación

- 📄 [Estado de Conexión API](API_CONNECTION_STATUS.md) - Información detallada de la configuración
- 📄 [Verificación Completa](VERIFICACION_COMPLETA.md) - Resumen de la verificación realizada
- 📄 [Integración API](API_INTEGRATION.md) - Guía de integración y uso
- 📄 [Ejemplos](EXAMPLES.md) - Ejemplos de uso

### Estructura del Proyecto

```
peliculas2025/
├── config.js                    # Configuración de API
├── api-service.js              # Servicios de API
├── script.js                   # Lógica de la aplicación
├── index.html                  # Aplicación principal
├── demo-api.html              # Demo de API
├── verify-api-config.js       # Script de verificación
├── styles.css                 # Estilos
├── tests/
│   ├── api-connection-test.js # Tests de conexión API
│   ├── checks.js              # Tests principales
│   └── testutils.js           # Utilidades de test
└── files/                     # Imágenes y recursos
```

### Funciones de API Disponibles

```javascript
// Buscar películas por título
const resultados = await searchMovies('Titanic');

// Obtener películas populares
const populares = await getPopularMovies();

// Obtener detalles de una película
const detalles = await getMovieDetails(550); // ID de película

// Convertir formato TMDB a formato de la app
const pelicula = convertTMDBToAppFormat(tmdbMovie);
```

### Nota de Seguridad

⚠️ La API key está expuesta en el código del cliente para propósitos de demostración. En producción, considera usar un backend/proxy para proteger la clave.