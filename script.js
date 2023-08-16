document.getElementById('searchButton').addEventListener('click', searchMovie)



let api_key = 'c54c9f226f7b7fc1074ed5d8f0328957'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'
let urlNoImg ='https://static.vecteezy.com/system/resources/previews/005/337/799/large_2x/icon-image-not-found-free-vector.jpg'


let resultsContainer = document.getElementById('results')
let loadingContainer = document.getElementById('loading-container');

function searchMovie() {


    loadingContainer.style.display = 'block';
    // Esperar tres segundos (1000 milisegundos)
    setTimeout(function () {
        // Ocultar el contenedor de carga después de tres segundos
        loadingContainer.style.display = 'none';

        let searchInput = document.getElementById('searchInput').value

        fetch(`${urlBase}?query=${searchInput}&api_key=${api_key}`)
            .then(response => response.json())
            .then(response => displayMovies(response.results))

    }, 500);


}

function displayMovies(movies) {


    resultsContainer.innerHTML = ''


    if (movies.length === 0) {
        resultsContainer.innerHTML = '<p> No se encontraron resultados para la busqueda </p>'
        return
    }

    movies.forEach(movie => {

        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        if (movie.poster_path) {
            let posterPath = urlImg + movie.poster_path
            let poster = document.createElement('img')
            poster.src = posterPath
            movieDiv.appendChild(poster)
        }else{
            
            let posterPath = urlNoImg
            let poster = document.createElement('img')
            poster.src = posterPath
            movieDiv.appendChild(poster)
        }

        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultsContainer.appendChild(movieDiv)

    });
}

