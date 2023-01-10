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


async function loadContent() {

}



async function preloadAllPokemons() {
    let allPokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1153`;
    let list = await fetch(allPokemonUrl)
    allPokemons = await list.json();
    localStorage.setItem(`allPokemons`, JSON.stringify(allPokemons));
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


