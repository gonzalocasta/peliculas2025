#!/usr/bin/env node
// Script de verificación de la configuración de la API de TMDB
// Este script verifica que la API está correctamente configurada con la clave proporcionada

const fs = require('fs');
const path = require('path');

console.log('=================================================');
console.log('Verificación de Configuración de API TMDB');
console.log('=================================================\n');

const API_KEY_ESPERADA = 'e36380673a55edd20e2d16524a88153d';
let todosOk = true;

// Verificar config.js
console.log('1. Verificando config.js...');
const configPath = path.join(__dirname, 'config.js');
try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Verificar que existe el archivo
    console.log('   ✓ Archivo config.js existe');
    
    // Verificar la API key
    if (configContent.includes(API_KEY_ESPERADA)) {
        console.log(`   ✓ API Key correcta: ${API_KEY_ESPERADA}`);
    } else {
        console.log(`   ✗ API Key incorrecta o no encontrada`);
        console.log(`   Se esperaba: ${API_KEY_ESPERADA}`);
        todosOk = false;
    }
    
    // Verificar baseURL
    if (configContent.includes('https://api.themoviedb.org/3')) {
        console.log('   ✓ Base URL correcta: https://api.themoviedb.org/3');
    } else {
        console.log('   ✗ Base URL incorrecta o no encontrada');
        todosOk = false;
    }
    
    // Verificar imageBaseURL
    if (configContent.includes('https://image.tmdb.org/t/p/w500')) {
        console.log('   ✓ Image Base URL correcta: https://image.tmdb.org/t/p/w500');
    } else {
        console.log('   ✗ Image Base URL incorrecta o no encontrada');
        todosOk = false;
    }
    
    // Verificar función getAPIConfig
    if (configContent.includes('getAPIConfig')) {
        console.log('   ✓ Función getAPIConfig() definida');
    } else {
        console.log('   ✗ Función getAPIConfig() no encontrada');
        todosOk = false;
    }
    
    // Verificar función getAuthHeaders
    if (configContent.includes('getAuthHeaders')) {
        console.log('   ✓ Función getAuthHeaders() definida');
    } else {
        console.log('   ✗ Función getAuthHeaders() no encontrada');
        todosOk = false;
    }
    
} catch (err) {
    console.log(`   ✗ Error al leer config.js: ${err.message}`);
    todosOk = false;
}

// Verificar api-service.js
console.log('\n2. Verificando api-service.js...');
const servicePath = path.join(__dirname, 'api-service.js');
try {
    const serviceContent = fs.readFileSync(servicePath, 'utf8');
    
    console.log('   ✓ Archivo api-service.js existe');
    
    // Verificar funciones principales
    const funciones = [
        'searchMovies',
        'getPopularMovies',
        'getMovieDetails',
        'convertTMDBToAppFormat'
    ];
    
    funciones.forEach(func => {
        if (serviceContent.includes(func)) {
            console.log(`   ✓ Función ${func}() definida`);
        } else {
            console.log(`   ✗ Función ${func}() no encontrada`);
            todosOk = false;
        }
    });
    
    // Verificar que usa getAPIConfig
    if (serviceContent.includes('getAPIConfig()')) {
        console.log('   ✓ Usa getAPIConfig() para obtener configuración');
    } else {
        console.log('   ✗ No usa getAPIConfig()');
        todosOk = false;
    }
    
    // Verificar que incluye api_key en las peticiones
    if (serviceContent.includes('api_key=${config.apiKey}')) {
        console.log('   ✓ Incluye api_key en las peticiones');
    } else {
        console.log('   ✗ No incluye api_key en las peticiones');
        todosOk = false;
    }
    
} catch (err) {
    console.log(`   ✗ Error al leer api-service.js: ${err.message}`);
    todosOk = false;
}

// Verificar index.html
console.log('\n3. Verificando index.html...');
const indexPath = path.join(__dirname, 'index.html');
try {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    console.log('   ✓ Archivo index.html existe');
    
    // Verificar que incluye config.js
    if (indexContent.includes('config.js')) {
        console.log('   ✓ Incluye config.js');
    } else {
        console.log('   ✗ No incluye config.js');
        todosOk = false;
    }
    
    // Verificar que incluye api-service.js
    if (indexContent.includes('api-service.js')) {
        console.log('   ✓ Incluye api-service.js');
    } else {
        console.log('   ✗ No incluye api-service.js');
        todosOk = false;
    }
    
} catch (err) {
    console.log(`   ✗ Error al leer index.html: ${err.message}`);
    todosOk = false;
}

// Verificar demo-api.html
console.log('\n4. Verificando demo-api.html...');
const demoPath = path.join(__dirname, 'demo-api.html');
try {
    const demoContent = fs.readFileSync(demoPath, 'utf8');
    
    console.log('   ✓ Archivo demo-api.html existe (para pruebas de API)');
    
    if (demoContent.includes('config.js') && demoContent.includes('api-service.js')) {
        console.log('   ✓ Demo incluye archivos de configuración');
    }
    
} catch (err) {
    console.log(`   ⚠ demo-api.html no encontrado (opcional)`);
}

// Resultado final
console.log('\n=================================================');
if (todosOk) {
    console.log('✓ VERIFICACIÓN EXITOSA');
    console.log('=================================================');
    console.log('\nLa API está correctamente configurada:');
    console.log(`  • API Key: ${API_KEY_ESPERADA}`);
    console.log('  • Base URL: https://api.themoviedb.org/3');
    console.log('  • Image URL: https://image.tmdb.org/t/p/w500');
    console.log('\nPara probar la conexión, abre demo-api.html en un navegador.');
    console.log('=================================================\n');
    process.exit(0);
} else {
    console.log('✗ VERIFICACIÓN FALLIDA');
    console.log('=================================================');
    console.log('\nSe encontraron problemas en la configuración.');
    console.log('Por favor revisa los errores arriba.\n');
    process.exit(1);
}
