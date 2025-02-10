document.addEventListener('DOMContentLoaded', function () {

    async function formsubmit(form) {
        const params = $(form).serialize();
        const url = `${$(form).attr('action')}?${params}`;
        const call = await fetch(url);
        const response = await call.json();
        return response
    }
    
    $('form#buscarPeli').on('submit', async function (event) {
        event.preventDefault();
        const response = await formsubmit(this);
        const $moviesList = $('ul#moviesList');

        $moviesList.empty();

        response.forEach(movie => {
            $moviesList.append(`<li>Titulo: ${movie.Title}, id: ${movie.imdbID}</li>`)
        });
    });


    $('form#buscarPeliPorId').on('submit', async function (event) {
        event.preventDefault();
        const response=  await formsubmit(this);
        const $infoList= $('ul#infoList');
        const $subList= $('ul#sublist');

        console.log(response);
        
        $infoList.empty();
        for(let propiedad in response){
            if(propiedad==="Ratings"){
                $infoList.append(`<li>${propiedad}</li>`);

                response[propiedad].forEach(i => {
                    for(let subPropiedad in i){
                    $subList.append(`<li>${subPropiedad}, ${i[subPropiedad]}</li>`);
                    }
                });
                $infoList.append($subList);
            }else{
                $infoList.append(`<li>${propiedad}, ${response[propiedad]}</li>`);

            }
        }
    });
});
