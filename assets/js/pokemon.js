let pokemonName;
let pokemonImages = [];
let pokemonEvolutionImages = [];
let pokemonElementData = [];
let selectedPokemonIndex = -1;
let sideWrapperIsOpen = false;
let stats = [];

let pokemonInfo = {
    'backgroundColor': '',
    'about': [
        {   
            'species' :  '',
            'height' : 
                {
                    'meter': '',
                    'inch': ''
                },
            'weight' : 
                {
                    'kg': '',
                    'lbs': '',
                },
            'abilities' : []
        },
        { 
            'egg groups': '',
            'egg cycle': ''
        }
    ],
    'base-stats': [
        {
            'hp':'',
            'attack': '',
            'defense': '',
            'speed-attack': '',
            'speed-defense': '',
            'speed': '',
            'total': ''
        },
        {
            'type-defense': ''
        },
    ],
    'evolution':  [
        {
            'lvl': '',
            'image': ''
        }
    ]
};



async function renderPokemon(i) {
    

    copyPokemonElementData(i);
    await loadPokemonInformation();
    renderPokemonTemplate(i);
    renderPokemonContent(i);

    unmarkLastSelectedPokemon();
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

///////////////////////////////  P O K E M O N   S P E C I E S  ///////////////////////////////

async function getPokemonSpecies() {
    let url = pokemonElementData['species']['url'];
    let resp = await fetch(url);
    let response = await resp.json();
    for (let i = 0; i < response['genera'].length; i++) {
        if (response['genera'][i]['language']['name'] == lang) {
            // pokemonInfo['about']['species'] = `${response['genera'][i]['genus']}`;
            // break;
            return `${response['genera'][i]['genus']}`;
        } 
    }
}

///////////////////////////////  P O K E M O N   H A B I T A T  ///////////////////////////////

async function getPokemonHabitat() {
    let url = pokemonElementData['species']['url'];
    let resp = await fetch(url);
    let response = await resp.json();
    return response['habitat']['name'];
}

///////////////////////////////  P O K E M O N   H E I G H T  ///////////////////////////////

async function getPokemonHeight() {
    let data = pokemonElementData['height'];
    let meter = (data/10).toFixed(2);
    let feet = (meter*3.28084).toFixed(2);
    let feetInt = Number.parseInt(feet.toString());
    let feetDec = Number.parseFloat('0' + feet.toString().split((feet.toString().indexOf('.'))));
    let inch = (feetDec*12).toFixed(2);
    let height = feetInt + inch;
    // pokemonInfo['about']['height']['meter'] = meter;
    // pokemonInfo['about']['height']['inch'] = height;
    return [meter, height];
}

///////////////////////////////  P O K E M O N   W E I G H T  ///////////////////////////////

function getPokemonWeight() {
    let data = pokemonElementData['weight'];
    let kilogramm = (data/10).toString(2);
    let lbs = (kilogramm*2,204623).toString(1);
    // pokemonInfo['about']['weight']['kg'] = kilogramm;
    // pokemonInfo['about']['weight']['lbs'] = lbs;
    return [kilogramm, lbs];
}

///////////////////////////////  P O K E M O N   A B I L I T Y  ///////////////////////////////

async function getPokemonAbilities() {
    let abilityArray= [];
    let abilities = (pokemonElementData['abilities'].length)-1;
    for (let i = 0; i < abilities; i++) {
        let url = pokemonElementData['abilities'][i]['ability']['url'];
        let resp = await fetch(url);
        let response = await resp.json();
        for (let j = 0; j < response['names'].length; j++) {
            if (response['names'][j]['language']['name'] == lang) {
                abilityArray.push(response['names'][j]['name']);
                break;
            }
        }
    }
    return abilityArray;
}

///////////////////////////////  P O K E M O N   G R O W T H - R A T E  ///////////////////////////////

async function getPokemonGrowthRate() {
    let url = pokemonElementData['species']['url'];
    let resp = await fetch(url);
    let response = await resp.json();
    return response['growth_rate']['name']; 
}

///////////////////////////////  P O K E M O N   E G G - G R O U P S ///////////////////////////////

async function getPokemonEggGroups() {
    let array = [];
    let url = pokemonElementData['species']['url'];
    let resp = await fetch(url);
    let response = await resp.json();
    if(response['egg_groups'].length > 0) 
        for (let i = 0; i < response['egg_groups'].length; i++) array.push(response['egg_groups'][i]['name']);
    return array; 
}

///////////////////////////////  P O K E M O N   S T A T S ///////////////////////////////

function getStats() {
    stats = [];
    for (let i = 0; i < pokemonElementData[i].length; i++)
        stats.push(pokemonElementData[i]['base_stat']);
    return stats;
}


// TEMPLATE
function renderPokemonTemplate(i) {
    let content = document.getElementById(`pokemon-selected-wrapper`);
    content.innerHTML = templatePokemonWrapper();
    let wrapper = document.getElementById(`pokemon-selected`);
    wrapper.innerHTML = templatePokemonHeaderAndImage(i);
    wrapper.innerHTML += templatePokemonInfoWrapper(i);
}


function templatePokemonWrapper() {
    return `<div class="pokemon-selected-container sticky w-100" id="pokemon-selected-container">
                <div class="pokemon-selected relative flex column w-100" id="pokemon-selected"></div>
            </div>`;
}


function templatePokemonHeaderAndImage(i) {
    return `<div class="pokemon-selected-header-wrapper absolute" id="pokemon-selected-header-wrapper">
                <div class="pokemon-selected-header flex w-100 h-100">
                    <div class="pokemon-selected-header-function-icons w-100 flex">
                        <img src="assets/img/back_arrow_white.png" class="pokemon-selected-header-arrow cursor-p" onclick="hideSelectedPokemonWrapper(${i})"> 
                        <img src="assets/img/liked.png" class="pokemon-selected-header-like cursor-p" id="pokemon-selected-header-liked"> 
                        <img src="assets/img/unliked.png" class="pokemon-selected-header-like cursor-p" id="pokemon-selected-header-unliked">
                    </div>
                    <div class="pokemon-selected-header-name-and-type flex column">
                        <div class="pokemon-selected-header-name-container" id="pokemon-selected-header-name-container"></div>
                        <div class="pokemon-selected-header-type-container" id="pokemon-selected-header-type-container"></div>
                    </div>
                    <div class="pokemon-selected-header-pokemonNumber flex"><p>#${getPokemonId(i, pagePokemonsElementData[i]['id'])}</p></div>
                </div>
            </div>
            <img src="${getPokemonImage(i)}" class="pokemon-selected-image absolute">`;
}


function templatePokemonInfoWrapper() {
    return `<div class="pokemon-selected-info-wrapper flex column">
                <div class="pokemon-selected-info-tab-wrapper flex w-100" id="pokemon-selected-info-tab-wrapper"></div>
                <div class="pokemon-selected-info-data-wrapper" id="pokemon-selected-info-data-wrapper"></div>
            </div>`;
}


function templatePokemonInfoTabs() {
    let wrapper = document.getElementById(`pokemon-selected-info-tab-wrapper`);
    wrapper.innerHTML = `<p class="pokemon-selected-info-tab">About</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab">Base Stats</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab">Evolution</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab">Moves</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab">Locations</p>`;
}


// CONTENT
function renderPokemonContent(i) {
    renderPokemonTypes(i, `pokemon-selected-header-type-container`);
}


// SHOW & HIDE
function showSelectedPokemonWrapper(i) {
    setTimeout(() => {
        let height = document.getElementById(`pokemon-list-wrapper`).clientHeight;
        document.getElementById(`pokemon-selected-wrapper`).style.height = `${height}px`;
    }, 100);
    document.getElementById(`pokemon-list-element-container-${i}`).style.border = `inset`;
    document.getElementById(`pokemon-selected-wrapper`).style.width = `60%`;
    showSelectedPokemonInfo();
}


function showSelectedPokemonInfo() {
    if(sideWrapperIsOpen) addClasslist(`pokemon-selected`, `tranX-0`);
    else {
        setTimeout(() => {
            addClasslist(`pokemon-selected`, `tranX-0`);
        }, 300); 
    }
    sideWrapperIsOpen = true;
}


function hideSelectedPokemonWrapper() {
    document.getElementById(`pokemon-selected-wrapper`).style.width = `0`;
    document.getElementById(`pokemon-selected-wrapper`).style.height = `0`;
    sideWrapperIsOpen = false;
    unmarkLastSelectedPokemon();
}


// UNMARK SELECTION
function unmarkLastSelectedPokemon() {
    if(selectedPokemonIndex != -1) document.getElementById(`pokemon-list-element-container-${selectedPokemonIndex}`).style = `none`;
}


async function getPokemonImageAll(i) {
    let url = allPokemonsBasicData['results']['results'][i]['url'];
    let resp = await fetch(url);
    let pokemon = await resp.json();
    if (pokemonpokemon['sprites']['other']['official-artwork']['front_default']) return `${pokemon['sprites']['other']['official-artwork']['front_default']}`;
    else if (pokemon['sprites']['other']['home']['front_default']) return `${pokemon['sprites']['other']['home']['front_default']}`;
    else if(pokemonpokemon['sprites']['other']['dream_world']['front_default']) return `${pokemon['sprites']['other']['dream_world']['front_default']}`;
    else return `assets/img/no_pokemon_image.png`;
}


