///////////////////////////////  P O K E M O N   E V O L U T I O N  ///////////////////////////////

let evolution = [];
let evo = [
    {
        'name': [],
        'image': [],
        'details': [],
    }
]


async function doesPokemonEvolvesFrom() {
    let url = pokemonElementData['species']['url'];
    let resp = await fetch(url);
    let species = await resp.json();
    if(species['evolves_from_species'].length > 0) return true;
    else return false;
}


async function getPokemonEvolvesFrom() {
    let array = [];
    let url = pokemonElementData['species']['url'];
    let resp = await fetch(url);
    let species = await resp.json();
    for (let i = 0; i < species['evolves_from_species'].length; i++) {
        array.push(species['evolves_from_species']['name']);
    }
    return array;
}


async function renderPokemonEvolutionChain(species) {
    evolution = [];
    if(species['evolution_chain'].length > 0) {
        let evoUrl = response['evolution_chain']['url'];
        let evoResp = await fetch(evoUrl);
        let evolutionChain = evoResp.json();
        renderPokemonEvolutionChain(evolutionChain['chain']);
    }
}


async function renderPokemonEvolutionData(chain) {
    cleanEvo();
    if(chain['species'].length > 0) {
        let urlLength = chain['species']['url'].length;
        let pokemonNumber = Number(chain['species']['url'].charAt(urlLength-2));
        evo['name'].push(chain['species']['name']);
        evo['image'].push(await getPokemonImageAll(pokemonNumber));
    }
    renderPokemonEvoChainData(chain);
    evolution.push(evo);
    await renderPokemonEvolvesToData(chain);
}


function renderPokemonEvoChainData(chain) {
    if(chain['evolution_details'].length > 0) 
        for (let index = 0; index < chain['evolution_details'].length; index++) {
            let trigger = chain['evolution_details'][i]['trigger']['name'];
            let minLevel = chain['evolution_details'][i]['min_level'];
            evo['details'].push([
                {
                    'level': minLevel,
                    'trigger': trigger,
                }
            ])
        }
}


async function renderPokemonEvolvesToData(chain) {
    if(chain['evolves_to'].length > 0)
        for (let i = 0; i < chain['evolves_to'].length; i++) 
            await renderPokemonEvolutionData(chain['evolves_to'][i]);
}


function cleanEvo() {
    evo = [
            {
                'name': [],
                'image': [],
                'details': [],
            }
        ]
    }