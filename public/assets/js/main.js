

document.addEventListener('DOMContentLoaded', function(){

    $('form#buscarPeli').on('submit', async function(event) {
        event.preventDefault();

        const params = $(this).serialize();
        const url =`${$(this).attr('action')}?${params}`;
        
        const call = await fetch(url);
        const response = await call.json();

        let message = "";
        for(let movie of response){
            message += `Titulo: ${movie.Title}, id: ${movie.imdbID}\n`;
        }
        alert(message);
    });

    
    $('form#buscarPeliPorId').on('submit', async function(event) {
        event.preventDefault();

        const params = $(this).serialize();
        const url =`${$(this).attr('action')}?${params}`;
        
        const call = await fetch(url);
        const response = await call.json();

        alert(JSON.stringify(response, null, 2)); 
    
    });

});