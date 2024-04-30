/* generar_tarjeta() -> Funcion que se encarga de generar dinamicamente todas las tarjetas dentro del Fetch
*
*   dato1 = gif     -> Gif del pokemon
*   dato2 = nombre  -> Nombre del pokemon
*   dato3 = id      -> Id del pokemon
*   dato4 = filtro  -> Filtro del pokemon
*   dato5 = altura  -> Altura del pokemon
*   dato6 = peso    -> Peso del pokemon
*
*/
function generar_tarjeta(dato1, dato2, dato3, dato4, dato5, dato6){
    let contenedor_final = document.createElement("div")
    contenedor_final.setAttribute("class", "tarjeta-pokemon col-3 d-flex flex-column align-items-center ")
   
    let contenedor_gif = document.createElement("div")
    contenedor_gif.setAttribute("class", "p-5 pt-0 pb-0")

    let gif = document.createElement("img")
    gif.setAttribute("src", dato2)
    gif.setAttribute("class", "img-fluid")
    gif.setAttribute("alt", `gif del pokemon ${dato1}`)

    let conenedor_informacion = document.createElement("div")

    let contenedor_titulo_id = document.createElement("div")
    contenedor_titulo_id.setAttribute("class", "d-flex align-items-center justify-content-center")

    let titulo = document.createElement("h2")
    titulo.innerText = dato1

    let id = document.createElement("span")
    id.setAttribute("class", "me-1")
    id.innerText = dato3

    let conenedor_filtros = document.createElement("div")
    conenedor_filtros.setAttribute("class", "d-flex justify-content-evenly mt-3 filtros")
    
    // ARMO UN forEach para poder recorrer correctamente el dato que paso por parametro ya que es de tipo OBJECT.

    dato4.forEach(el => { 
        let tipo = document.createElement("span")
        tipo.setAttribute("class", el.type.name)
        tipo.innerText = el.type.name
        conenedor_filtros.appendChild(tipo)
    })
    
    let conenedor_informacion_2 = document.createElement("div")
    conenedor_informacion_2.setAttribute("class", "caracteristicas mt-2 d-flex justify-content-center")

    let peso = document.createElement("span")
    peso.innerText = dato6 + "Kg"

    let altura = document.createElement("span")
    altura.innerText = dato5 + "M"

    contenedor_titulo_id.append(id, titulo)
    conenedor_informacion_2.append(peso, altura)
    conenedor_informacion.append(contenedor_titulo_id, conenedor_filtros, conenedor_informacion_2 )
    contenedor_gif.append(gif)
    contenedor_final.append(contenedor_gif, conenedor_informacion )

    contenedor_tarjetas.append(contenedor_final)

}


/* filtrar_por_tipo() -> Funcion que se encarga de filtrar todos los Pokemos por los distintos tipos de filtros
*
*   filtro = valor  -> Filtro es el valor que tiene cada etiqueta li dentro de su id, lo utilizo para capturar el tipo de pokemon que es y poder filtrarlo por tipo.
*
*/
function filtrar_por_tipo(filtro){

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
                 
                datos.filtro.forEach(function(el){
                    let tipo = el.type.name

                    if(filtro == "ver-todos"){
                        generar_tarjeta(datos.nombre, datos.gif, datos.id, datos.filtro, datos.altura, datos.peso)
                    } else {
                        if(tipo==filtro){
                            generar_tarjeta(datos.nombre, datos.gif, datos.id, datos.filtro, datos.altura, datos.peso)
                        } 
                    }
                })
            })
        })
    })
}


/* buscar_pokemon() -> Funcion que se buscar dentro de la api el pokemon seleccionado en el input
*/
function buscar_pokemon(){
    contenedor_tarjetas.innerHTML = ""
    let nombre = barra_buscar.value
    let pokemon_encontrado = []

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`) //Enlace de la pokeApi que trae todo el listado completo de los Pokemones.
    .then(response => response.json())
    .then(datos => {
        
        let pokemones = datos.results
        pokemones.forEach(el =>{

            if(nombre == el.name){
                pokemon_encontrado.push(el)
                
                fetch(el.url)
                .then(response => response.json())
                .then(datos => {

                    let datos_pokemon = {
                        gif: datos.sprites.other.home.front_default,
                        nombre: datos.name,
                        id: datos.id,
                        filtro: datos.types,
                        altura: datos.height,
                        peso: datos.weight
                    }
                    generar_tarjeta(datos_pokemon.nombre, datos_pokemon.gif, datos_pokemon.id, datos_pokemon.filtro, datos_pokemon.altura, datos_pokemon.peso)

                    localStorage.setItem(datos_pokemon.id, datos_pokemon.nombre);
                })
            } 
        })

        if(pokemon_encontrado.length === 0) {
            console.log("no se encontro el pokemon");
        }
        
    })
    barra_buscar.value = ""
    
}
