let modus = 'white';
let sound = 1;
let bgSound = 1;
let pageNumber = 0;
let pokemonsPerPage = 20;
let pokemonsPerPageMobile = 10;
let currentPokemonList = []; 
let allPokemons = [];
const bgMusic = new Audio('assets/sounds/poke_theme_music.mp3');
const select = new Audio('assets/sounds/select_sound.mp3');

// localStorage.setItem('name', JSON.stringify(name));
// let name = JSON.parse(localStorage.getItem(`name`)) || [];

async function init() {
    await getLocalStorage();
    let url;
    if(!currentPokemonList.length) {
        if(window.innerWidth > 800) url = `https://pokeapi.co/api/v2/pokemon/?offset=${pageNumber}0&limit=${pokemonsPerPage}`;
        else url = `https://pokeapi.co/api/v2/pokemon/?offset=${pageNumber}0&limit=${pokemonsPerPageMobile}`
        let response = await fetch(url);
        currentPokemonList = await response.json();
        localStorage.setItem('currentPokemonList', JSON.stringify(currentPokemonList));
    }
    console.log('pokemon', currentPokemonList);
    renderHeader();
}


function renderHeader() {
    let header = document.getElementById(`header`);
    header.innerHTML = templateHeaderWrapper();
    let content = document.getElementById(`header-wrapper`);
    content.innerHTML = templateHeaderTitle();
    content.innerHTML += templateHeaderFunctionalityWrapper();
    let headerFunctionality = document.getElementById(`header-functionality-wrapper`);
    headerFunctionality.innerHTML = templateHeaderSoundIcon();
    headerFunctionality.innerHTML += templateHeaderSearchbar();
    headerFunctionality.innerHTML += templateHeaderFavorites();
    headerFunctionality.innerHTML += templateHeaderSettings();
    addClasslist(`header`, `show-header`);
}


function templateHeaderWrapper() {
    return `<div class="header-wrapper w-100 h-100 flex" id="header-wrapper"></div>`;
}


function templateHeaderTitle() {
    return `<a class="header-title cursor-p" onclick="init()">Pokedex</a>`;
}


function templateHeaderFunctionalityWrapper() {
    return `<div class="header-functionality-wrapper flex" id="header-functionality-wrapper"></div>`;
}


function templateHeaderSoundIcon() {
    return `<img class="header-sound cursor-p d-none" id="header-sound" src="assets/img/sound_icon.png" onclick="mute()">
            <img class="header-sound cursor-p" id="header-sound-mute" src="assets/img/sound_icon_mute.png" onclick="unmute()">`;
}


function templateHeaderSearchbar() {
    return `<div class="header-searchbar flex" id="header-searchbar">
                <input type="text" class="header-searchbar-input w-100 h-100" id="header-searchbar-input" placeholder="Search Pokemons" onKeyUp="searchPokemon()">
            </input></div>`;
}


function templateHeaderFavorites() {
    return `<img class="header-favorites cursor-p" id="header-favorites-gray" src="assets/img/outline_star_icon.png" onclick="markFavoritesIcon()">
            <img class="header-favorites cursor-p d-none" id="header-favorites-white" src="assets/img/outline_star_icon_white.png" onclick="unmarkFavoritesIcon()">`;
}


function templateHeaderSettings() {
    return `<img class="header-settings cursor-p" id="header-settings-gray" src="assets/img/settings_icon.png" onclick="markSettingsIcon()">
            <img class="header-settings cursor-p d-none" id="header-settings-white" src="assets/img/settings_icon_white.png" onclick="unmarkSettingsIcon()">`;
}


function markFavoritesIcon() {
    unmarkAllHeaderIcons();
    addClasslist(`header-favorites-gray`, `d-none`);
    removeClasslist(`header-favorites-white`,`d-none`);
}


function unmarkFavoritesIcon() {
    addClasslist(`header-favorites-white`,`d-none`);
    removeClasslist(`header-favorites-gray`, `d-none`);   
}


function markSettingsIcon() {
    unmarkAllHeaderIcons();
    addClasslist(`header-settings-gray`, `d-none`);
    removeClasslist(`header-settings-white`,`d-none`);
}


function unmarkSettingsIcon() {
    addClasslist(`header-settings-white`,`d-none`);
    removeClasslist(`header-settings-gray`, `d-none`);   
}


function unmarkAllHeaderIcons() {
    addClasslist(`header-favorites-white`,`d-none`);
    removeClasslist(`header-favorites-gray`, `d-none`);  
    addClasslist(`header-settings-white`,`d-none`);
    removeClasslist(`header-settings-gray`, `d-none`);  
}


function loadPokemons() {

}

// function addToCurrentPokemonList(responseAsText) {
//     currentPokemonList = [];
//     for (let i = 0; i < responseAsText['results'].length; i++) {
//         currentPokemonList.push(responseAsText['results'][i]);
//     }
// }


function searchPokemon() {
    let count = currentPokemonList['count'];
    if(header-searchbar-input.value) {
        let inputField = document.getElementById(`header-searchbar-input`);
        inputField.value = `${header-searchbar-input.value}` + `<span class="lightgray" id="possibleSearchResult">${possibleSearchResult}</span>`;
    }
}


function mute() {
    addClasslist(`header-sound`, `d-none`);
    removeClasslist(`header-sound-mute`, `d-none`);
    bgMusic.pause();
    sound = 0;
    localStorage.setItem('sound') = 
}


function unmute() {
    removeClasslist(`header-sound`, `d-none`);
    addClasslist(`header-sound-mute`, `d-none`);
    bgMusic.volume = 0.06;
    bgMusic.loop = true;
    bgMusic.play(); 
}







// HELP FUNCTIONS
function addClasslist(id, classe) {
    document.getElementById(id).classList.add(classe);
}


function removeClasslist(id, classe) {
    document.getElementById(id).classList.remove(classe);
}


async function getLocalStorage() {
    modus = localStorage.getItem('modus') || 'white';
    sound = localStorage.getItem('sound') || 1;
    bgSound = localStorage.getItem('bgSound') || 1;
    pageNumber = localStorage.getItem('pageNumber') || 0;
    pokemonsPerPage = localStorage.getItem('pokemonsPerPage') || 20;
    pokemonsPerPageMobile = localStorage.getItem('pokemonsPerPageMobile') || 10;
    currentPokemonList = await JSON.parse(localStorage.getItem(`currentPokemonList`)) || [];  
    allPokemons = await JSON.parse(localStorage.getItem(`allPokemons`)) || [];
}

