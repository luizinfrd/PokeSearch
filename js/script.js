const search_term = document.getElementById('busca')
const search_btn = document.getElementById('bt-busca')


// api https://pokeapi.co/docs/v2#pokemon
const getPokemonData = async term => {

        
    const url = `https://pokeapi.co/api/v2/pokemon/${term}`
    const response = await fetch(url)

    const pokemon = await response.json()
    //debugger

    // insere dados da busca no HTML
    document.getElementById('foto').setAttribute('src', pokemon.sprites.other.dream_world.front_default)
    document.getElementById('nome').innerHTML = pokemon.name
    document.getElementById('hp').innerHTML = `HP: ${Math.floor((Math.random() * pokemon.stats[0].base_stat) + 1)}/${pokemon.stats[0].base_stat}`
    document.getElementById('xp').innerHTML = `XP: ${pokemon.base_experience}`
    document.getElementById('peso').innerHTML = `PESO: ${pokemon.weight}Lib`
    document.getElementById('altura').innerHTML = `ALTURA: ${pokemon.height} Pes`
    document.getElementById('poeira').innerHTML = 'POEIRA: '+Math.floor((Math.random() * 10000) + 1)
    document.getElementById('doce').innerHTML = 'DOCE: '+Math.floor((Math.random() * 200) + 1)

}

search_btn.addEventListener('click', () => getPokemonData(search_term.value))