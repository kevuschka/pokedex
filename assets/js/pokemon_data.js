let selectedPokemonIndex = -1;
let sideWrapperIsOpen = false;
let stats = [];
let lastSelected = false;
let currentPokemon = '';
let pokemonNotSaved = true;

let nameVersionsData = {
    'name': '',
    'versions': [],   
};

let nameMethodsData = {
    'name': '',
    'methods': [],
};


async function renderPokemon(i) {
    if(currentPokemon['id'] && getRightArrayIndex(currentPokemon['id']) === i) return;
    renderCurrentPokemonWrapper(i);
    if(searching) await renderPokemonWhileSearching(i);
    else if(!onFavoritesPage) {
        pokemonNotSaved = availableInPokemonsArray(i) ? false : true;
        if(pokemonNotSaved) await getSelectedPokemonAboutData(i);
    } else if(onFavoritesPage) currentPokemon = favPokemons[i];
    if(sideWrapperIsOpen) await renderPokemonContent();
    else {
        renderPokemonTemplate();
        await renderPokemonContent();
    }
    await loadCurrentPokemon(i);
} 


function renderCurrentPokemonWrapper(i) {
    currentPokemon = '';
    document.getElementById(`pokemon-list-element-container-${i}`).style.border = `5px inset`;
    showSelectedPokemonWrapper();
    scrollUpPokemonInfoOverlay();
}


async function loadCurrentPokemon(i) {
    loadStarIconIfPokemonInFavs();
    showSelectedPokemonInfo();
    if(lastSelected) unmarkLastSelectedPokemon(); 
    selectTab(1);
    selectedPokemonIndex = i;
    if(!onFavoritesPage) await getOtherTabsInfos(getRightArrayIndex(currentPokemon['id']));
    makeOtherSectionTabsVisible();
    lastSelected = true;
}


async function renderPokemonWhileSearching(i) {
    if(onFavoritesPage) currentPokemon = searchResults[i];
    else {
        if(availableInPokemonsArray(getRightArrayIndex(searchResults[i]['id']))) pokemonNotSaved = false;
        else pokemonNotSaved = true;
        if(pokemonNotSaved) await getSelectedPokemonAboutData(getRightArrayIndex(searchResults[i]['id']));
    }
}


async function checkIfPokemonIsOnThisPage(i) {
    let page;
    let pokemonIndexRelativeToPageNumber = i+1;
    if(pokemonIndexRelativeToPageNumber > pokemonsPerPage) {
        if((pokemonIndexRelativeToPageNumber % pokemonsPerPage) > 0)
            page = parseInt((pokemonIndexRelativeToPageNumber / pokemonsPerPage).toString().split('.')[0]) + 1;
        else page = parseInt((pokemonIndexRelativeToPageNumber / pokemonsPerPage).toFixed());
    } else page = 1;
    if(searching) document.getElementById('header-searchbar-input').value = '';
    searching = false;
    if(onFavoritesPage) window.location.href = '/index.html';
    if(page != currentPageNumber) renderPageNumber(page);
    await renderPokemonWithDelay(pokemonIndexRelativeToPageNumber - 1);
}


async function renderPokemonWithDelay(pokemonIndex) {
    setTimeout(() => {
        renderPokemon(pokemonIndex);
    }, 500);
}


function scrollUpPokemonInfoOverlay() {
    if(sideWrapperIsOpen) removeClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
}


async function getOtherTabsInfos(i) {
    if(pokemonNotSaved) {
        await getSelectedPokemonOtherSectionsData(i);
        addToSavedPokemons(i, currentPokemon);
        // pokemonNotSaved = true;
    }
}


async function getSelectedPokemonAboutData(i) {
    currentPokemon = '';
    cleanPokemonData();
    copyPokemonAboutData(i);
    await getSelectedPokemonAboutDatas(i);
    currentPokemon = pokemonData;
    cleanPokemonData();
}


function getRightArrayIndex(id) {
    if(id <=  1008 ) return id-1;
    else {
        let idAsText = (id+7).toString();
        let idAsTextSection = idAsText.slice(2);
        let indexAsText = '1' + idAsTextSection;
        return parseInt(indexAsText);
    }
}


function copyPokemonAboutData(i) {
    pokemonData['name']['en'] = allPokemonsBasicData[i]['name']['en'];
    pokemonData['id'] = allPokemonsBasicData[i]['id'];
    pokemonData['image'] = allPokemonsBasicData[i]['image'];
    pokemonData['types'] = allPokemonsBasicData[i]['types'];
    pokemonData['background_color'] = allPokemonsBasicData[i]['background_color'];
}


async function getSelectedPokemonAboutDatas(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${allPokemonsBasicData[i]['id']}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    getPokemonHeight(pokemon);
    getPokemonWeight(pokemon);
    await getPokemonAbilities(pokemon);
    await getSelectedPokemonAboutSpeciesData(pokemon);
    await getPokemonTypeDamageData(pokemon);
}


async function getSelectedPokemonAboutSpeciesData(pokemon) {
    let url = pokemon['species']['url'];
    let response = await fetch(url);
    let species = await response.json();
    getPokemonDescription(species);
    getPokemonOptionalStatus(species);
    getPokemonSpecies(species);
    getPokemonGrowthRate(species);
    getPokemonEggGroups(species);
    getPokemonHatchCounter(species);
}

///////////////////////////////  T H E   O T H E R   S E C T I O N S

async function getSelectedPokemonOtherSectionsData(i) {
    currentPokemon['name']['de'] = allPokemonsBasicData[i]['name']['de'];
    await getSelectedPokemonOtherSectionsDatas();
}


function makeOtherSectionTabsVisible() {
    document.querySelectorAll('.c-white').forEach(el => el.classList.remove('c-white'));
}


async function getSelectedPokemonOtherSectionsDatas() {
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemon['id']}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    getPokemonBaseExp(pokemon);
    getStats(pokemon);
    await getSelectedPokemonLocationData(pokemon);
    getPokemonMoves(pokemon);
    await getSelectedPokemonOtherSectionsSpeciesData(pokemon);
}


async function getSelectedPokemonOtherSectionsSpeciesData(pokemon) {
    let url = pokemon['species']['url'];
    let response = await fetch(url);
    let species = await response.json();
    getPokemonBaseHappiness(species);
    getPokemonCaptureRate(species);
    getAllGenerations(species);
    getPokemonHabitat(species);
    await renderPokemonEvolutionChain(species);
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
    return returnNameFormatted(basicData);
}


///////////////////////////////  P O K E M O N   G E N E R A T I O N S  ///////////////////////////////
/**
 * That function loads the generations of a pokemon, in that the species was introduced in.
 * @param {object} species - species is the species JSON array of that pokemon to get the generation data in 'generation'
 * @returns an array with generations of a pokemon species
 */
function getAllGenerations(species) {
    currentPokemon['generations'] = [];
    currentPokemon['generations'].push(species['generation']['name']);
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


///////////////////////////////  P O K E M O N   S P E C I E S  ///////////////////////////////

function getPokemonSpecies(species) {
    pokemonData['about']['species'] = [];
    for (let i = 0; i < species['genera'].length; i++) {
        if (species['genera'][i]['language']['name'] == 'en') {
            pokemonData['about']['species'].push(species['genera'][i]['genus']);
            break;
        } 
    }
}

///////////////////////////////  P O K E M O N   H A B I T A T  ///////////////////////////////

function getPokemonHabitat(species) {
    currentPokemon['about']['habitat'] = [];
    let habitatName;
    if(species['habitat']) {
        habitatName = species['habitat']['name'];
        currentPokemon['about']['habitat'].push(`${habitatName.charAt(0).toUpperCase()}` + `${habitatName.slice(1)}`);
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
        renderAbilityEffect(ability, abilityArray);
        pokemonData['about']['abilities'].push(abilityArray);
    }
}


function renderAbilityEffect(ability, abilityArray) {
    for (let j = 0; j < ability['effect_entries'].length; j++)
    if (ability['effect_entries'][j]['language']['name'] == 'en') {
        abilityArray.push(ability['effect_entries'][j]['effect']);
        break;
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
        // pokemonData['hatch_counter'] = species['hatch_counter'];
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
            methodArray.push(returnNameFormatted(method));
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
