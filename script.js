const pokemonList = document.getElementById('pokemon-list');
const searchInput = document.getElementById('search');

async function fetchPokemon(nameOrId) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    if (!res.ok) return null;
    return res.json();
}

async function fetchAllPokemon(limit = 1025) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await res.json();
    return data.results;
}

function createPokemonCard(pokemon, details) {
    return `<div class="pokemon-card">
        <img src="${details.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <p>#${details.id}</p>
    </div>`;
}

async function renderPokemonList(filter = "") {
    pokemonList.innerHTML = "Carregando...";
    const allPokemon = await fetchAllPokemon();
    let filtered = allPokemon;
    if (filter) {
        filtered = allPokemon.filter(p => p.name.includes(filter.toLowerCase()));
    }
    const cards = await Promise.all(filtered.map(async (pokemon) => {
        const details = await fetchPokemon(pokemon.name);
        if (!details) return "";
        return createPokemonCard(pokemon, details);
    }));
    pokemonList.innerHTML = cards.join("") || "Nenhum Pokémon encontrado.";
}

searchInput.addEventListener('input', (e) => {
    renderPokemonList(e.target.value);
});

renderPokemonList();