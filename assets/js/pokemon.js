let pokemonName;
let pokemonImages = [];
let pokemonEvolutionImages = [];
let pokemonElementData = [];
let selectedPokemonIndex = -1;
let sideWrapperIsOpen = false;
let stats = [];





async function renderPokemon(i) {
    if(sideWrapperIsOpen) {
        removeClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
        unmarkLastSelectedPokemon();
        setTimeout(() => {
            renderPokemonContent(i);
        }, 200);
        
    } else {
        copyPokemonElementData(i);
        // await loadPokemonInformation();
        renderPokemonTemplate(i);
        await renderPokemonContent(i);

        unmarkLastSelectedPokemon(); 
    }
    selectedPokemonIndex = i;
    showSelectedPokemonWrapper(i);
}







function copyPokemonElementData(i) {
    pokemonElementData = [];
    for (let j = 0; j < pagePokemonsElementData[i].length; j++) {
        pokemonElementData.push(pagePokemonsElementData[i][j]);
    }
}





// function copyPokemonAboutTab() {
//     copyPokemonSpecies();
//     copyPokemonHeight();
//     copyPokemonWeight();
//     copyPokemonAbilities();
//     copyPokemonGendar();
//     copyPokemonEggGroups();
//     copyPokemonEggCycle();
// }

///////////////////////////////  P O K E M O N   N A M E  ///////////////////////////////

function getPokemonName(basicData) {
    let name = basicData;
    let nameArray = name.split('-');
    let betterArray = [];
    let finalName = '';
    for (let j = 0; j < nameArray.length; j++) {
        betterArray[j] = `${nameArray[j].charAt(0).toUpperCase()}` + `${nameArray[j].slice(1)}`;
        finalName += `${betterArray[j]}`;
        finalName += ' ';
    }
    pokemonData['name']['name'] = finalName;
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

function getPokemonId(pokemon) {
    let id = pokemon['id'];
    if((id.toString().length) < 5 ) {
        let rest = 4 - id.toString().length;
        let newId = '';
        for (let j = 0; j < rest; j++) {
            newId += '0';
        }
        pokemonData['id'] = newId + id.toString();
    } else pokemonData['id'] = id; 
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
    // let url = pagePokemonsElementData[i]['species']['url'];
    // let resp = await fetch(url);
    // let response = await resp.json();
    pokemonData['background_color'] = species['color']['name'];
}

///////////////////////////////  P O K E M O N   S P E C I E S  ///////////////////////////////

function getPokemonSpecies(species) {
    // let url = pokemonElementData['species']['url'];
    // let resp = await fetch(url);
    // let response = await resp.json();
    pokemonData['about']['species'] = [];
    for (let i = 0; i < species['genera'].length; i++) {
        if (species['genera'][i]['language']['name'] == lang) {
            // pokemonInfo['about']['species'] = `${response['genera'][i]['genus']}`;
            // break;
            pokemonData['about']['species'].push(response['genera'][i]['genus']);
        } 
    }
}

///////////////////////////////  P O K E M O N   H A B I T A T  ///////////////////////////////

function getPokemonHabitat(species) {
    // let url = object['species']['url'];
    // let resp = await fetch(url);
    // let response = await resp.json();
    pokemonData['about']['habitat'] = [];
    pokemonData['about']['habitat'].push(species['habitat']['name']);
}

///////////////////////////////  P O K E M O N   H E I G H T  ///////////////////////////////

function getPokemonHeight(pokemon) {
    let data = pokemon['height'];
    let meter = (data/10).toFixed(2);
    let feet = (meter*3.28084).toFixed(2);
    let feetInt = Number.parseInt(feet.toString());
    let feetDec = Number.parseFloat('0' + feet.toString().split((feet.toString().indexOf('.'))));
    let inch = (feetDec*12).toFixed(2);
    let height = feetInt + inch;
    pokemonInfo['about']['height']['meter'] = meter;
    pokemonInfo['about']['height']['inch'] = height;
}

///////////////////////////////  P O K E M O N   W E I G H T  ///////////////////////////////

function getPokemonWeight(pokemon) {
    let data = pokemon['weight'];
    let kilogramm = (data/10).toString(2);
    let lbs = (kilogramm*2,204623).toString(1);
    pokemonInfo['about']['weight']['kg'] = kilogramm;
    pokemonInfo['about']['weight']['lbs'] = lbs;
}

///////////////////////////////  P O K E M O N   A B I L I T Y  ///////////////////////////////

async function getPokemonAbilities(pokemon) {
    let abilityArray = [];
    pokemonData['about']['abilities'] = [];
    for (let i = 0; i < pokemon['abilities'].length; i++) {
        abilityArray = [];
        abilityArray.push(pokemon['abilities'][i]['ability']['name']);
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
    // let url = pokemonElementData['species']['url'];
    // let resp = await fetch(url);
    // let response = await resp.json();
    pokemonData['about']['growth_rate'] = [];
    pokemonData['about']['growth_rate'].push(species['growth_rate']['name']); 
}

///////////////////////////////  P O K E M O N   E G G - G R O U P S ///////////////////////////////

async function getPokemonEggGroups(species) {
    // let array = [];
    // let url = pokemonElementData['species']['url'];
    // let resp = await fetch(url);
    // let response = await resp.json();
    pokemonData['about']['egg_groups'] = [];
    if(species['egg_groups'].length > 0) 
        for (let i = 0; i < species['egg_groups'].length; i++) pokemonData['about']['egg_groups'].push(species['egg_groups'][i]['name']);
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













// TEMPLATE
function renderPokemonTemplate(i) {
    let content = document.getElementById(`pokemon-selected-wrapper`);
    content.innerHTML = templatePokemonWrapper();
    let wrapper = document.getElementById(`pokemon-selected`);
    wrapper.innerHTML += templatePokemonHeaderAndImage(i);
    let overlay = document.getElementById(`pokemon-selected-overlay`)
    overlay.innerHTML += templatePokemonInfoWrapper();
    templatePokemonInfoTabs();
}


function templatePokemonWrapper() {
    return `<div class="pokemon-selected-container sticky w-100" id="pokemon-selected-container">
                <div class="pokemon-selected relative flex w-100 h-100" id="pokemon-selected">
                    <div class="pokemon-selected-overlay-wrapper absolute flex" id="pokemon-selected-overlay-wrapper">
                        <div class="pokemon-selected-overlay flex column w-100" id="pokemon-selected-overlay"></div>
                    </div>
                </div>
            </div>`;
}


function templatePokemonHeaderAndImage(i) {
    return `<div class="pokemon-selected-header-wrapper fixed" id="pokemon-selected-header-wrapper">
                <div class="pokemon-selected-header flex column w-100 h-100">
                    <div class="pokemon-selected-header-function-icons w-100 flex">
                        <img src="assets/img/back_arrow_white.png" class="pokemon-selected-header-arrow cursor-p" onclick="hideSelectedPokemonWrapper(${i})"> 
                        <img src="assets/img/liked.png" class="pokemon-selected-header-like cursor-p" id="pokemon-selected-header-liked"> 
                        <img src="assets/img/unliked.png" class="pokemon-selected-header-like cursor-p d-none" id="pokemon-selected-header-unliked">
                    </div>
                    <div class="pokemon-selected-header-name-and-type flex column">
                        <div class="pokemon-selected-header-name-container" id="pokemon-selected-header-name-container"></div>
                        <div class="pokemon-selected-header-type-container" id="pokemon-selected-header-type-container"></div>
                    </div>
                    <div class="pokemon-selected-header-pokemonNumber flex"><p id="pokemon-selected-header-pokemonNumber"></p></div>
                </div>
            </div>
            <img src="" class="pokemon-selected-image absolute" id="pokemon-selected-image">`;
}


function templatePokemonInfoWrapper() {
    return `<div class="pokemon-selected-info-wrapper flex column">
                <div class="pokemon-selected-info-tab-wrapper w-100">
                    <div class="pokemon-selected-info-tab-container flex h-100" id="pokemon-selected-info-tab-container"></div>
                </div>
                <div class="pokemon-selected-info-data-wrapper" id="pokemon-selected-info-data-wrapper"></div>
            </div>`;
}


function templatePokemonInfoTabs() {
    let wrapper = document.getElementById(`pokemon-selected-info-tab-container`);
    wrapper.innerHTML = `<p class="pokemon-selected-info-tab flex cursor-p">About</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab flex sp-tab cursor-p">Base Stats</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab flex cursor-p">Evolution</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab flex cursor-p">Moves</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab flex cursor-p">Locations</p>`;
}


// CONTENT
function renderPokemonContent(i) {
    document.getElementById(`pokemon-selected-header-pokemonNumber`).innerHTML = `#${allPokemons[i]['id']}`;
    document.getElementById(`pokemon-selected-image`).src = `${getPokemonImage(allPokemons[i]['image'])}`;
    renderPokemonTypes(i, `pokemon-selected-header-type-container`);
    addBackgroundColor(i);
}


function addBackgroundColor(i) {
    document.getElementById(`pokemon-selected`).style.backgroundColor = `var(--${allPokemons[i]['background_color']})`;
}



// SHOW & HIDE
function showSelectedPokemonWrapper(i) {
    setTimeout(() => {
        let height = document.getElementById(`pokemon-list-wrapper`).clientHeight;
        document.getElementById(`pokemon-selected-wrapper`).style.height = `${height}px`;
    }, 100);
    document.getElementById(`pokemon-list-element-container-${i}`).style.border = `inset`;
    if(window.innerWidth > 999) document.getElementById(`pokemon-selected-wrapper`).style.width = `60%`;
    else document.getElementById(`pokemon-selected-wrapper`).style.width = `100%`;
    showSelectedPokemonInfo();
}


function showSelectedPokemonInfo() {
    // if(sideWrapperIsOpen) {
    //     // addClasslist(`pokemon-selected`, `tranX-0`);
    //     addClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
    // } else (!sideWrapperIsOpen)
        setTimeout(() => {
            addClasslist(`pokemon-selected`, `tranX-0`);
        }, 300); 
        setTimeout(() => {
            addClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
        }, 480);
    
    sideWrapperIsOpen = true;
}


function hideSelectedPokemonWrapper() {
    removeClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
    document.getElementById(`pokemon-selected-wrapper`).style.width = `0`;
    document.getElementById(`pokemon-selected-wrapper`).style.height = `0`;
    sideWrapperIsOpen = false;
    unmarkLastSelectedPokemon();
}


// UNMARK SELECTION
function unmarkLastSelectedPokemon() {
    if(selectedPokemonIndex != -1) document.getElementById(`pokemon-list-element-container-${selectedPokemonIndex}`).style = `none`;
}



