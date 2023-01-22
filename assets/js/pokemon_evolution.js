///////////////////////////////  P O K E M O N   E V O L U T I O N  ///////////////////////////////

// let evolution = [];
let evo =
    {
        'name': [],
        'image': [],
        'details': [],
    };


async function doesPokemonEvolvesFrom(species) {
    if(species['evolves_from_species'].length > 0) return true;
    else return false;
}


async function getPokemonEvolvesFrom(species) {
    let array = [];
    for (let i = 0; i < species['evolves_from_species'].length; i++) {
        array.push(species['evolves_from_species']['name']);
    }
    return array;
}


async function renderPokemonEvolutionChain(species) {
    pokemonData['evolution'] = [];
    if(species['evolution_chain'].length > 0) {
        let evoUrl = response['evolution_chain']['url'];
        let evoResp = await fetch(evoUrl);
        let evolutionChain = await evoResp.json();
        renderPokemonEvolutionData(evolutionChain['chain']);
    }
}


async function renderPokemonEvolutionData(chain) {
    cleanEvo();
    if(chain['species'].length > 0) {
        let urlLength = chain['species']['url'].length;
        let pokemonNumber = Number(chain['species']['url'].charAt(urlLength-2));
        evo['name'].push(chain['species']['name']);
        evo['image'].push(await returnPokemonImageAll(pokemonNumber));
    }
    renderPokemonEvoChainData(chain);
    pokemonData['evolution'].push(evo);
    renderPokemonEvolvesToData(chain);
}


function renderPokemonEvoChainData(chain) {
    if(chain['evolution_details'].length > 0) 
        for (let i = 0; i < chain['evolution_details'].length; i++) {
            let trigger = chain['evolution_details'][i]['trigger']['name'];
            let minLevel = chain['evolution_details'][i]['min_level'];
            evo['details'].push(
                {
                    'level': minLevel,
                    'trigger': trigger,
                }
            )
        }
}


async function renderPokemonEvolvesToData(chain) {
    if(chain['evolves_to'].length > 0)
        for (let i = 0; i < chain['evolves_to'].length; i++) 
            await renderPokemonEvolutionData(chain['evolves_to'][i]);
}


function cleanEvo() {
    evo = 
        {
            'name': [],
            'image': [],
            'details': [],
        };
}


async function returnPokemonImageAll(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    let pokemon = await response.json();
    if (pokemon['sprites']['other']['official-artwork']['front_default']) return `${pokemon['sprites']['other']['official-artwork']['front_default']}`;
    else if (pokemon['sprites']['other']['home']['front_default']) return `${pokemon['sprites']['other']['home']['front_default']}`;
    else if(pokemon['sprites']['other']['dream_world']['front_default']) return `${pokemon['sprites']['other']['dream_world']['front_default']}`;
    else return `assets/img/no_pokemon_image.png`;
}