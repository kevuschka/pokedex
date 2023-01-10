let darkmode = 0;
let sound = 1;
let bgSound = 0;
let currentPageNumber = 0;
let pokemonsPerPage = 20;
let pokemonsPerPageMobile = 10;
let currentPokemonList = []; 
let allPokemons = [];
let favPokemons = [];
const bgMusic = new Audio('assets/sounds/poke_theme_music.mp3');
const select = new Audio('assets/sounds/select_sound.mp3');
let searchResults = [];

// localStorage.setItem('name', JSON.stringify(name));
// let name = JSON.parse(localStorage.getItem(`name`)) || [];
function darkmodeOnOff() {
    if(darkmode) darkmode = 0;
    else darkmode = 1;
    localStorage.setItem('darkmode', darkmode);
}


async function init() {
    await getLocalStorage();
    await setLocalStorage();
    let url;
    if(currentPokemonList.length == 0) {
        if(window.innerWidth > 800) url = `https://pokeapi.co/api/v2/pokemon/?offset=${currentPageNumber}0&limit=${pokemonsPerPage}`;
        else url = `https://pokeapi.co/api/v2/pokemon/?offset=${currentPageNumber}0&limit=${pokemonsPerPageMobile}`
        let response = await fetch(url);
        currentPokemonList = await response.json();
        localStorage.setItem('currentPokemonList', JSON.stringify(currentPokemonList));
    }
    if(allPokemons.length == 0) await preloadAllPokemons();
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
    renderHeaderFunctionalityTemplates(headerFunctionality);
    renderHeaderColor();
    addClasslist(`header`, `show-header`);

}


function renderHeaderFunctionalityTemplates(content) {
    content.innerHTML = templateHeaderMusicIcon();
    content.innerHTML += templateHeaderSoundIcon();
    content.innerHTML += templateHeaderSearchbar();
    content.innerHTML += templateHeaderFavorites();
    content.innerHTML += templateHeaderSettings();
    renderHeaderIcons();
}


function renderHeaderColor() {
    if(darkmode) {
        removeClasslist('header', 'bg-normal');
        addClasslist('header', 'bg-darkmode');
    } else {
        removeClasslist('header', 'bg-darkmode');
        addClasslist('header', 'bg-normal');
    }
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


function templateHeaderMusicIcon() {
    return `<img class="header-music cursor-p d-none" id="header-music-gray" src="assets/img/music_icon.png" onclick="unmuteMusic()">
            <img class="header-music cursor-p d-none" id="header-music-dark" src="assets/img/music_icon_dark.png" onclick="unmuteMusic()">
            <img class="header-music cursor-p d-none" id="header-music-mute" src="assets/img/music_icon_pause.png" onclick="muteMusic()">`;
}


function templateHeaderSoundIcon() {
    return `<img class="header-sound cursor-p d-none" id="header-sound-gray" src="assets/img/sound_icon.png" onclick="muteSound()">
            <img class="header-sound cursor-p d-none" id="header-sound-dark" src="assets/img/sound_icon_dark.png" onclick="muteSound()"> 
            <img class="header-sound cursor-p d-none" id="header-sound-mute" src="assets/img/sound_icon_mute.png" onclick="unmuteSound()">`;
}


function templateHeaderSearchbar() {
    return `<form onsubmit="" class="header-searchbar flex" id="header-searchbar">
                <input type="text" class="header-searchbar-input w-100 h-100" id="header-searchbar-input" placeholder="Search Pokemons" onKeyUp="searchPokemon()">
                <input type="submit" style="display: none"/>
            </input></div>`;
}


function templateHeaderFavorites() {
    return `<img class="header-favorites cursor-p d-none" id="header-favorites-gray" src="assets/img/outline_star_icon.png" onclick="markFavoritesIcon()">
            <img class="header-favorites cursor-p d-none" id="header-favorites-dark" src="assets/img/outline_star_icon_dark.png" onclick="markFavoritesIcon()">
            <img class="header-favorites cursor-p d-none" id="header-favorites-white" src="assets/img/outline_star_icon_white.png" onclick="unmarkFavoritesIcon()">`;
}


function templateHeaderSettings() {
    return `<img class="header-settings cursor-p d-none" id="header-settings-gray" src="assets/img/settings_icon.png" onclick="markSettingsIcon()">
            <img class="header-settings cursor-p d-none" id="header-settings-dark" src="assets/img/settings_icon_dark.png" onclick="markSettingsIcon()">
            <img class="header-settings cursor-p d-none" id="header-settings-white" src="assets/img/settings_icon_white.png" onclick="unmarkSettingsIcon()">`;
}


function renderHeaderIcons() {
    unmarkFavoritesIcon();
    unmarkSettingsIcon();
    muteMusic();
    unmuteSound();
}


// function renderHeaderIconsDarkmode() {
//     unmarkFavoritesIcon();
//     unmarkSettingsIcon();
//     unmuteSound();
//     muteMusic();
// }

// function unmarkAllHeaderIcons() {
//     unmarkFavoritesIcon();
//     unmarkSettingsIcon();
//     unmuteSound();
//     muteMusic();
// }


function markFavoritesIcon() {
    addClasslist(`header-favorites-gray`, `d-none`);
    addClasslist(`header-favorites-dark`,`d-none`);
    removeClasslist(`header-favorites-white`,`d-none`); 
    darkmodeOnOff();
    init();
}


function unmarkFavoritesIcon() {
    addClasslist(`header-favorites-white`,`d-none`);
    if(darkmode) removeClasslist(`header-favorites-dark`,`d-none`);
    else removeClasslist(`header-favorites-gray`, `d-none`);
}


function markSettingsIcon() {
    addClasslist(`header-settings-gray`,`d-none`);
    addClasslist(`header-settings-dark`, `d-none`);  
    removeClasslist(`header-settings-white`, `d-none`);
}


function unmarkSettingsIcon() {
    addClasslist(`header-settings-white`,`d-none`);
    if(darkmode) removeClasslist(`header-settings-dark`, `d-none`); 
    else removeClasslist(`header-settings-gray`,`d-none`);
}





async function loadPokemons() {

}

// function addToCurrentPokemonList(responseAsText) {
//     currentPokemonList = [];
//     for (let i = 0; i < responseAsText['results'].length; i++) {
//         currentPokemonList.push(responseAsText['results'][i]);
//     }
// }

async function preloadAllPokemons() {
    let allPokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1153`;
    let list = await fetch(allPokemonUrl)
    allPokemons = await list.json();
    localStorage.setItem(`allPokemons`, JSON.stringify(allPokemons));
} 


function searchPokemon() {
    let input = document.getElementById(`header-searchbar-input`).value;
    searchResults = [];
    if(input)
        for (let i = 0; i < allPokemons['results'].length; i++)
            if(allPokemons['results'][i]['name'].includes(input.toLowerCase())) 
                searchResults.push(i);
    else searchResults = [];
}


function muteMusic() {
    addClasslist(`header-music-mute`, `d-none`);
    if(darkmode) removeClasslist(`header-music-dark`, `d-none`); 
    else removeClasslist(`header-music-gray`, `d-none`); 
    bgMusic.pause();
    bgSound = 0;
}


function unmuteMusic() {
    addClasslist(`header-music-gray`, `d-none`);
    addClasslist(`header-music-dark`, `d-none`);
    removeClasslist(`header-music-mute`, `d-none`);
    bgMusic.volume = 0.06;
    bgMusic.loop = true;
    bgMusic.play(); 
    bgSound = 1;
}


function muteSound() {
    addClasslist(`header-sound-gray`, `d-none`);
    addClasslist(`header-sound-dark`, `d-none`);
    removeClasslist(`header-sound-mute`, `d-none`);
    sound = 0;
    localStorage.setItem('sound', sound);
}


function unmuteSound() {
    addClasslist(`header-sound-mute`, `d-none`);
    if(darkmode) removeClasslist(`header-sound-dark`, `d-none`); 
    else removeClasslist(`header-sound-gray`, `d-none`);
    sound = 1;
    localStorage.setItem('sound', sound);
}






// HELP FUNCTIONS
function addClasslist(id, classe) {
    document.getElementById(id).classList.add(classe);
}


function removeClasslist(id, classe) {
    document.getElementById(id).classList.remove(classe);
}


async function getLocalStorage() {
    darkmode = JSON.parse(localStorage.getItem('darkmode')) || 0;
    sound = JSON.parse(localStorage.getItem('sound')) || 1;
    currentPageNumber = JSON.parse(localStorage.getItem('currentPageNumber')) || 0;
    pokemonsPerPage = JSON.parse(localStorage.getItem('pokemonsPerPage')) || 20;
    pokemonsPerPageMobile = JSON.parse(localStorage.getItem('pokemonsPerPageMobile')) || 10;
    currentPokemonList = await JSON.parse(localStorage.getItem(`currentPokemonList`)) || [];  
    allPokemons = await JSON.parse(localStorage.getItem(`allPokemons`)) || [];
    favPokemons = await JSON.parse(localStorage.getItem(`favPokemons`)) || [];
}


async function setLocalStorage() {
    localStorage.setItem('darkmode', darkmode);
    localStorage.setItem('sound', sound);
    localStorage.setItem('currentPageNumber', currentPageNumber);
    localStorage.setItem('pokemonsPerPage', pokemonsPerPage);
    localStorage.setItem('pokemonsPerPageMobile', pokemonsPerPageMobile);
}


