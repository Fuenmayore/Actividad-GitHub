// Clave de API para acceder a The Movie Database (TMDb)
const API_KEY = 'c33f82d9adcdcdceeab0b654af70c58a';  
// URL base para obtener las películas populares
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;
// URL base para las imágenes de las películas
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
// URL para obtener la lista de géneros de películas
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-ES`;

// Variables para almacenar los gráficos de películas más populares y mejor calificadas
let mostPopularChart, topRatedChart;

/**
 * Función para obtener las películas populares.
 * Permite filtrar las películas por género.
 * @param {string} genreId - ID del género para filtrar las películas (opcional).
 */
async function getPopularMovies(genreId = "") {
    let url = genreId ? 
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc&with_genres=${genreId}` 
        : API_URL;

    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results); // Muestra las películas obtenidas
}

/**
 * Función para mostrar las películas en la página.
 * @param {Array} movies - Lista de películas a mostrar.
 */
function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = ''; // Limpia el contenedor de películas

    // Crea elementos para cada película y los agrega al contenedor
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const moviePoster = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';

        movieElement.innerHTML = `
            <img src="${moviePoster}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>Calificación: ${movie.vote_average}</p>
            <button class="btn btn-primary" onclick="displayMovieDetails(${movie.id})" data-bs-toggle="modal" data-bs-target="#movieModal">Ver Detalles</button>
        `;

        moviesContainer.appendChild(movieElement); // Agrega la película al contenedor
    });
}

/**
 * Función para obtener los detalles de una película por su ID.
 * @param {number} movieId - ID de la película a obtener.
 * @returns {Promise<Object>} - Detalles de la película.
 */
async function getMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;
    const response = await fetch(url);
    return await response.json(); // Retorna los detalles de la película
}

/**
 * Función para obtener el tráiler de una película por su ID.
 * @param {number} movieId - ID de la película para obtener el tráiler.
 * @returns {Promise<Object>} - Objeto del tráiler de la película.
 */
async function getMovieTrailer(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer'); // Retorna el tráiler de YouTube
}

/**
 * Función para mostrar los detalles de una película en un modal.
 * @param {number} movieId - ID de la película a mostrar.
 */
async function displayMovieDetails(movieId) {
    const movie = await getMovieDetails(movieId);
    const trailer = await getMovieTrailer(movieId);
    const movieDetails = document.getElementById('movie-details');

    const trailerEmbed = trailer ? 
        `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>` : 
        '<p>No hay tráiler disponible.</p>';

    // Muestra los detalles de la película en el modal
    movieDetails.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${IMAGE_BASE_URL}${movie.poster_path}" class="img-fluid" alt="${movie.title}">
            </div>
            <div class="col-md-8">
                <h5>${movie.title}</h5>
                <p>${movie.overview}</p>
                <p><small class="text-muted">Calificación: ${movie.vote_average}</small></p>
                <p><small class="text-muted">Fecha de Estreno: ${movie.release_date}</small></p>
                <h6>Tráiler:</h6>
                ${trailerEmbed}
            </div>
        </div>
    `;
}

/**
 * Función para obtener la lista de géneros de películas.
 */
async function getGenres() {
    const response = await fetch(GENRE_URL);
    const data = await response.json();
    const genreSelect = document.getElementById('genre-select');

    // Agrega los géneros al elemento select
    data.genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });

    // Agrega evento para filtrar películas por género
    genreSelect.addEventListener('change', () => {
        const selectedGenre = genreSelect.value;
        getPopularMovies(selectedGenre); // Filtra las películas según el género seleccionado
    });
}

/**
 * Función para obtener las películas mejor calificadas en un rango de fechas.
 * @param {string} startDate - Fecha de inicio para filtrar las películas.
 * @param {string} endDate - Fecha de fin para filtrar las películas.
 * @returns {Promise<Array>} - Lista de películas mejor calificadas.
 */
async function getTopRatedMovies(startDate, endDate) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-ES&sort_by=vote_average.desc&release_date.gte=${startDate}&release_date.lte=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results; // Retorna las películas obtenidas
}

/**
 * Función para actualizar los gráficos de películas mejor calificadas y más populares.
 */
async function updateCharts() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Actualiza el gráfico de películas mejor calificadas
    const topRatedMovies = await getTopRatedMovies(startDate, endDate);
    const labelsTopRated = topRatedMovies.map(movie => movie.title);
    const ratings = topRatedMovies.map(movie => movie.vote_average);

    const ctxTopRated = document.getElementById('top-rated-chart').getContext('2d');
    if (topRatedChart) topRatedChart.destroy(); // Destruye el gráfico anterior

    topRatedChart = new Chart(ctxTopRated, {
        type: 'bar',
        data: {
            labels: labelsTopRated,
            datasets: [{
                label: 'Calificación',
                data: ratings,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color del gráfico
            }]
        }
    });

    // Actualiza el gráfico de películas más populares
    const mostPopularMovies = await getMostPopularMovies(startDate, endDate);
    const labelsMostPopular = mostPopularMovies.map(movie => movie.title);
    const views = mostPopularMovies.map(movie => movie.popularity);

    const ctxMostPopular = document.getElementById('most-popular-chart').getContext('2d');
    if (mostPopularChart) mostPopularChart.destroy(); // Destruye el gráfico anterior

    mostPopularChart = new Chart(ctxMostPopular, {
        type: 'line',
        data: {
            labels: labelsMostPopular,
            datasets: [{
                label: 'Popularidad',
                data: views,
                backgroundColor: 'rgba(153, 102, 255, 0.6)', // Color del gráfico
            }]
        }
    });
}

/**
 * Función para obtener las películas más populares en un rango de fechas.
 * @param {string} startDate - Fecha de inicio para filtrar las películas.
 * @param {string} endDate - Fecha de fin para filtrar las películas.
 * @returns {Promise<Array>} - Lista de películas más populares.
 */
async function getMostPopularMovies(startDate, endDate) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc&release_date.gte=${startDate}&release_date.lte=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results; // Retorna las películas obtenidas
}

// Llama a la función para inicializar ambas gráficas al cargar la página
updateCharts();

// Inicializa la página cargando los géneros y las películas populares
getGenres(); // Obtener y cargar géneros en el select
getPopularMovies(); // Mostrar todas las películas inicialmente
