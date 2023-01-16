let pokemonName;
let pokemonImages = [];
let pokemonEvolutionImages = [];
let pokemonElementData = [];
let selectedPokemonIndex = -1;
let sideWrapperIsOpen = false;

let doubleDamageFrom = [];
let halfDamageFrom = [];
let noDamageFrom = [];
let doubleDamageTo = [];
let halfDamageTo = [];
let noDamageTo = [];

let damageFrom = [];
let damageTo = [];

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


function copyPokemonBackgroundColor(i) {
    pokemonInfo['backgroundColor'] = getPokemonBackgroundColor(i);
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


function getPokemonWeight() {
    let data = pokemonElementData['weight'];
    let kilogramm = (data/10).toString(2);
    let lbs = (kilogramm*2,204623).toString(1);
    // pokemonInfo['about']['weight']['kg'] = kilogramm;
    // pokemonInfo['about']['weight']['lbs'] = lbs;
    return [kilogramm, lbs];
}


async function getPokemonAbilities() {
    pokemonInfo['about']['abilities'] = [];
    let abilities = (pokemonElementData['abilities'].length)-1;
    for (let i = 0; i < abilities.length; i++) {
        let url = abilities[i]['ability']['url'];
        let resp = await fetch(url);
        let response = await resp.json();
        for (let j = 0; j < response['names'].length; j++) {
            if (response['names'][j]['language']['name'] == lang) {
                // pokemonInfo['about']['abilities'].push(response['names'][j]['name']);
                // break;
                return response['names'][j]['name'];
            }
        }
    }
}


async function renderTypeDamageValues() {
    cleanDamageArrays();
    for (let i = 0; i < pokemonInfo['types'].length; i++) {
        let url = pokemonInfo['types'][i]['type']['url'];
        let resp = await fetch(url);
        let response = await resp.json();   
        getTypeDamageFromValues(response);
        getTypeDamageToValues(response);
    }
    if(i == 2) {
        renderTypeDamageFromValues();
        renderTypeDamageToValues(); 
    } else copyDamageValues();
}


function cleanDamageArrays() {
    doubleDamageFrom = [];
    halfDamageFrom = [];
    noDamageFrom = [];
    doubleDamageTo = [];
    halfDamageTo = [];
    noDamageTo = [];
}


function getTypeDamageFromValues(response) {
    if(response['damage_relations']['double_damage_from'].length > 0) 
        for (let j = 0; j < response['damage_relations']['double_damage_from'].length; j++) 
            doubleDamageFrom.push([response['damage_relations']['double_damage_from'][j]['name'], 2]);
    if(response['damage_relations']['half_damage_from'].length > 0) 
        for (let j = 0; j < response['damage_relations']['half_damage_from'].length; j++) 
            halfDamageFrom.push([response['damage_relations']['half_damage_from'][j]['name'], 0.5]);
    if(response['damage_relations']['no_damage_from'].length > 0) 
        for (let j = 0; j < response['damage_relations']['no_damage_from'].length; j++) 
            noDamageFrom.push([response['damage_relations']['no_damage_from'][j]['name'], 0]);
}


function getTypeDamageToValues(response) {
    if(response['damage_relations']['double_damage_to'].length > 0) 
        for (let j = 0; j < response['damage_relations']['double_damage_to'].length; j++) 
            doubleDamageTo.push([response['damage_relations']['double_damage_to'][j]['name'], 2]);
    if(response['damage_relations']['half_damage_to'].length > 0) 
        for (let j = 0; j < response['damage_relations']['half_damage_to'].length; j++) 
            halfDamageTo.push([response['damage_relations']['half_damage_to'][j]['name'], 0.5]);
    if(response['damage_relations']['no_damage_to'].length > 0) 
        for (let j = 0; j < response['damage_relations']['no_damage_to'].length; j++) 
            noDamageTo.push([response['damage_relations']['no_damage_to'][j]['name'], 0]);
}


function renderTypeDamageFromValues() {
    let current = [];
    let arrayLength = doubleDamageFrom.length;
        current.push(array[i]);
        array.splice(i,1);

}



function  copyDamageValues() {
    damageFrom = [];
    damageTo = [];
    if(doubleDamageFrom.length > 0)
        for (let i = 0; i < doubleDamageFrom.length; i++) 
            damageFrom.push(doubleDamageFrom[i]);
    if(halfDamageFrom.length > 0)
        for (let i = 0; i < halfDamageFrom.length; i++)
            damageFrom.push(halfDamageFrom[i]);
    if(noDamageFrom.length > 0)
        for (let i = 0; i < noDamageFrom.length; i++)
            damageFrom.push(noDamageFrom[i]);
    if(doubleDamageTo.length > 0)
        for (let i = 0; i < doubleDamageTo.length; i++) 
            damageTo.push(doubleDamageTo[i]);
    if(halfDamageTo.length > 0)
        for (let i = 0; i < halfDamageTo.length; i++)
            damageTo.push(halfDamageTo[i]);
    if(noDamageTo.length > 0)
        for (let i = 0; i < noDamageTo.length; i++)
            damageTo.push(noDamageTo[i]);
}



// LOAD INFOS
async function loadPokemonInformation(i) {

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