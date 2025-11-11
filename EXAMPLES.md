# Ejemplos de Uso - TMDB API

## Uso Básico

### 1. Buscar Películas
```javascript
// Buscar películas por título
const buscarPelicula = async (titulo) => {
    try {
        const resultados = await searchMovies(titulo);
        console.log(`Encontradas ${resultados.length} películas`);
        resultados.forEach(movie => {
            console.log(`- ${movie.title} (${movie.release_date})`);
        });
        return resultados;
    } catch (error) {
        console.error('Error al buscar:', error);
    }
};

// Ejemplo de uso
buscarPelicula('Titanic');
```

### 2. Obtener Películas Populares
```javascript
// Obtener las películas más populares
const mostrarPopulares = async () => {
    try {
        const populares = await getPopularMovies();
        console.log('Top 5 Películas Populares:');
        populares.slice(0, 5).forEach((movie, index) => {
            console.log(`${index + 1}. ${movie.title} - ⭐ ${movie.vote_average}/10`);
        });
        return populares;
    } catch (error) {
        console.error('Error:', error);
    }
};

// Ejemplo de uso
mostrarPopulares();
```

### 3. Obtener Detalles de una Película
```javascript
// Obtener información detallada de una película específica
const mostrarDetalles = async (movieId) => {
    try {
        const pelicula = await getMovieDetails(movieId);
        console.log('Detalles de la película:');
        console.log(`Título: ${pelicula.title}`);
        console.log(`Fecha: ${pelicula.release_date}`);
        console.log(`Duración: ${pelicula.runtime} minutos`);
        console.log(`Valoración: ${pelicula.vote_average}/10`);
        console.log(`Descripción: ${pelicula.overview}`);
        return pelicula;
    } catch (error) {
        console.error('Error:', error);
    }
};

// Ejemplo: Obtener detalles de "Fight Club" (ID: 550)
mostrarDetalles(550);
```

## Integración con la Aplicación Existente

### Ejemplo: Agregar película desde TMDB
```javascript
// Buscar y agregar una película desde TMDB a la colección local
const agregarDesdeTMDB = async (titulo) => {
    try {
        // Buscar la película en TMDB
        const resultados = await searchMovies(titulo);
        
        if (resultados.length === 0) {
            alert('No se encontraron películas con ese título');
            return;
        }
        
        // Tomar la primera película encontrada
        const movieTMDB = resultados[0];
        
        // Convertir al formato de la aplicación
        const nuevaPelicula = convertTMDBToAppFormat(movieTMDB);
        
        // Agregar a la colección local
        peliculas.push(nuevaPelicula);
        await updateAPI(peliculas);
        
        // Actualizar la vista
        indexContr();
        
        console.log(`Película "${nuevaPelicula.titulo}" agregada exitosamente`);
    } catch (error) {
        console.error('Error al agregar película:', error);
        alert('Error al agregar la película desde TMDB');
    }
};

// Ejemplo de uso
agregarDesdeTMDB('Matrix');
```

### Ejemplo: Enriquecer películas existentes con datos de TMDB
```javascript
// Actualizar la información de películas locales con datos de TMDB
const enriquecerConTMDB = async (peliculaLocal) => {
    try {
        // Buscar la película en TMDB
        const resultados = await searchMovies(peliculaLocal.titulo);
        
        if (resultados.length > 0) {
            const movieTMDB = resultados[0];
            const config = getAPIConfig();
            
            // Actualizar con datos de TMDB
            return {
                ...peliculaLocal,
                miniatura: movieTMDB.poster_path 
                    ? `${config.imageBaseURL}${movieTMDB.poster_path}`
                    : peliculaLocal.miniatura,
                valoracion: movieTMDB.vote_average,
                fecha: movieTMDB.release_date,
                descripcion: movieTMDB.overview
            };
        }
        
        return peliculaLocal;
    } catch (error) {
        console.error('Error al enriquecer película:', error);
        return peliculaLocal;
    }
};
```

## Verificación de Autenticación

### Probar la conexión con TMDb API

Antes de empezar a trabajar con la API, es recomendable verificar que tu clave de API funciona correctamente. Puedes hacer esto probando el endpoint de autenticación:

```javascript
// Verificar que la autenticación está configurada correctamente
const probarAutenticacion = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        };
        
        const response = await fetch('https://api.themoviedb.org/3/authentication', options);
        const data = await response.json();
        
        console.log('Estado de autenticación:', data);
        console.log('✓ Conexión exitosa con TMDb API');
        return data;
    } catch (error) {
        console.error('Error al conectar con TMDb:', error);
        throw error;
    }
};

// Ejecutar prueba
probarAutenticacion()
    .then(response => console.log(response))
    .catch(err => console.error(err));
```

Este ejemplo muestra cómo hacer una solicitud GET utilizando `fetch()`, que es un método nativo de JavaScript para manejar solicitudes HTTP. La URL de la solicitud apunta al endpoint de autenticación de TMDb. En el `headers`, se incluye el encabezado `accept: 'application/json'` para especificar el formato de la respuesta que se espera.

Puedes probar este fragmento de código en la consola de tu navegador o integrarlo en tu proyecto para verificar que tu clave de API funciona correctamente.

### Verificación avanzada con función del proyecto

```javascript
// Usar la función incluida en api-service.js
const verificarConexion = async () => {
    try {
        const resultado = await testAuthentication();
        console.log('Autenticación exitosa:', resultado);
        console.log('Status:', resultado.status_message);
    } catch (error) {
        console.error('Error de autenticación:', error);
    }
};

// Ejecutar
verificarConexion();
```

### Verificación de configuración completa

```javascript
// Verificar que la autenticación está configurada correctamente
const verificarAutenticacion = () => {
    const config = getAPIConfig();
    const headers = getAuthHeaders();
    
    console.log('Configuración de API:');
    console.log('- Base URL:', config.baseURL);
    console.log('- API Key:', config.apiKey.substring(0, 10) + '...');
    console.log('- Authorization Header:', headers.Authorization.substring(0, 20) + '...');
    console.log('✓ Autenticación configurada correctamente');
};

// Ejecutar verificación
verificarAutenticacion();
```

## Probar en la Consola del Navegador

Abre la consola del navegador (F12) y ejecuta:

```javascript
// 1. Verificar configuración
verificarAutenticacion();

// 2. Buscar una película
searchMovies('Inception').then(movies => console.log(movies));

// 3. Obtener populares
getPopularMovies().then(movies => console.log(movies));

// 4. Obtener detalles
getMovieDetails(550).then(movie => console.log(movie));
```

## Manejo de Errores

```javascript
// Ejemplo de manejo robusto de errores
const buscarConManejodeErrores = async (titulo) => {
    if (!titulo || titulo.trim() === '') {
        console.error('Debe proporcionar un título válido');
        return null;
    }
    
    try {
        const resultados = await searchMovies(titulo);
        
        if (resultados.length === 0) {
            console.warn(`No se encontraron resultados para "${titulo}"`);
            return [];
        }
        
        return resultados;
    } catch (error) {
        if (error.message.includes('404')) {
            console.error('Película no encontrada');
        } else if (error.message.includes('401')) {
            console.error('Error de autenticación - Verifica la API key');
        } else if (error.message.includes('429')) {
            console.error('Demasiadas peticiones - Espera un momento');
        } else {
            console.error('Error inesperado:', error.message);
        }
        return null;
    }
};
```

## Notas Importantes

1. **CORS**: Si ejecutas desde un archivo local (`file://`), es posible que encuentres errores de CORS. Usa un servidor HTTP local.

2. **Rate Limiting**: TMDB tiene límites de tasa. No hagas demasiadas peticiones en poco tiempo.

3. **API Key**: En producción, nunca expongas la API key en el código del cliente. Usa un backend.

4. **Cache**: Considera implementar cache para reducir peticiones repetidas.

5. **Pruebas**: Usa `demo-api.html` para probar todas las funciones antes de integrarlas.
