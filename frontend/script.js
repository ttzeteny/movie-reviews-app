const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=YOURAPIKEY&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=YOURAPKIEY&query=';

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

for (let i = 1; i <= 10; i++) {
    returnMovies(`${APILINK}&page=${i}`);
}

function returnMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(function(data) {
            console.log(data.results);
            data.results
                .filter(element => element.poster_path !== null)
                .forEach(element => {
                const div_card = document.createElement('div');
                div_card.classList.add('card');

                const div_row = document.createElement('div');
                div_row.classList.add('row');

                const div_column = document.createElement('div');
                div_column.classList.add('column');

                const image = document.createElement('img');
                image.classList.add('thumbnail');
                image.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const center = document.createElement('center');

                title.innerHTML = `${element.title}<br>
                <a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`;
                image.src = `${IMG_PATH}${element.poster_path}`;
                image.alt = `${element.title}`;

                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);
                main.appendChild(div_row);
            });
        });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = '';
    }
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function() {
    main.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
        returnMovies(`${APILINK}&page=${i}`);
    }
});