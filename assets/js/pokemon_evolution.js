let evo =
    {
        'name': [],
        'image': [],
        'details': [],
    };


async function renderPokemonEvolutionChain(species) {
    pokemonData['evolution'] = [];
    if(species['evolution_chain'].length > 0 || species['evolution_chain']['url']) {
        let url = species['evolution_chain']['url'];
        let response = await fetch(url);
        let evolutionChain = await response.json();
        await renderPokemonEvolutionData(evolutionChain['chain']);
    }
}


async function renderPokemonEvolutionData(chain) {
    cleanEvo();
    if(chain['species'].length > 0 || chain['species']) {
        let urlLength = chain['species']['url'].length;
        let pokemonId = Number(chain['species']['url'].slice(42, urlLength-1));
        evo['name'] = returnNameFormatted(chain['species']['name']);
        evo['image'] = await returnPokemonImageAll(pokemonId);
        evo['id'] = pokemonId;
    }
    renderPokemonEvoChainData(chain);
    currentPokemon['evolution'].push(evo);
    await renderPokemonEvolvesToData(chain);
}


function renderPokemonEvoChainData(chain) {
    if(chain['evolution_details'].length > 0 || chain['evolution_details']) 
        for (let i = 0; i < chain['evolution_details'].length; i++) {
            let trigger = chain['evolution_details'][i]['trigger']['name'];
            let minLevel = chain['evolution_details'][i]['min_level'];
            let item = 'null';
            if (chain['evolution_details'][i]['item'] != null) item = chain['evolution_details'][i]['item']['name'];
            evo['details'] =
                {
                    'level': minLevel,
                    'trigger': returnNameFormatted(trigger),
                    'item': returnNameFormatted(item),
                };
        }
}


async function renderPokemonEvolvesToData(chain) {
    if(chain['evolves_to'].length > 0 || chain['evolves_to'])
        for (let i = 0; i < chain['evolves_to'].length; i++) 
            await renderPokemonEvolutionData(chain['evolves_to'][i]);
}


function cleanEvo() {
    evo = 
        {
            'name': '',
            'image': '',
            'details': '',
            'id':'',
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