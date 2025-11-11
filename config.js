// Configuración de API para The Movie Database (TMDB)
// IMPORTANTE: En producción, esta clave debería estar en variables de entorno
// y no ser expuesta en el código fuente del cliente

const API_CONFIG = {
    apiKey: 'e36380673a55edd20e2d16524a88153d',
    baseURL: 'https://api.themoviedb.org/3',
    imageBaseURL: 'https://image.tmdb.org/t/p/w500'
};

// Función para obtener la configuración de la API
const getAPIConfig = () => API_CONFIG;

// Función para crear headers con autorización
const getAuthHeaders = () => {
    return {
        'Authorization': `Bearer ${API_CONFIG.apiKey}`,
        'Content-Type': 'application/json;charset=utf-8'
    };
};
