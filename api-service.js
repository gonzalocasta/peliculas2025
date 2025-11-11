// Servicio de API para The Movie Database (TMDB)

// Función para buscar películas por título
const searchMovies = async (query) => {
    try {
        const config = getAPIConfig();
        const url = `${config.baseURL}/search/movie?query=${encodeURIComponent(query)}&api_key=${config.apiKey}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error en la búsqueda: ${response.status}`);
        }
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al buscar películas:', error);
        throw error;
    }
};

// Función para obtener películas populares
const getPopularMovies = async () => {
    try {
        const config = getAPIConfig();
        const url = `${config.baseURL}/movie/popular?api_key=${config.apiKey}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener películas populares: ${response.status}`);
        }
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al obtener películas populares:', error);
        throw error;
    }
};

// Función para obtener detalles de una película por ID
const getMovieDetails = async (movieId) => {
    try {
        const config = getAPIConfig();
        const url = `${config.baseURL}/movie/${movieId}?api_key=${config.apiKey}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener detalles de la película: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
        throw error;
    }
};

// Función para convertir película de TMDB al formato de la aplicación
const convertTMDBToAppFormat = (tmdbMovie) => {
    const config = getAPIConfig();
    return {
        titulo: tmdbMovie.title || tmdbMovie.original_title || 'Sin título',
        director: 'N/A', // TMDB requiere otra llamada para obtener el director
        miniatura: tmdbMovie.poster_path 
            ? `${config.imageBaseURL}${tmdbMovie.poster_path}` 
            : 'files/placeholder.png'
    };
};
