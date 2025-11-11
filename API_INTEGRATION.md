# Integración con The Movie Database (TMDB) API

## Configuración de la API

Esta aplicación ahora está integrada con The Movie Database (TMDB) API para obtener información de películas.

### Archivos de Configuración

1. **config.js** - Contiene la configuración de la API:
   - `apiKey`: Clave de API de TMDB
   - `baseURL`: URL base de la API de TMDB
   - `imageBaseURL`: URL base para las imágenes
   - Función `getAuthHeaders()`: Retorna los headers de autorización necesarios

2. **api-service.js** - Servicio para interactuar con la API de TMDB:
   - `searchMovies(query)`: Busca películas por título
   - `getPopularMovies()`: Obtiene películas populares
   - `getMovieDetails(movieId)`: Obtiene detalles de una película específica
   - `convertTMDBToAppFormat(tmdbMovie)`: Convierte el formato de TMDB al formato de la aplicación

### Autenticación

La autenticación con TMDB se realiza mediante:
- **Header Authorization**: `Bearer {API_KEY}`
- **Query Parameter**: `api_key={API_KEY}`

Ejemplo de uso:
```javascript
// Obtener películas populares
const peliculas = await getPopularMovies();

// Buscar películas por título
const resultados = await searchMovies('Titanic');

// Obtener detalles de una película
const detalles = await getMovieDetails(550);
```

### Seguridad

⚠️ **IMPORTANTE**: La clave de API actual está expuesta en el código fuente para propósitos de demostración. En un entorno de producción, deberías:

1. **Usar variables de entorno**: Almacenar la clave en un archivo `.env`
2. **Backend proxy**: Crear un servidor backend que maneje las llamadas a la API
3. **Restricciones de dominio**: Configurar restricciones en la consola de TMDB
4. **Rate limiting**: Implementar limitación de tasa de peticiones

### Ejemplo de implementación segura

```javascript
// En lugar de exponer la clave en el cliente:
// NO HACER: const apiKey = 'e36380673a55edd20e2d16524a88153d';

// HACER: Usar un backend
const response = await fetch('/api/movies/popular');
const data = await response.json();
```

### Recursos

- [Documentación de TMDB API](https://developers.themoviedb.org/3)
- [Obtener una clave de API](https://www.themoviedb.org/settings/api)
- [Ejemplos de uso](https://developers.themoviedb.org/3/getting-started/introduction)
