let darkmode = 0;
let sound = 1;
let bgSound = 0;
let currentPageNumber = 0;
let pokemonsPerPage = 20;
let pokemonsPerPageMobile = 20;
let allPokemonsPageBasic = []; 
let allPokemonsPageElements = [];
let allPokemonsBasic = [];
let favPokemons = [];
const bgMusic = new Audio('assets/sounds/poke_theme_music.mp3');
const select = new Audio('assets/sounds/select_sound.mp3');
let searchResults = [];

// localStorage.setItem('name', JSON.stringify(name));
// let name = JSON.parse(localStorage.getItem(`name`)) || [];


async function init() {
    await getLocalStorage();
    await setLocalStorage();
    let urlBasic;
    let targetPageNumber = getTargetPageNumber();
    let elementsPerPage = getPokemonsPerPageNumber();
    if(allPokemonsPageBasic.length == 0) await getPokemonsBasicInfo(urlBasic, targetPageNumber);
    if(allPokemonsPageElements.length == 0) await getPokemonsElementsInfo(elementsPerPage);
    if(allPokemonsBasic.length == 0) await getAllPokemonsBasicInfo();
    console.log('pokemon', allPokemonsPageBasic);
    renderHeader();
    await renderPokemonsPage(elementsPerPage);
}


function getTargetPageNumber() {
    if(window.innerWidth > 800) return currentPageNumber + pokemonsPerPage;
    else return currentPageNumber + pokemonsPerPageMobile;
}


function getPokemonsPerPageNumber() {
    if(window.innerWidth > 800) return pokemonsPerPage;
    else return pokemonsPerPageMobile;
}


async function getPokemonsBasicInfo(urlBasic, pageNumber) {
    urlBasic = `https://pokeapi.co/api/v2/pokemon/?offset=${currentPageNumber}0&limit=${pageNumber}`;
    let response = await fetch(urlBasic);
    allPokemonsPageBasic = await response.json();
    localStorage.setItem('allPokemonsPageBasic', JSON.stringify(allPokemonsPageBasic));
}


async function getPokemonsElementsInfo(number) {
    allPokemonsPageElements = [];
    for (let i = 0; i < number; i++) {
        let url = allPokemonsPageBasic['results'][i]['url'];
        let resp = await fetch(url);
        allPokemonsPageElements.push(await resp.json());
    }
}   


async function getAllPokemonsBasicInfo() {
    let allPokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1153`;
    let list = await fetch(allPokemonUrl)
    allPokemonsBasic = await list.json();
    localStorage.setItem(`allPokemonsBasic`, JSON.stringify(allPokemonsBasic));
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
    pokemonsPerPage = JSON.parse(localStorage.getItem('pokemonsPerPage')) || 40;
    pokemonsPerPageMobile = JSON.parse(localStorage.getItem('pokemonsPerPageMobile')) || 40;
    allPokemonsPageBasic = await JSON.parse(localStorage.getItem(`allPokemonsPageBasic`)) || [];  
    allPokemonsBasic = await JSON.parse(localStorage.getItem(`allPokemonsBasic`)) || [];
    favPokemons = await JSON.parse(localStorage.getItem(`favPokemons`)) || [];
}


async function setLocalStorage() {
    localStorage.setItem('darkmode', darkmode);
    localStorage.setItem('sound', sound);
    localStorage.setItem('currentPageNumber', currentPageNumber);
    localStorage.setItem('pokemonsPerPage', pokemonsPerPage);
    localStorage.setItem('pokemonsPerPageMobile', pokemonsPerPageMobile);
}


// ########## POKEMON ##########

async function renderPokemonsPage(elements) {
    let wrapper = document.getElementById(`pokemon-list-wrapper`);
    wrapper.innerHTML = templatePokemonList();
    let content = document.getElementById(`pokemon-list`);
    addTimeScreen();
    content.innerHTML = '';
    await renderPokemonsListContent(elements, content);
    renderPageColor();
}


function addTimeScreen() {
    
}

function templatePokemonList() {
    return `<div class="pokemon-list flex w-100" id="pokemon-list"></div>`;
}


// ########## RENDER POKEMON LIST CONTENT ##########

async function renderPokemonsListContent(elements, content) {
    let name;
    let id;
    for (let i = 0; i < elements; i++) {
        name = `${allPokemonsPageBasic['results'][i]['name'].charAt(0).toUpperCase()}` + `${allPokemonsPageBasic['results'][i]['name'].slice(1)}`;
        id = allPokemonsPageElements[i]['id'];
        content.innerHTML += templatePokemonsListElement(i, name, id);
        renderPokemonTypes(i);
        await renderPokemonBackgroundColor(i);
    }
}


function templatePokemonsListElement(i, name, id) {
    return `<div class="pokemon-list-element-container relative cursor-p" id="pokemon-list-element-container-${i}">
                <div class="pokemon-list-element flex column">
                    <div class="pokemon-list-element-id-container flex absolute"><p>#${getPokemonId(i, id)}</p></div>
                    <div class="pokemon-list-element-name-container"><p>${name}</p></div>
                    <div class="pokemon-list-element-type-container flex" id="pokemon-list-element-type-container-${i}"></div>
                    <img src="${getPokemonImage(i)}" class="pokemon-list-element-image absolute" id="pokemon-list-element-image-${i}">
                </div>
            </div>`;
}


function getPokemonId(i, id) {
    let rest = 4 - id.toString().length;
    let newId = '';
    for (let j = 0; j < rest; j++) {
        newId += '0';
    }
    return newId + id.toString();
}


function getPokemonImage(i) {
    if (allPokemonsPageElements[i]['sprites']['other']['official-artwork']['front_default']) return `${allPokemonsPageElements[i]['sprites']['other']['official-artwork']['front_default']}`;
    else if (allPokemonsPageElements[i]['sprites']['other']['home']['front_default']) return `${allPokemonsPageElements[i]['sprites']['other']['home']['front_default']}`;
    else return `${allPokemonsPageElements[i]['sprites']['other']['dream_world']['front_default']}`;
}


function renderPokemonTypes(i) {
    let content = document.getElementById(`pokemon-list-element-type-container-${i}`);
    let array = getPokemonTypes(i);
    for (let j = 0; j < array.length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type flex"><p>${array[j]}</p></div>`;
}


function getPokemonTypes(i) {
    let pokeType = [];
    for (let j = 0; j < allPokemonsPageElements[i]['types'].length; j++) {
        let typ = allPokemonsPageElements[i]['types'][j]['type']['name'];
        let typs = `${typ.charAt(0).toUpperCase()}` + `${typ.slice(1)}`;
        pokeType.push(typs);
    }
    return pokeType;
}


async function renderPokemonBackgroundColor(i) {
    let url = allPokemonsPageElements[i]['species']['url'];
    let resp = await fetch(url);
    let response = await resp.json();
    let color = response['color']['name'];
    addClasslist(`pokemon-list-element-container-${i}`, `${color}`);
    // document.getElementById(``).style.backgroundColor = linear-gradient(red, yellow);
}

function renderPageColor() {
    if(darkmode) document.getElementById(`content-container`).style.backgroundColor = 'rgba(0,0,0,0.5)';
    else document.getElementById('content-container').style.backgroundColor = 'white'; 
}


