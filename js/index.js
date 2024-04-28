function agregarFetch(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    .then(response => response.json())
    .then(response => {
        let pokemones = response.results.slice(0,100)
        pokemones.forEach(pokemon => {
            console.log(pokemon)

        });
    })
    
    
}

agregarFetch()