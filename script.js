let darkmode = false;
let sound = true;
let bgSound = 0;

let pokemonsPerPage;
let pokemonsPerPageMobile;
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

async function getLocalStorage() {
    darkmode = JSON.parse(localStorage.getItem('darkmode')) || false;
    sound = JSON.parse(localStorage.getItem('sound')) || true;
    pokemonsPerPage = JSON.parse(localStorage.getItem('pokemonsPerPage')) || 40;
    pokemonsPerPageMobile = JSON.parse(localStorage.getItem('pokemonsPerPageMobile')) || 40;
    favPokemons = await JSON.parse(localStorage.getItem(`favPokemons`)) || [];
    savedPokemons = await JSON.parse(localStorage.getItem(`savedPokemons`)) || [];
    lastPageNumber = JSON.parse(localStorage.getItem('pokemonsPerPage')) || 32;
}


function setLocalStorage() {
    localStorage.setItem('darkmode', darkmode);
    localStorage.setItem('sound', JSON.stringify(sound));
    localStorage.setItem('pokemonsPerPage', JSON.stringify(pokemonsPerPage));
    localStorage.setItem('pokemonsPerPageMobile', JSON.stringify(pokemonsPerPageMobile));
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
    localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
    localStorage.setItem('lastPageNumber', JSON.stringify(lastPageNumber));
}

///////////////////////////////  P O K E M O N   D A T A  ///////////////////////////////

async function getCount() {
    let url = `https://pokeapi.co/api/v2/pokemon`;
    let response = await fetch(url);
    let list = await response.json();
    count = list['count'];
    return count;
}


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


function addToSavedPokemons(i, pokemon) {
    savedPokemons[i] = pokemon;
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
}


function availableInPokemonsArray(i) {
        if(savedPokemons[i].length > 1) {
            currentPokemon = savedPokemons[i];
            return true;
        } 
    return false;
}

///////////////////////////////  R E N D E R   P A G E  ///////////////////////////////

function renderPokemonsPage(from, to) {
    let wrapper = document.getElementById(`pokemon-list-wrapper`);
    wrapper.innerHTML = templatePokemonList();
    let content = document.getElementById(`pokemon-list`);
    content.innerHTML = '';
    if(onFavoritesPage) {
        from = 0;
        to  = favPokemons.length <= to ? favPokemons.length : to;
    }
    if(searching) {
        from = 0;
        to = searchResults.length <= to ? searchResults.length : to;
    }
    if(to == 0) {
        noPokemonHere(content);
        searching = false;
        return;
    }
    for (let i = from; i < to; i++) 
        renderPokemonsListContent(i, content);
    if(document.getElementById('header-searchbar-input').value.length == 0)
        searching = false;
}


function templatePokemonList() {
    return `<div class="pokemon-list flex w-100" id="pokemon-list"></div>`;
}


function noPokemonHere(content) {
    content.innerHTML = `<div class="empty-fav-sign-container w-100 h-100 flex align-center">
                            <a class="relative "href="/index.html">
                                <span class="no-pokemon-here">No Pokemon here.</span>
                                <span class="go-catch-pokemon absolute">Go, catch em all!</span>
                            </a>
                        </div>`;
}


// ########## RENDER POKEMON LIST CONTENT ##########

function renderPokemonsListContent(elementNumber, content) {
    let pokemon;
    if(searching) pokemon = searchResults[elementNumber];
    else if(onFavoritesPage) pokemon = favPokemons[elementNumber];
    else pokemon = allPokemonsBasicData[elementNumber];
    content.innerHTML += templatePokemonsListElement(elementNumber, pokemon);
    renderPokemonTypes(`pokemon-list-element-type-container-${elementNumber}`, pokemon);   
    renderPokemonElementContainerColor(elementNumber);
}


function currentPage() {
    return window.location.pathname;
}


function templatePokemonsListElement(i, pokemon) {
    return `<div class="pokemon-list-element-container relative cursor-p" id="pokemon-list-element-container-${i}" onclick="renderPokemon(${i})">
                <div class="pokemon-list-element flex column">
                    <div class="pokemon-list-element-id-container flex absolute"><p>#${returnPokemonId(pokemon['id'])}</p></div>
                    <div class="pokemon-list-element-name-container"><p>${pokemon['name']['en']}</p></div>
                    <div class="pokemon-list-element-type-container flex" id="pokemon-list-element-type-container-${i}"></div>
                    <img src="${pokemon['image']}" class="pokemon-list-element-image absolute" id="pokemon-list-element-image-${i}">
                </div>
            </div>`;
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
    // background-image: linear-gradient(165deg, rgba(255, 255, 255, 0.4) 10%, transparent);
}


// function clickOutElement(i) {
//     document.getElementById(`pokemon-list-element-container-${i}`).style.borderStyle = 'none';
// }


// SOUND 
function selectSound() {
    select.pause();
    select.currentTime = 0;
    select.volume = 0.5;
    if(sound) select.play();
}

function noSelectSound() {
    if(sound) {
        select.pause();
        select.currentTime = 0;
    }
}

///////////////////////////////  P A G E   B O T T O M   N A V I G A T I O N  ///////////////////////////////

function renderPageSiteBottomNav() {
    if(!(onFavoritesPage || searching)) {
        calculateLastPageNumber(pokemonsPerPage);
        let content = document.getElementById(`pokemon-list`);
        content.innerHTML += `<div class="bottom-nav-container w-100 flex">
                                    <div class="bottom-nav align-center flex" id="bottom-nav"></div>
                                </div>`;
        renderBottomNavNumbers();
        addClasslist(`bottom-nav-number-${currentPageNumber}`, `selected-bottom-nav-number`);
    }
}


function calculateLastPageNumber(pokemonPerPageNumber) {
    let max = allPokemonsBasicData.length;
    if((max % pokemonPerPageNumber) > 0) lastPageNumber = parseInt((max / pokemonPerPageNumber).toString().split('.')[0]) + 1;
    else lastPageNumber = (max / pokemonPerPageNumber).toFixed();
    localStorage.setItem('lastPageNumber', JSON.stringify(lastPageNumber));
}


function renderBottomNavNumbers() {
    let nav = document.getElementById('bottom-nav');
    nav.innerHTML = '';
    if(!searching && !onFavoritesPage) {
        if(currentPageNumber == 1 || currentPageNumber == lastPageNumber) renderBottomNavNumbersEndPoints(nav);
        else if(currentPageNumber == 2 || currentPageNumber == (lastPageNumber-1)) renderBottomNavNumbersSecondEndPoints(nav);
        else if(currentPageNumber == 3 || currentPageNumber == (lastPageNumber-2)) renderBottomNavNumbersThirdEndPoints(nav);
        else renderBottomNavNumbersMiddle(nav);
    }
}


function renderBottomNavNumbersEndPoints(content) {
    if(lastPageNumber > 3) {
        if(currentPageNumber == 1) {
            renderBottomNavNumbersInLoopFor(3, 1, content);
            renderBottomNavEndingPlaceholder(content);
        } else if(currentPageNumber == lastPageNumber) {
            renderBottomNavBeginningPlaceholder(content);
            renderBottomNavNumbersInLoopFor(3, lastPageNumber-2, content);
        }
    } else renderBottomNavNumbersInLoopFor(3, 1, content);
}


function renderBottomNavNumbersSecondEndPoints(content) {
    if(lastPageNumber > 4) {
        if(currentPageNumber == 2) {
            renderBottomNavNumbersInLoopFor(4, 1, content);
            renderBottomNavEndingPlaceholder(content);
        } else if(currentPageNumber == (lastPageNumber-1)) {
            renderBottomNavBeginningPlaceholder(content);
            renderBottomNavNumbersInLoopFor(4, lastPageNumber-3, content);
        }
    } else renderBottomNavNumbersInLoopFor(4, 1, content)
}


function renderBottomNavNumbersThirdEndPoints(content) {
    if(lastPageNumber > 5) {
        if(currentPageNumber == 3) {
            renderBottomNavNumbersInLoopFor(5, 1, content);
            renderBottomNavEndingPlaceholder(content);
        } else if(currentPageNumber == (lastPageNumber-2)) {
            renderBottomNavBeginningPlaceholder(content);
            renderBottomNavNumbersInLoopFor(5, lastPageNumber-4, content);
        }
    } else renderBottomNavNumbersInLoopFor(5, 1, content);
}


function renderBottomNavNumbersMiddle(content) {
    renderBottomNavBeginningPlaceholder(content);
    renderBottomNavNumbersInLoopFor(5, currentPageNumber-2, content)
    renderBottomNavEndingPlaceholder(content);
}



function renderBottomNavBeginningPlaceholder(content) {
    content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-1" onclick="renderPageNumber(1)">1</p>`;
    content.innerHTML += `<p class="bottom-nav-placeholder">...</p>`;
}


function renderBottomNavEndingPlaceholder(content) {
    content.innerHTML += `<p class="bottom-nav-placeholder">...</p>`;
    content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-${lastPageNumber}" onclick="renderPageNumber(${lastPageNumber})">${lastPageNumber}</p>`;
}


function renderBottomNavNumbersInLoopFor(loopTimes, startingAt, content) {
    for (let i = 0; i < loopTimes; i++) {
        content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-${startingAt}" onclick="renderPageNumber(${startingAt})">${startingAt}</p>`;
        startingAt++;
    }
}


function renderPageNumber(i) {
    lastSelected = false;
    if(sideWrapperIsOpen) hideSelectedPokemonWrapper();
    currentPageNumber = i;
    let from = (i-1)*pokemonsPerPage;
    let to;
    if(i == lastPageNumber) to = from + (allPokemonsBasicData.length % pokemonsPerPage);
    else to = from + pokemonsPerPage;
    renderPokemonsPage(from, to);
    renderPageSiteBottomNav();
}

///////////////////////////////  R E N D E R   F O O T E R  ///////////////////////////////

function renderFooter() {
    let content = document.getElementById('footer');
    content.innerHTML = `
        <div class="footer-container flex w-100 h-100">
            <div>
                <p>Icons by <a href="https://iconsdb.com" target="_blank">iconsbd.com</a></p>
                <p>Design inspired by 
                    <a href="https://dribbble.com/shots/6545819-Pokedex-App" target="_blank">Saepul Nahwan</a> and 
                    <a href="https://dribbble.com/shots/11114892-Pok-dex-App" target="_blank">Flavio Farias</a></p>
                <p>Pokemon information from the <a href="https://pokeapi.co" target="_blank">Pokeapi</a></p>
            </div>
            <div>
                <a class="impressum-link" href="/impressum.html">Impressum</a>
            </div>
        </div>`;
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