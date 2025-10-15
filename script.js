// --- script.js - Refactor profesional

// Modelo de datos: constantes y estado
const PELICULAS_INICIALES = [
    { titulo: 'Superlópez', director: 'Javier Ruiz Caldera', miniatura: 'files/superlopez.png' },
    { titulo: 'Jurassic Park', director: 'Steven Spielberg', miniatura: 'files/jurassicpark.png' },
    { titulo: 'Interstellar', director: 'Christopher Nolan', miniatura: 'files/interstellar.png' }
];

let peliculas = [];

// --- Persistencia (usar localStorage para evitar errores de red/CORS)
const STORAGE_KEY = 'peliculas';

const getAPI = async () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (err) {
        console.error('getAPI (localStorage) error', err);
        alert('No se ha podido leer la información local. Comprueba el almacenamiento del navegador.');
        return [];
    }
};

const updateAPI = async (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
        console.error('updateAPI (localStorage) error', err);
        alert('No se ha podido guardar la información localmente.');
    }
};

// --- Vistas (devuelven HTML strings)
const indexView = (items) => `
    ${items.map((p, i) => `
        <div class="movie">
            <div class="movie-img">
                <img class="show" data-my-id="${i}" src="${p.miniatura}" alt="${escapeHtml(p.titulo)}" onerror="this.src='files/placeholder.png'" />
            </div>
            <div class="title">${escapeHtml(p.titulo) || '<em>Sin título</em>'}</div>
            <div class="actions">
                <button class="edit" data-my-id="${i}">Editar</button>
                <button class="delete" data-my-id="${i}">Borrar</button>
            </div>
        </div>
    `).join('')}
    <div class="actions">
        <button class="new">Añadir</button>
        <button class="reset">Reset</button>
    </div>
`;

const editView = (i, p) => `
    <h2>Editar Película</h2>
    <div class="field">Título<br><input type="text" id="titulo" value="${escapeHtml(p.titulo)}" /></div>
    <div class="field">Director<br><input type="text" id="director" value="${escapeHtml(p.director)}" /></div>
    <div class="field">Miniatura<br><input type="text" id="miniatura" value="${escapeHtml(p.miniatura)}" /></div>
    <div class="actions">
        <button class="update" data-my-id="${i}">Actualizar</button>
        <button class="index">Volver</button>
    </div>
`;

const showView = (p) => `
    <h2>${escapeHtml(p.titulo) || '<em>Sin título</em>'}</h2>
    <div><img src="${escapeHtml(p.miniatura)}" onerror="this.src='files/placeholder.png'" style="max-width:300px"/></div>
    <p><strong>Director:</strong> ${escapeHtml(p.director) || '<em>Sin director</em>'}</p>
    <div class="actions"><button class="index">Volver</button></div>
`;

const newView = () => `
    <h2>Crear Película</h2>
    <div class="field">Título<br><input type="text" id="titulo" placeholder="Título" /></div>
    <div class="field">Director<br><input type="text" id="director" placeholder="Director" /></div>
    <div class="field">Miniatura<br><input type="text" id="miniatura" placeholder="URL de la miniatura" /></div>
    <div class="actions">
        <button class="create">Crear</button>
        <button class="index">Volver</button>
    </div>
`;

// --- Helpers
function render(html) {
    const target = document.getElementById('main');
    if (target) target.innerHTML = html;
}

function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// --- Controladores
const initContr = async () => {
    // Inicializar almacenamiento local si está vacío
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            // guardar estado inicial
            localStorage.setItem(STORAGE_KEY, JSON.stringify(PELICULAS_INICIALES));
        }
    } catch (err) {
        console.error('initContr error', err);
    }
    indexContr();
};

const indexContr = async () => {
    peliculas = await getAPI() || PELICULAS_INICIALES.slice();
    render(indexView(peliculas));
};

const showContr = (i) => {
    const p = peliculas[i];
    if (!p) return indexContr();
    render(showView(p));
};

const newContr = () => render(newView());

const createContr = async () => {
    const titulo = document.getElementById('titulo').value.trim();
    const director = document.getElementById('director').value.trim();
    const miniatura = document.getElementById('miniatura').value.trim();
    if (!titulo) { alert('Introduce al menos un título'); return; }
    peliculas.push({ titulo, director, miniatura });
    await updateAPI(peliculas);
    indexContr();
};

const editContr = (i) => {
    const p = peliculas[i];
    if (!p) return indexContr();
    render(editView(i, p));
};

const updateContr = async (i) => {
    peliculas[i].titulo = document.getElementById('titulo').value.trim();
    peliculas[i].director = document.getElementById('director').value.trim();
    peliculas[i].miniatura = document.getElementById('miniatura').value.trim();
    await updateAPI(peliculas);
    indexContr();
};

const deleteContr = async (i) => {
    if (!Number.isFinite(i)) return;
    if (!confirm('¿Seguro que quieres borrar esta película?')) return;
    peliculas.splice(i, 1);
    await updateAPI(peliculas);
    indexContr();
};

const resetContr = async () => {
    if (!confirm('¿Seguro que quieres reiniciar la lista de películas?')) return;
    peliculas = PELICULAS_INICIALES.slice();
    await updateAPI(peliculas);
    indexContr();
};

// --- Router de eventos (delegation)
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener('click', (ev) => {
    if (matchEvent(ev, '.index')) indexContr();
    else if (matchEvent(ev, '.edit')) editContr(myId(ev));
    else if (matchEvent(ev, '.update')) updateContr(myId(ev));
    else if (matchEvent(ev, '.show')) showContr(myId(ev));
    else if (matchEvent(ev, '.new')) newContr();
    else if (matchEvent(ev, '.create')) createContr();
    else if (matchEvent(ev, '.delete')) deleteContr(myId(ev));
    else if (matchEvent(ev, '.reset')) resetContr();
});

// Inicialización
document.addEventListener('DOMContentLoaded', initContr);
