

document.addEventListener('DOMContentLoaded', function(){

    $('form#buscarPeli').on('submit', async function(event) {
        //stop default procedure
        event.preventDefault();

        const params = $(this).serialize();
        const url =`${$(this).attr('action')}?${params}`;
        
        const call = await fetch(url);
        const response = await call.json();

        let message = "";
        for(let movie of response){
            message += `${movie.Title}\n`;
        }

        alert(message);
    });

});