let selectedPokemonIndex = -1;
let sideWrapperIsOpen = false;
let stats = [];
let current
let currentPokemon = '';

let nameVersionsData = {
    'name': '',
    'versions': [],   
};

let nameMethodsData = {
    'name': '',
    'methods': [],
};


async function renderPokemon(i) {
    document.getElementById(`pokemon-list-element-container-${i}`).style.border = `inset`;
    await getSelectedPokemonAboutData(i);
    if(sideWrapperIsOpen) {
        removeClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
        setTimeout(() => {
            renderPokemonContent();
        }, 200);
    } else {
        renderPokemonTemplate();
        await renderPokemonContent();
    }
    unmarkLastSelectedPokemon(); 
    selectTab(1);
    selectedPokemonIndex = i;
    showSelectedPokemonWrapper(i);
    getSelectedPokemonOtherSectionsData(i);
}


async function getSelectedPokemonAboutData(i) {
    currentPokemon = '';
    cleanPokemonData();
    copyPokemonAboutData(i);
    await getSelectedPokemonAboutDatas();
    currentPokemon = pokemonData;
    cleanPokemonData();
}


function copyPokemonAboutData(i) {
    pokemonData['name']['name'] = allPokemons[i]['name']['name'];
    pokemonData['id'] = allPokemons[i]['id'];
    pokemonData['image'] = allPokemons[i]['image'];
    pokemonData['types'] = allPokemons[i]['types'];
    pokemonData['background_color'] = allPokemons[i]['background_color'];
    pokemonData['about']['species'] = allPokemons[i]['about']['species'];
    pokemonData['about']['abilities'] = allPokemons[i]['about']['abilities'];
    pokemonData['about']['growth_rate'] = allPokemons[i]['about']['growth_rate'];
    pokemonData['about']['egg_groups'] = allPokemons[i]['about']['egg_groups'];
    pokemonData['hatch_counter'] = allPokemons[i]['hatch_counter'];
}


async function getSelectedPokemonAboutDatas() {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonData['id']}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    getPokemonHeight(pokemon);
    getPokemonWeight(pokemon);
    await getSelectedPokemonAboutSpeciesData(pokemon);
    await getPokemonTypeDamageData(pokemon);
}


async function getSelectedPokemonAboutSpeciesData(pokemon) {
    let url = pokemon['species']['url'];
    let response = await fetch(url);
    let species = await response.json();
    getPokemonDescription(species);
    getPokemonOptionalStatus(species);
    getAllGenerations(species);
}

///////////////////////////////  T H E   O T H E R   S E C T I O N S

async function getSelectedPokemonOtherSectionsData(i) {
    copyPokemonOtherSectionsData(i);
    await getSelectedPokemonOtherSectionsDatas(i);
}


function copyPokemonOtherSectionsData(i) {
    currentPokemon['name']['names'] = allPokemons[i]['name']['names'];
    currentPokemon['about']['habitat'] = allPokemons[i]['about']['habitat'];
}


async function getSelectedPokemonOtherSectionsDatas(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemon['id']}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    getPokemonBaseExp(pokemon);
    getStats(pokemon);
    await getSelectedPokemonLocationData(pokemon);
    getPokemonMoves(pokemon);
    await getSelectedPokemonOtherSectionsSpeciesData(pokemon, currentPokemon['id']);
}


async function getSelectedPokemonOtherSectionsSpeciesData(pokemon, id) {
    let url = pokemon['species']['url'];
    let response = await fetch(url);
    let species = await response.json();
    getPokemonBaseHappiness(species);
    getPokemonCaptureRate(species);
    await renderPokemonEvolutionChain(species, id);
}

///////////////////////////////  P O K E M O N   D E S C R I P T I O N  ///////////////////////////////

function getPokemonDescription(species) {
    pokemonData['description'] = '';
    if(species['flavor_text_entries'])
        for (let i = 0; i < species['flavor_text_entries'].length; i++)
            if(species['flavor_text_entries'][i]['language']['name'] == 'en') {
                let description = species['flavor_text_entries'][i]['flavor_text'];
                description = description.replaceAll(/\n/g, ' ');
                description = description.replaceAll(/\f/g, ' ');
                pokemonData['description'] = description;
                break;
            }
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
    else if (pokemon['sprites']['other']['dream_world']['front_default']) pokemonData['image'] = `${pokemon['sprites']['other']['dream_world']['front_default']}`;
    else if (pokemon['sprites']['other']['home']['front_default']) pokemonData['image'] = `${pokemon['sprites']['other']['home']['front_default']}`;
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
        abilityArray.push(returnNameformattedMinus(abilityName));
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
    currentPokemon['base_stats']['stats'] = [];
    for (let i = 0; i < pokemon['stats'].length; i++) {
        currentPokemon['base_stats']['stats'].push(pokemon['stats'][i]['base_stat']);
        total += pokemon['stats'][i]['base_stat'];
    }
    currentPokemon['base_stats']['total'] = total;
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


function getDamageValues() {
    for (let i = 0; i < damageTo.length; i++) 
        pokemonData['base_stats']['type_defense']['damage_to'].push(damageTo[i]);
    for (let j = 0; j < damageFrom.length; j++) 
        pokemonData['base_stats']['type_defense']['damage_from'].push(damageFrom[j]);
}
///////////////////////////////  P O K E M O N   B A S E - E X P  ///////////////////////////////

function getPokemonBaseExp(pokemon) {
    if(pokemon['base_experience'])
        currentPokemon['base_exp'] = pokemon['base_experience'];
}

///////////////////////////////  P O K E M O N   B A S E - H A P P I N E S S  ///////////////////////////////

function getPokemonBaseHappiness(species) {
    if(species['base_happiness'])
        currentPokemon['base_happiness'] = species['base_happiness'];
}

///////////////////////////////  P O K E M O N   C A P T U R E - R A T E  ///////////////////////////////

function getPokemonCaptureRate(species) {
    if(species['capture_rate'])
        currentPokemon['capture_rate'] = species['capture_rate'];
}

///////////////////////////////  P O K E M O N   B A B Y ,   L E G E N D A R Y ,   M Y T H I C A L  ///////////////////////////////

function getPokemonOptionalStatus(species) {
    if(species['is_baby'])
        pokemonData['is_baby'] = true;
    if(species['is_legendary'])
        pokemonData['is_legendary'] = true;
    if(species['is_mythical'])
        pokemonData['is_mythical'] = true;
}

///////////////////////////////  P O K E M O N   H A T C H - C O U N T E R  ///////////////////////////////

function getPokemonHatchCounter(species) {
    if(species['hatch_counter']) 
        pokemonData['hatch_counter'] = species['hatch_counter'];
}

///////////////////////////////  P O K E M O N   L O C A T I O N  ///////////////////////////////

async function getSelectedPokemonLocationData(pokemon) {
    let url = pokemon['location_area_encounters'];
    let response = await fetch(url);
    let locationAreas = await response.json();
    currentPokemon['locations'] = [];
    getPokemonLocation(locationAreas);
}


function getPokemonLocation(locationAreas) {
    let methodArray = [];
    for (let i = 0; i < locationAreas.length; i++) {
        cleanNameVersionsData();
        nameVersionsData['name'] = returnNameFormatted(locationAreas[i]['location_area']['name']);
        getPokemonLocationVersions(locationAreas, i, methodArray);
        currentPokemon['locations'].push(nameVersionsData);
    }
}


function getPokemonLocationVersions(locationAreas, i, methodArray) {
    for (let j = 0; j < locationAreas[i]['version_details'].length; j++) {
        cleanNameMethodsData();
        methodArray = [];
        nameMethodsData['name'] = returnNameFormatted(locationAreas[i]['version_details'][j]['version']['name']);
        getPokemonLocationMethods(locationAreas, i, j, methodArray);
        if(methodArray.length > 0) nameMethodsData['methods'] = methodArray;
        nameVersionsData['versions'].push(nameMethodsData);
    }
}


function getPokemonLocationMethods(locationAreas, i, j, methodArray) {
    for (let k = 0; k < locationAreas[i]['version_details'][j]['encounter_details'].length; k++) {
        let method = locationAreas[i]['version_details'][j]['encounter_details'][k]['method']['name'];
        if(thatMethodIsNew(methodArray, method))
            methodArray.push(method);
    }
}


function thatMethodIsNew(array, method) {
    if(array.length > 0)
        for (let i = 0; i < array.length; i++) {
            if(array[i].includes(method)) return false;
            else return true;
        }
    else return true;
}

///////////////////////////////  P O K E M O N   M O V E S  ///////////////////////////////

function getPokemonMoves(pokemon) {
    currentPokemon['moves'] = [];
    for (let i = 0; i < pokemon['moves'].length; i++) {
        cleanNameVersionsData();
        nameVersionsData['name'] = returnNameFormatted(pokemon['moves'][i]['move']['name']);
        getPokemonMovesMethods(pokemon, i);
        currentPokemon['moves'].push(nameVersionsData);
    }
}


function getPokemonMovesMethods(pokemon, i) {
    for (let j = 0; j < pokemon['moves'][i]['version_group_details'].length; j++) {
        cleanNameMethodsData();
        let pokemonVersion = pokemon['moves'][i]['version_group_details'][j]['version_group']['name'];
        nameMethodsData['name'] = returnNameFormatted(pokemonVersion);
        let level = pokemon['moves'][i]['version_group_details'][j]['level_learned_at'];
        let method = pokemon['moves'][i]['version_group_details'][j]['move_learn_method']['name'];
        nameMethodsData['methods'].push(
            { 
                'method': returnNameFormatted(method),
                'level': level,
            });
        nameVersionsData['versions'].push(nameMethodsData);
    }
}

///////////////////////////////  P O K E M O N   C L E A N   D A T A  ///////////////////////////////

function cleanNameVersionsData() {
    nameVersionsData = {
            'name': '',
            'versions': [],
        }
}


function cleanNameMethodsData() {
    nameMethodsData = {
            'name': '',
            'methods': [],
        }
    
}
