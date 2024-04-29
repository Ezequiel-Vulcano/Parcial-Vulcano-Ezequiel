function agregarFetch(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`) //Enlace de la pokeApi que trae todo el listado completo de los Pokemones.
    .then(response => response.json())
    .then(response => {
        let pokemones = response.results.slice(0,20) //Filtro que me trae solamente 10 Pokemones.
        pokemones.forEach(pokemon => {

            fetch(pokemon.url) //Enlace con el detalle en particular de cada Pokemon.
            .then(detalle => detalle.json())
            .then(detalle => {

                // --- OBJETO -> Contiene todos los datos que quiero traerme de la API para mostrar de cada Pokemon
                let datos = {
                    gif: detalle.sprites.other.home.front_default,
                    nombre: detalle.name,
                    id: detalle.id,
                    filtro: detalle.types,
                    altura: detalle.height,
                    peso: detalle.weight
                }
                 
                generar_tarjeta(datos.nombre, datos.gif, datos.id, datos.filtro, datos.altura, datos.peso)
            })
        });
    })
}

botones.forEach(function(el){
    el.addEventListener("click", function(){
        contenedor_tarjetas.innerHTML = "";
        let valor = el.id
        filtrar_por_tipo(valor)
    })
})

buscar.addEventListener("click", function(){
    buscar_pokemon()
})

document.addEventListener("DOMContentLoaded", function(){
    agregarFetch()
})



