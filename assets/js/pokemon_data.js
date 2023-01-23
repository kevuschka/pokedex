let selectedPokemonIndex = -1;
let sideWrapperIsOpen = false;
let stats = [];
let current
let currentPokemon = [];


async function renderPokemon(i) {
    await copyPokemonElementData(i);
    if(sideWrapperIsOpen) {
        removeClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
        unmarkLastSelectedPokemon();
        setTimeout(() => {
            renderPokemonContent();
        }, 200);
        
    } else {
        renderPokemonTemplate();
        unmarkLastSelectedPokemon(); 
        await renderPokemonContent();
    }
    selectedPokemonIndex = i;
    showSelectedPokemonWrapper(i);
    unselectAllTabs();
    selectTab(1);
}

///////////////////////////////  C O P Y   P O K E M O N  ///////////////////////////////

async function copyPokemonElementData(i) {
    currentPokemon = [];
    await getSelectedPokemonData(i);
    copyPokemonBasicData(i)
    copyPokemonSpeciesData(i)
    currentPokemon.push(pokemonData);
    cleanPokemonData();
}


function copyPokemonBasicData(i) {
    pokemonData['name']['name'] = allPokemons[i]['name']['name'];
    pokemonData['id'] = allPokemons[i]['id'];
    pokemonData['image'] = allPokemons[i]['image'];
    pokemonData['types'] = allPokemons[i]['types'];
    pokemonData['background_color'] = allPokemons[i]['background_color'];
    pokemonData['name']['names'] = allPokemons[i]['name']['names'];
}


function copyPokemonSpeciesData(i) {
    pokemonData['about']['species'] = allPokemons[i]['about']['species'];
    pokemonData['about']['habitat'] = allPokemons[i]['about']['habitat'];
    pokemonData['about']['height']['meter'] = allPokemons[i]['about']['height']['meter'];
    pokemonData['about']['height']['inch'] = allPokemons[i]['about']['height']['inch'];
    pokemonData['about']['weight']['kg'] = allPokemons[i]['about']['weight']['kg'];
    pokemonData['about']['weight']['lbs'] = allPokemons[i]['about']['weight']['lbs'];
    pokemonData['about']['abilities'] = allPokemons[i]['about']['abilities'];
    pokemonData['about']['growth_rate'] = allPokemons[i]['about']['growth_rate'];
    pokemonData['about']['egg_groups'] = allPokemons[i]['about']['egg_groups'];
}


async function getSelectedPokemonData(i) {
    cleanPokemonData();
    let url = `https://pokeapi.co/api/v2/pokemon/${allPokemons[i]['id']}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    getPokemonHeight(pokemon);
    await getSelectedPokemonSpeciesData(pokemon, allPokemons[i]['id']);
    getStats(pokemon);
    await getPokemonTypeDamageData(pokemon);
}


async function getSelectedPokemonSpeciesData(pokemon, id) {
    let url = pokemon['species']['url'];
    let response = await fetch(url);
    let species = await response.json();
    getAllGenerations(species);
    await renderPokemonEvolutionChain(species, id);
}
///////////////////////////////  P O K E M O N   N A M E  ///////////////////////////////

function getPokemonName(basicData) {
    pokemonData['name']['name'] = returnNameFormatted(basicData);
}

///////////////////////////////  A L L   P O K E M O N   N A M E S  ///////////////////////////////
/**
 * That function loads the names of a pokemon in different languages.
 * @param {object} species - species is the species JSON array of that pokemon to get the names data in 'names'
 * @returns an array with names of a pokemon (in different language)
 */
function getAllNames(species) {
    pokemonData['name']['names'] = [];
    for (let i = 0; i < species['names'].length; i++)
        pokemonData['name']['names'].push(species['names'][i]['name']);
}

///////////////////////////////  P O K E M O N   G E N E R A T I O N S  ///////////////////////////////
/**
 * That function loads the generations of a pokemon, in that the species was introduced in.
 * @param {object} species - species is the species JSON array of that pokemon to get the generation data in 'generation'
 * @returns an array with generations of a pokemon species
 */
function getAllGenerations(species) {
    pokemonData['generations'] = [];
    pokemonData['generations'].push(species['generation']['name']);
}

///////////////////////////////  P O K E M O N   I D  ///////////////////////////////

function returnPokemonId(id) {
    if((id.toString().length) < 5 ) {
        let rest = 4 - id.toString().length;
        let newId = '';
        for (let j = 0; j < rest; j++) {
            newId += '0';
        }
        return newId + id.toString();
    } else return  id; 
}

///////////////////////////////  P O K E M O N   I M A G E  ///////////////////////////////

function getPokemonImage(pokemon) {
    if (pokemon['sprites']['other']['official-artwork']['front_default']) pokemonData['image'] = `${pokemon['sprites']['other']['official-artwork']['front_default']}`;
    else if (pokemon['sprites']['other']['home']['front_default']) pokemonData['image'] = `${pokemon['sprites']['other']['home']['front_default']}`;
    else if(pokemon['sprites']['other']['dream_world']['front_default']) pokemonData['image'] = `${pokemon['sprites']['other']['dream_world']['front_default']}`;
    else pokemonData['image'] = `assets/img/no_pokemon_image.png`;
}

///////////////////////////////  P O K E M O N   T Y P E S  ///////////////////////////////

function getPokemonTypes(pokemon) {
    pokemonData['types'] = [];
    for (let j = 0; j < pokemon['types'].length; j++) {
        let type = pokemon['types'][j]['type']['name'];
        let typeName = `${type.charAt(0).toUpperCase()}` + `${type.slice(1)}`;
        pokemonData['types'].push(typeName);
    }
}

///////////////////////////////  P O K E M O N   B A C K G R O U N D - C O L O R  ///////////////////////////////

function getPokemonBackgroundColor(species) {
    pokemonData['background_color'] = species['color']['name'];
}

///////////////////////////////  P O K E M O N   S P E C I E S  ///////////////////////////////

function getPokemonSpecies(species) {
    pokemonData['about']['species'] = [];
    for (let i = 0; i < species['genera'].length; i++) {
        if (species['genera'][i]['language']['name'] == lang) {
            pokemonData['about']['species'].push(species['genera'][i]['genus']);
            break;
        } 
    }
}

///////////////////////////////  P O K E M O N   H A B I T A T  ///////////////////////////////

function getPokemonHabitat(species) {
    pokemonData['about']['habitat'] = [];
    let habitatName;
    if(species['habitat']) {
        habitatName = species['habitat']['name'];
        pokemonData['about']['habitat'].push(`${habitatName.charAt(0).toUpperCase()}` + `${habitatName.slice(1)}`);
    }
}

///////////////////////////////  P O K E M O N   H E I G H T  ///////////////////////////////

function getPokemonHeight(pokemon) {
    let data = pokemon['height'];
    let meter = (Number(data)/10).toFixed(2);
    let feet = (Number(meter)*3.28084).toFixed(4);
    let feetInt = Number(feet).toFixed(0);
    let feetDec = Number.parseFloat('0' + feet.toString().slice((feet.toString().indexOf('.'))));
    let inch = (feetDec*12).toFixed(1);
    pokemonData['about']['height']['meter'] = meter;
    pokemonData['about']['height']['inch'] = `${feetInt}'${inch}"`;
}

///////////////////////////////  P O K E M O N   W E I G H T  ///////////////////////////////

function getPokemonWeight(pokemon) {
    let data = pokemon['weight'];
    let kilogramm = (data/10).toFixed(2);
    let lbs = (kilogramm*2.204623).toFixed(1);
    pokemonData['about']['weight']['kg'] = kilogramm;
    pokemonData['about']['weight']['lbs'] = lbs;
}

///////////////////////////////  P O K E M O N   A B I L I T Y  ///////////////////////////////

async function getPokemonAbilities(pokemon) {
    let abilityArray = [];
    pokemonData['about']['abilities'] = [];
    for (let i = 0; i < pokemon['abilities'].length; i++) {
        abilityArray = [];
        let abilityName = pokemon['abilities'][i]['ability']['name']
        abilityArray.push(`${abilityName.charAt(0).toUpperCase()}` + `${abilityName.slice(1)}`);
        let url = pokemon['abilities'][i]['ability']['url'];
        let resp = await fetch(url);
        let ability = await resp.json();
        for (let j = 0; j < ability['effect_entries'].length; j++)
            if (ability['effect_entries'][j]['language']['name'] == lang) {
                abilityArray.push(ability['effect_entries'][j]['effect']);
                break;
            }
        pokemonData['about']['abilities'].push(abilityArray);
    }
}

///////////////////////////////  P O K E M O N   G R O W T H - R A T E  ///////////////////////////////

async function getPokemonGrowthRate(species) {
    pokemonData['about']['growth_rate'] = [];
    if(species['growth_rate'])
        pokemonData['about']['growth_rate'].push(returnNameFormatted(species['growth_rate']['name']));
}

///////////////////////////////  P O K E M O N   E G G - G R O U P S ///////////////////////////////

async function getPokemonEggGroups(species) {
    pokemonData['about']['egg_groups'] = [];
    if(species['egg_groups'].length > 0) 
        for (let i = 0; i < species['egg_groups'].length; i++)
            pokemonData['about']['egg_groups'].push(returnNameFormatted(species['egg_groups'][i]['name']));
}

///////////////////////////////  P O K E M O N   S T A T S ///////////////////////////////

function getStats(pokemon) {
    let total = 0;
    pokemonData['base_stats']['stats'] = [];
    for (let i = 0; i < pokemon['stats'].length; i++) {
        pokemonData['base_stats']['stats'].push(pokemon['stats'][i]['base_stat']);
        total += pokemon['stats'][i]['base_stat'];
    }
    pokemonData['base_stats']['total'] = total;
}

///////////////////////////////  P O K E M O N   E V O L U T I O N  ///////////////////////////////

async function getPokemonEvolutionData(species) {
    if(species['evolution_chain'].length > 0 || species['evolution_chain']['url']) {
        let url = species['evolution_chain']['url'];
        let response = await fetch(url);
        let evolution = await response.json();
        await renderPokemonEvolutionData(evolution['chain'])
    }
}

///////////////////////////////  P O K E M O N   D A M A G E  ///////////////////////////////

async function getPokemonTypeDamageData(pokemon) {
    pokemonData['base_stats']['type_defense']['damage_to'] = [];
    pokemonData['base_stats']['type_defense']['damage_from'] = [];
    cleanDamageArrays(); 
    await renderTypeDamageValues(pokemon);
    getDamageValues();
}