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

    let contenedor_gif = document.createElement("div")

    let gif = document.createElement("img")
    gif.setAttribute("src", dato2)
    gif.setAttribute("alt", `gif del pokemon ${dato1}`)

    let conenedor_informacion = document.createElement("div")

    let titulo = document.createElement("h2")
    titulo.innerText = dato1

    let id = document.createElement("span")
    id.innerText = dato3

    let conenedor_filtros = document.createElement("div")
    
    // ARMO UN forEach para poder recorrer correctamente el dato que paso por parametro ya que es de tipo OBJECT.

    dato4.forEach(el => { 
        let tipo = document.createElement("span")
        tipo.innerText = el.type.name
        conenedor_filtros.appendChild(tipo)
    })
    
    let conenedor_informacion_2 = document.createElement("div")

    let peso = document.createElement("span")
    peso.innerText = dato6 + "Kg"

    let altura = document.createElement("span")
    altura.innerText = dato5 + "M"

    conenedor_informacion_2.append(peso, altura)
    conenedor_informacion.append(titulo, id, conenedor_informacion_2, conenedor_filtros )
    contenedor_gif.append(gif)
    contenedor_final.append(contenedor_gif, conenedor_informacion )

    contenedor_tarjetas.append(contenedor_final)

}