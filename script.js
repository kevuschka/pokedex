let darkmode;
let sound;
let bgSound = 0;
let currentPageIndex = 0;
let pokemonsPerPage;
let pokemonsPerPageMobile;
let pagePokemonsBasicData = []; 
let pagePokemonsElementData = [];



let allPokemonsBasicData = {
    'count': '',
    'results': {
        'results': [],
        'names': [],
        'generations': [],
    }
};

let allPokemons = [];
let pokemonData = {
    'name': 
        {
            'name': '',
            'names': [],
        },
    'generations': [],
    'id':'',
    'image': '',
    'types': [],
    'background_color': '',
    'about': 
        {   
            'species' :  [],
            'habitat': [],
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
            'abilities' : [],
            'growth_rate': [],
            'egg_groups': [],
        },
    'base_stats': 
        {   
            'stats': [],
            'total': '',
            'type_defense': 
                {
                    'damage_to': [],
                    'damage_from': [],
                },
        },
    'evolution':  [],
};


let favPokemons = [];
const bgMusic = new Audio('assets/sounds/poke_theme_music.mp3');
const select = new Audio('assets/sounds/select_sound.mp3');
let searchResults = [];
let settingsOpen = 0;

let currentDate;
let count;
let lang = 'en';
let currentPokemon;


async function init() {
    await includeHTML();
    await getLocalStorage();
    await setLocalStorage();
    await updateAllPokemonsData();
    cleanValues();
    // await getMaxPokemonNumber();
    // await getPagePokemonsBasicInfo(getPokemonsPerPageNumber());
    // await getPokemonsElementsInfo(getPokemonsPerPageNumber());
    // console.log('pokemon on page', pagePokemonsBasicData);
    renderHeader();
    renderPokemonsPage(currentPageIndex, getPokemonsPerPageNumber());
    
}


// LOCALSTORAGE

async function getLocalStorage() {
    lang = localStorage.getItem('lang') || 'en';
    darkmode = JSON.parse(localStorage.getItem('darkmode')) || 0;
    sound = JSON.parse(localStorage.getItem('sound')) || 1;
    // currentPageNumber = JSON.parse(localStorage.getItem('currentPageNumber')) || 0;
    pokemonsPerPage = JSON.parse(localStorage.getItem('pokemonsPerPage')) || 40;
    pokemonsPerPageMobile = JSON.parse(localStorage.getItem('pokemonsPerPageMobile')) || 40;
    currentDate = await JSON.parse(localStorage.getItem('currentDate')) || '';
    allPokemons = await JSON.parse(localStorage.getItem(`allPokemons`)) || []; 
    favPokemons = await JSON.parse(localStorage.getItem(`favPokemons`)) || [];
}


async function setLocalStorage() {
    localStorage.setItem('darkmode', darkmode);
    localStorage.setItem('sound', sound);
    localStorage.setItem('pokemonsPerPage', pokemonsPerPage);
    localStorage.setItem('pokemonsPerPageMobile', pokemonsPerPageMobile);
}


// async function getMaxPokemonNumber() {
//     let url = 'https://pokeapi.co/api/v2/pokemon/';
//     let resp = await fetch(url);
//     let response = await resp.json();
//     count = response['count'];
// }


// PAGE INDEX & POKEMONS PER PAGE

function getPokemonsPerPageNumber() {
    if(window.innerWidth > 800) {
        if((currentPageIndex + pokemonsPerPage) > count) 
            return pokemonsPerPage = count - currentPageIndex;
        else return pokemonsPerPage;
    } else  {
        if((currentPageIndex + pokemonsPerPageMobile) > count) 
            return pokemonsPerPageMobile = count - currentPageIndex;
        else return pokemonsPerPageMobile;
    }
}


// function getTargetPageIndex() {
//     if(window.innerWidth > 800) return (currentPageIndex + pokemonsPerPage);
//     else return (currentPageIndex + pokemonsPerPageMobile);
// }


// POKEMON LIST DATA





// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// LATEST DATA


async function getCount() {
    let url = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(url);
    let list = await response.json();
    count = list['count'];
}


async function updateAllPokemonsData() {
    if(allPokemons.length == 0) {
        await getAllPokemonsData();
        localStorage.setItem('currentDate', JSON.stringify(getDateAsArray()));
    } else 
        if(!dataIsFromLatestDate()) {
            localStorage.setItem('currentDate', JSON.stringify(currentDate));
            await getAllPokemonsData();
        }
}


async function getAllPokemonsData() {
    getCount();
    let allPokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`;
    let response = await fetch(allPokemonUrl);
    let allPokemonList = await response.json();
    console.log('originalList:', originalList);
    await renderPokemonsElementData(allPokemonList);
    localStorage.setItem(`allPokemons`, JSON.stringify(allPokemons));
} 


async function renderPokemonsElementData(basicData) {
    allPokemons = [];
    for (let i = 0; i < basicData['results'].length; i++) {
        let url = basicData['results'][i]['url'];
        let response = await fetch(url);
        let pagePokemonsElementData = await response.json();
        getPokemonName(basicData['results'][i]['name']);
        getPokemonId(pagePokemonsElementData);
        getPokemonImage(pagePokemonsElementData);
        getPokemonTypes(pokemon);
        getPokemonSpeciesData(pagePokemonsElementData);
        getPokemonHeight(pagePokemonsElementData);
        getPokemonWeight(pagePokemonsElementData);
        await getPokemonAbilities(pagePokemonsElementData);
        getStats(pagePokemonsElementData);

        allPokemons.push();
    }
}




async function getPokemonSpeciesData(pokemon) {
    let url = pokemon['species']['url'];
    let response = await fetch(url);
    let species = await response.json();
    getAllNames(species);
    getAllGenerations(species);
    getPokemonBackgroundColor(species);
    getPokemonSpecies(species);
    getPokemonHabitat(species);
    getPokemonGrowthRate(species);
    getPokemonEggGroups(species);
    await getPokemonEvolutionData(species);


}


async function getPokemonEvolutionData(species) {
    if(species['evolution_chain'].length > 0) {
        let url = response['evolution_chain']['url'];
        let response = await fetch(url);
        let evolution = await response.json();
        await renderPokemonEvolutionData(evolution['chain'])
    }
}


async function getPokemonTypeDamageData(pokemon) {
    pokemonData['base_stats']['type_defense']['damage_to'] = [];
    pokemonData['base_stats']['type_defense']['damage_from'] = [];
    for (let i = 0; i < pokemon['types'].length; i++) {
        let url = pokemon['types'][i]['type']['url'];
        let response = await fetch(url);
        let type = await response.json(); 
        renderTypeDamageValues(type, pokemon['types'].length);
    }
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// async function getPokemonsElementsInfo(number) {
//     pagePokemonsElementData = [];
//     for (let i = 0; i < number; i++) {
//         let url = pagePokemonsBasicData['results'][i]['url'];
//         let resp = await fetch(url);
//         pagePokemonsElementData.push(await resp.json());
//     }
// }  





// async function getAllPokemonsBasicInfoPokemonData(originalList, i) {
//     let url = originalList['results'][i]['url'];
//     let resp = await fetch(url);
//     let response = await resp.json();
//     let speciesURL = response['species']['url'];
//     let speciesResp = await fetch(speciesURL);
//     let species = await speciesResp.json();
//     allPokemonsBasicData['results']['results'].push(originalList['results'][i]);
//     // allPokemonsBasicData['results']['names'].push(getAllNames(species));
//     allPokemonsBasicData['results']['generations'].push({'gen':getAllGenerations(species)});
// }






// GET DATE
function dataIsFromLatestDate() {
    let date = getDateAsArray();
    if(currentDate) {
        if(date[0] > currentDate[0]) {
            currentDate = [[date[0]], [date[1]], [date[2]]];
            return false;
        } else return isLatestMonth(date);
    } else {
        currentDate = [[date[0]], [date[1]], [date[2]]];
        return false;
    }
}


function getDateAsArray() {
    let date = new Date();
    date = date.toISOString();
    date = date.split('T')[0];
    return date.split('-');
}


function isLatestMonth(date) {
    if(date[1] > currentDate[1]) {
        currentDate = [[date[0]], [date[1]], [date[2]]];
        return false;
    } else return isLatestDay(date);
}


function isLatestDay(date) {
    if(date[2] > currentDate[2]) {
        currentDate = [[date[0]], [date[1]], [date[2]]];
        return false;
    } else return true;
}


// HELP FUNCTIONS
function addClasslist(id, classe) {
    document.getElementById(id).classList.add(classe);
}


function removeClasslist(id, classe) {
    document.getElementById(id).classList.remove(classe);
}






// ########## POKEMON ##########

async function renderPokemonsPage(from, to) {
    let wrapper = document.getElementById(`pokemon-list-wrapper`);
    wrapper.innerHTML = templatePokemonList();
    let content = document.getElementById(`pokemon-list`);
    content.innerHTML = '';
    for (let i = from; i < to; i++) {
        renderPokemonsListContent(i, content);
        renderPageColor();
    }
}


function templatePokemonList() {
    return `<div class="pokemon-list flex w-100" id="pokemon-list"></div>`;
}


// ########## RENDER POKEMON LIST CONTENT ##########

async function renderPokemonsListContent(elementNumber, content) {
    if(currentPage().includes('favorites.html')) {}
    else if(currentPage().includes('index.html')) {}
    let name;
    let id;
    for (let i = 0; i < elementNumber; i++) {
        name = allPokemons[elementNumber]['name']['name'];
        id = allPokemons[elementNumber]['id'];
        content.innerHTML += templatePokemonsListElement(i, name, id);
        renderPokemonTypes(i, `pokemon-list-element-type-container-${i}`);
        let color = allPokemons[elementNumber]['background_color'];
        addClasslist(`pokemon-list-element-container-${i}`, `${color}`);
    }
}


function renderPokemonPageContent(elementsNumber, content) {

}


function currentPage() {
    return window.location.pathname;
}


function templatePokemonsListElement(i, name, id) {
    return `<div class="pokemon-list-element-container relative cursor-p" id="pokemon-list-element-container-${i}" onclick="renderPokemon(${i})" onmousedown="clickOnElement(${i})" onmouseup="clickOutElement(${i})">
                <div class="pokemon-list-element flex column">
                    <div class="pokemon-list-element-id-container flex absolute"><p>#${getPokemonId(i, id)}</p></div>
                    <div class="pokemon-list-element-name-container"><p>${getPokemonName(name)}</p></div>
                    <div class="pokemon-list-element-type-container flex" id="pokemon-list-element-type-container-${i}"></div>
                    <img src="${getPokemonImage(i)}" class="pokemon-list-element-image absolute" id="pokemon-list-element-image-${i}">
                </div>
            </div>`;
}











function renderPokemonTypes(i, contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    let array = getPokemonTypes(i);
    for (let j = 0; j < array.length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type flex"><p>${array[j]}</p></div>`;
}







function renderPageColor() {
    if(darkmode) document.getElementById(`content-container`).style.backgroundColor = 'rgba(0,0,0,0.5)';
    else document.getElementById('content-container').style.backgroundColor = 'white'; 
}


// CLICK ON LIST ELEMENT (POKEMON)
function clickOnElement(i) {
    selectSound();
    document.getElementById(`pokemon-list-element-container-${i}`).style.boxShadow = 'none';
    document.getElementById(`pokemon-list-element-container-${i}`).style.borderStyle = 'inset';
}


function clickOutElement(i) {
    document.getElementById(`pokemon-list-element-container-${i}`).style.borderStyle = 'none';
}


// SOUND 
function selectSound() {
    select.pause();
    select.currentTime = 0;
    if(sound) select.play();
}

function noSelectSound() {
    if(sound) {
        select.pause();
        select.currentTime = 0;
    }
}

function hoverElementOut(i) {
    noSelectSound();
}


function emptyAllPokemonsBasicData() {
    return {
                'count': '',
                'results': {
                    'results': [],
                    'names': [],
                    'generations': [],
                },
            };
}


function cleanValues() {
    sideWrapperIsOpen = false;
}