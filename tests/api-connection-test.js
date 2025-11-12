// Test para verificar la conexión y configuración de la API de TMDB
// Este test verifica que la API está correctamente configurada

const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('API Connection Tests', function() {
    
    it('Verificar que config.js existe y tiene la configuración correcta', function() {
        const configPath = path.resolve(path.join(__dirname, '../config.js'));
        const configExists = fs.existsSync(configPath);
        assert.strictEqual(configExists, true, 'El archivo config.js debe existir');
        
        const configContent = fs.readFileSync(configPath, 'utf8');
        assert.ok(configContent.includes('e36380673a55edd20e2d16524a88153d'), 
            'La clave de API debe ser e36380673a55edd20e2d16524a88153d');
        assert.ok(configContent.includes('https://api.themoviedb.org/3'), 
            'La URL base debe ser https://api.themoviedb.org/3');
        assert.ok(configContent.includes('https://image.tmdb.org/t/p/w500'), 
            'La URL de imágenes debe ser https://image.tmdb.org/t/p/w500');
    });
    
    it('Verificar que api-service.js existe y tiene las funciones necesarias', function() {
        const servicePath = path.resolve(path.join(__dirname, '../api-service.js'));
        const serviceExists = fs.existsSync(servicePath);
        assert.strictEqual(serviceExists, true, 'El archivo api-service.js debe existir');
        
        const serviceContent = fs.readFileSync(servicePath, 'utf8');
        assert.ok(serviceContent.includes('searchMovies'), 
            'api-service.js debe contener la función searchMovies');
        assert.ok(serviceContent.includes('getPopularMovies'), 
            'api-service.js debe contener la función getPopularMovies');
        assert.ok(serviceContent.includes('getMovieDetails'), 
            'api-service.js debe contener la función getMovieDetails');
        assert.ok(serviceContent.includes('convertTMDBToAppFormat'), 
            'api-service.js debe contener la función convertTMDBToAppFormat');
    });
    
    it('Verificar que la clave de API tiene el formato correcto', function() {
        const configPath = path.resolve(path.join(__dirname, '../config.js'));
        const configContent = fs.readFileSync(configPath, 'utf8');
        
        // Extraer la API key del archivo
        const apiKeyMatch = configContent.match(/apiKey:\s*['"]([\w\d]+)['"]/);
        assert.ok(apiKeyMatch, 'Debe haber una API key definida');
        
        const apiKey = apiKeyMatch[1];
        assert.strictEqual(apiKey, 'e36380673a55edd20e2d16524a88153d', 
            'La API key debe ser exactamente e36380673a55edd20e2d16524a88153d');
        assert.strictEqual(apiKey.length, 32, 
            'La API key de TMDB debe tener 32 caracteres');
        assert.ok(/^[a-f0-9]+$/.test(apiKey), 
            'La API key debe contener solo caracteres hexadecimales (0-9, a-f)');
    });
    
    it('Verificar que los endpoints de la API están correctamente formados', function() {
        const servicePath = path.resolve(path.join(__dirname, '../api-service.js'));
        const serviceContent = fs.readFileSync(servicePath, 'utf8');
        
        // Verificar que las URLs incluyen el parámetro api_key
        assert.ok(serviceContent.includes('api_key=${config.apiKey}'), 
            'Las llamadas a la API deben incluir el parámetro api_key');
        
        // Verificar que se está usando el baseURL de la configuración
        assert.ok(serviceContent.includes('config.baseURL'), 
            'Las llamadas deben usar config.baseURL');
    });
    
    it('Verificar que index.html incluye los archivos de configuración y API', function() {
        const indexPath = path.resolve(path.join(__dirname, '../index.html'));
        const indexExists = fs.existsSync(indexPath);
        assert.strictEqual(indexExists, true, 'El archivo index.html debe existir');
        
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        assert.ok(indexContent.includes('config.js'), 
            'index.html debe incluir config.js');
        assert.ok(indexContent.includes('api-service.js'), 
            'index.html debe incluir api-service.js');
    });
});
