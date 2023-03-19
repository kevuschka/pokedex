let darkmode;
let sound = true;
let bgSound = 0;
let pokemonsPerPage;
let pagePokemonsBasicData = []; 
let pagePokemonsElementData = [];
let allPokemons = [];
let pokemonData;
let favPokemons = [];
let onFavoritesPage = false;
const bgMusic = new Audio('assets/sounds/poke_theme_music.mp3');
const select = new Audio('assets/sounds/select_sound.mp3');
let searchResults = [];
let searching = false;
let settingsOpen = false;
let count;
let dataLoaded = false;
let savedPokemons = [];
let lastPageNumber;
let currentPageNumber = 1;

/**
 * That is the body onload function.
 * It renders the load-popup, the header, the localstorage, the pokemon list and tghe footer.
 */
async function init() {
    if(window.location.pathname.includes('favorites.html')) onFavoritesPage = true;
    await includeHTML();
    await getLocalStorage();
    setLocalStorage();
    renderLoadPopup();
    await createSavedPokemonsArray();
    sideWrapperIsOpen = false;
    renderHeader();
    renderPokemonsPage(0, pokemonsPerPage);
    renderPageColor();
    closeLoadPopup();
    renderPageSiteBottomNav();
    renderFooter();
}


///////////////////////////////  L O C A L S T O R A G E  ///////////////////////////////
/**
 * That function loads the storad data in the localstorage.
 */
async function getLocalStorage() {
    darkmode = JSON.parse(localStorage.getItem('darkmode')) || false;
    sound = localStorage.getItem('sound') || true;
    pokemonsPerPage = JSON.parse(localStorage.getItem('pokemonsPerPage')) || 40;
    favPokemons = await JSON.parse(localStorage.getItem(`favPokemons`)) || [];
    savedPokemons = await JSON.parse(localStorage.getItem(`savedPokemons`)) || [];
    lastPageNumber = JSON.parse(localStorage.getItem('pokemonsPerPage')) || 32;
}

/**
 * That function sets and saves some data to the localstorage.
 */
function setLocalStorage() {
    localStorage.setItem('darkmode', darkmode);
    localStorage.setItem('sound', sound);
    localStorage.setItem('pokemonsPerPage', JSON.stringify(pokemonsPerPage));
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
    localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
    localStorage.setItem('lastPageNumber', JSON.stringify(lastPageNumber));
}

///////////////////////////////  P O K E M O N   D A T A  ///////////////////////////////
/**
 * That function fetches and returns the number of all available pokemons from this api.
 * @returns - The total number of all available pokemons (from this pokeAPI).
 */
async function getCount() {
    let url = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(url);
    let list = await response.json();
    count = list['count'];
    return count;
}

/**
 * That function creates (if not allready done) an array with many (amount of all pokemons number) '{}' 
 * for storing pokemons which had been already rendered and fetched (clicked on).
 */
async function createSavedPokemonsArray() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${await getCount()}`;
    let response = await fetch(url);
    let allPokemonList = await response.json();
    console.log('originalList:', allPokemonList);
    if(savedPokemons.length == 0) {
        for (let i = 0; i < allPokemonList['results'].length; i++) 
            savedPokemons.push({});
        localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
    }
    dataLoaded = true;
} 

/**
 * That function adds the rendered pokemon to the savedPokemons array with its index.
 * @param {number} i - is the index of that pokemon (from 0 to [total number of pokemons] - 1).
 * @param {JSON} pokemon - is the current (opened) rendered pokemon with all its data fetched. 
 */
function addToSavedPokemons(i, pokemon) {
    savedPokemons[i] = pokemon;
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
}

/**
 * That function checks whether that rendered pokemon is allready available in the savedPokemons array.
 * @param {number} i - is the index of that pokemon (from 0 to [total number of pokemons - 1]).
 * @returns a boolean: true if the pokemon is available in the savedPokemons array, else it return false.
 */
function availableInPokemonsArray(i) {
        if(savedPokemons[i].id > 0) {
            currentPokemon = savedPokemons[i];
            return true;
        } 
    return false;
}

///////////////////////////////  R E N D E R   P A G E  ///////////////////////////////
/**
 * That function renders the page with all its pokemons, including while searching or when on the favorites url.
 * @param {number} from - is the minimum pokemon index number from which the rest pokemons will be rendered.
 * @param {number} to - is the number of pokemons that will be rendered and shown on that page.
 */
function renderPokemonsPage(from, to) {
    let wrapper = document.getElementById(`pokemon-list-wrapper`);
    wrapper.innerHTML = templatePokemonList();
    let content = document.getElementById(`pokemon-list`);
    content.innerHTML = '';
    if(onFavoritesPage || searching) from = 0;
    if(onFavoritesPage) to  = favPokemons.length <= to ? favPokemons.length : to;
    if(searching) to = searchResults.length <= to ? searchResults.length : to;
    renderNoPokemonHereIfNecessary(content, to);
    for (let i = from; i < to; i++) renderPokemonsListContent(i, content);
    if(document.getElementById('header-searchbar-input').value.length == 0) searching = false;
}

/**
 * That function renders a sign (its also a button) if there are no pokemons to render (invalid search or empty on favorites).
 * @param {element} content - is the div element where the 'noPokemonHere' sign will be loaded.
 * @param {number} to - is the number of pokemons that will be rendered and shown on that page.
 * @returns void - for not executing the next functions in the 'renderPokemonsPage' function.
 */
function renderNoPokemonHereIfNecessary(content, to) {
    if(to == 0) {
        noPokemonHere(content);
        searching = false;
        return;
    }
}


function templatePokemonList() {
    return `<div class="pokemon-list flex w-100" id="pokemon-list"></div>`;
}

// ########## RENDER POKEMON LIST CONTENT ##########
/**
 * That function renders all the pokemons in the pokemon-list element on this page, also depending on searching and on favorites page.
 * @param {number} elementNumber - is the index of that pokemon in the array 'allPokemonsBasicData'.
 * @param {element} content - is the current div element, where the pokemon data is rendered to.
 */
function renderPokemonsListContent(elementNumber, content) {
    let pokemon;
    if(searching) pokemon = searchResults[elementNumber];
    else if(onFavoritesPage) pokemon = favPokemons[elementNumber];
    else pokemon = allPokemonsBasicData[elementNumber];
    content.innerHTML += templatePokemonsListElement(elementNumber, pokemon);
    renderPokemonTypes(`pokemon-list-element-type-container-${elementNumber}`, pokemon);   
    renderPokemonElementContainerColor(elementNumber);
}


function renderPokemonTypes(contentId, pokemon) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    for (let j = 0; j < pokemon['types'].length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type flex"><p>${pokemon['types'][j]}</p></div>`;
}


function renderPokemonElementContainerColor(i) {
    let color;
    if(searching) color = searchResults[i]['background_color'];
    else if(onFavoritesPage) color = favPokemons[i]['background_color'];
    else color = allPokemonsBasicData[i]['background_color'];
    addClasslist(`pokemon-list-element-container-${i}`, `${color}`);
}


function renderPageColor() {
    if(darkmode) addClasslist(`wrapper`, 'bg-darkmode');
    else removeClasslist(`wrapper`, 'bg-darkmode');
}


// CLICK ON LIST ELEMENT (POKEMON)
function clickOnElement(i) {
    selectSound();
    document.getElementById(`pokemon-list-element-container-${i}`).style.boxShadow = 'none';
    document.getElementById(`pokemon-list-element-container-${i}`).style.opacity = '1';
    document.getElementById(`pokemon-list-element-container-${i}`).style.cursor = 'default'
}


// SOUND 
function selectSound() {
    select.pause();
    select.currentTime = 0;
    select.volume = 0.5;
    if(sound == "true" || sound == true) select.play();
}

///////////////////////////////  R E N D E R   F O O T E R  ///////////////////////////////

function renderFooter() {
    let content = document.getElementById('footer');
    content.innerHTML = templateFooter();
}

///////////////////////////////  H E L P   F U N C T I O N S  ///////////////////////////////

function addClasslist(id, classe) {
    document.getElementById(id).classList.add(classe);
}


function removeClasslist(id, classe) {
    document.getElementById(id).classList.remove(classe);
}


function returnNameFormatted(name) {
    let nameArray = name.split('-');
    let betterArray = [];
    let finalName = '';
    if(nameArray.length > 0)
        for (let j = 0; j < nameArray.length; j++) {
            betterArray[j] = `${nameArray[j].charAt(0).toUpperCase()}` + `${nameArray[j].slice(1)}`;
            finalName += `${betterArray[j]}`;
            if(nameArray.length > (j+1)) finalName += ' ';
        }
    return finalName;
}


function returnNameformattedMinus(name) {
    let nameArray = name.split('-');
    let betterArray = [];
    let finalName = '';
    if(nameArray.length > 0)
        for (let j = 0; j < nameArray.length; j++) {
            betterArray[j] = `${nameArray[j].charAt(0).toUpperCase()}` + `${nameArray[j].slice(1)}`;
            finalName += `${betterArray[j]}`;
            if(nameArray.length > (j+1)) finalName += '-';
        }
    return finalName;
}


function doNotClose(event) {
    event.stopPropagation();
}


function cleanPokemonData() {
    pokemonData = {
        'name': 
            {
                'en': '',
                'de': '',
            },
        'description': '',
        'generations': [],
        'id':'',
        'image': '',
        'types': [],
        'background_color': '',
        'is_baby': false,
        'is_legendary': false,
        'is_mythical': false,
        'hatch_counter': '',
        'about': 
            {   
                'species' :  [],
                'habitat': [],
                'height' : 
                    {
                        'meter': '',
                        'inch': '',
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
        'locations': [],
        'base_happiness': [],
        'capture_rate': [],
        'base_exp': '', 
        'moves': [],
    };
}