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


///////////////////////////////  L O C A L S T O R A G E  ///////////////////////////////

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

///////////////////////////////  P O K E M O N   D A T A  ///////////////////////////////

async function updateAllPokemonsData() {
    if(allPokemons.length == 0) {
        await getAllPokemonsData();
        localStorage.setItem('allPokemons', JSON.stringify(allPokemons));
        localStorage.setItem('currentDate', JSON.stringify(getDateAsArray()));
    } else 
        if(!dataIsFromLatestDate()) {
            await getAllPokemonsData();
            localStorage.setItem('currentDate', JSON.stringify(currentDate));
            localStorage.setItem('allPokemons', JSON.stringify(allPokemons));
        }
}


async function getAllPokemonsData() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${await getCount()}`;
    let response = await fetch(url);
    let allPokemonList = await response.json();
    console.log('originalList:', allPokemonList);
    await renderPokemonsElementData(allPokemonList);
    localStorage.setItem(`allPokemons`, JSON.stringify(allPokemons));
} 


async function getCount() {
    let url = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(url);
    let list = await response.json();
    let anzahl = list['count'];
    return anzahl;
}


async function renderPokemonsElementData(basic) {
    allPokemons = [];
    for (let i = 0; i < basic['results'].length; i++) {
        let url = basic['results'][i]['url'];
        let response = await fetch(url);
        let pokemon = await response.json();
        getPokemonName(basic['results'][i]['name']);
        getPokemonId(pokemon);
        getPokemonImage(pokemon);
        getPokemonTypes(pokemon);
        await getPokemonSpeciesData(pokemon);
        getPokemonHeight(pokemon);
        getPokemonWeight(pokemon);
        await getPokemonAbilities(pokemon);
        getStats(pokemon);
        await getPokemonTypeDamageData(pokemon);
        allPokemons.push(pokemonData);
        console.log(`allPokemons:`, allPokemons);
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
    if(species['evolution_chain'].length > 0 || species['evolution_chain']['url']) {
        let url = species['evolution_chain']['url'];
        let response = await fetch(url);
        let evolution = await response.json();
        await renderPokemonEvolutionData(evolution['chain'])
    }
}


async function getPokemonTypeDamageData(pokemon) {
    pokemonData['base_stats']['type_defense']['damage_to'] = [];
    pokemonData['base_stats']['type_defense']['damage_from'] = [];
    cleanDamageArrays(); 
    await renderTypeDamageValues(pokemon);
    getDamageValues();
}

///////////////////////////////  L A T E S T   D A T E  ///////////////////////////////

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

///////////////////////////////  C L E A N   V A L U E S   ///////////////////////////////

function cleanValues() {
    sideWrapperIsOpen = false;
}

///////////////////////////////  R E N D E R   P A G E  ///////////////////////////////

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
    // if(currentPage().includes('favorites.html')) {}
    // else if(currentPage().includes('index.html')) {}
    content.innerHTML += templatePokemonsListElement(elementNumber);
    renderPokemonTypes(elementNumber, `pokemon-list-element-type-container-${elementNumber}`);
    let color = allPokemons[elementNumber]['background_color'];
    addClasslist(`pokemon-list-element-container-${i}`, `${color}`);
}


function currentPage() {
    return window.location.pathname;
}


function templatePokemonsListElement(i) {
    return `<div class="pokemon-list-element-container relative cursor-p" id="pokemon-list-element-container-${i}" onclick="renderPokemon(${i})" onmousedown="clickOnElement(${i})" onmouseup="clickOutElement(${i})">
                <div class="pokemon-list-element flex column">
                    <div class="pokemon-list-element-id-container flex absolute"><p>#${allPokemons[i]['id']}</p></div>
                    <div class="pokemon-list-element-name-container"><p>${allPokemons[i]['name']['name']}</p></div>
                    <div class="pokemon-list-element-type-container flex" id="pokemon-list-element-type-container-${i}"></div>
                    <img src="${allPokemons[i]['image']}" class="pokemon-list-element-image absolute" id="pokemon-list-element-image-${i}">
                </div>
            </div>`;
}


function renderPokemonTypes(i, contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    for (let j = 0; j < allPokemons[i]['types'].length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type flex"><p>${allPokemons[i]['types'][j]}</p></div>`;
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

///////////////////////////////  H E L P   F U N C T I O N S  ///////////////////////////////

function addClasslist(id, classe) {
    document.getElementById(id).classList.add(classe);
}


function removeClasslist(id, classe) {
    document.getElementById(id).classList.remove(classe);
}

