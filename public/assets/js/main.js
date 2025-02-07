document.addEventListener('DOMContentLoaded', function () {
    $('form#buscarPeli').on('submit', async function (event) {
        event.preventDefault();

        const params = $(this).serialize();
        const url = `${$(this).attr('action')}?${params}`;

        const call = await fetch(url);
        const response = await call.json();

        const $moviesList = $('ul#moviesList');

        $moviesList.empty();

        response.forEach(movie => {
            $moviesList.append(`<li>Titulo: ${movie.Title}, id: ${movie.imdbID}</li>`)
        });
    });


    $('form#buscarPeliPorId').on('submit', async function (event) {
        event.preventDefault();

        const params = $(this).serialize();
        const url = `${$(this).attr('action')}?${params}`;

        const call = await fetch(url);
        const response = await call.json();

        alert(JSON.stringify(response, null, 2));

    });
});