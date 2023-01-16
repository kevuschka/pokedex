let darkmode;
let sound;
let bgSound = 0;
let currentPageIndex = 0;
let pokemonsPerPage;
let pokemonsPerPageMobile;
let pagePokemonsBasicData = []; 
let pagePokemonsElementData = [];
let allPokemonsBasicData = [];
let favPokemons = [];
const bgMusic = new Audio('assets/sounds/poke_theme_music.mp3');
const select = new Audio('assets/sounds/select_sound.mp3');
let searchResults = [];
let settingsOpen = 0;
let pokemonInfoOpen = 0;
let currentDate;
let count;
let lang = 'en';
// localStorage.setItem('name', JSON.stringify(name));
// let name = JSON.parse(localStorage.getItem(`name`)) || [];


async function init() {
    await includeHTML();
    await getLocalStorage();
    await setLocalStorage();
    await getPokemonsBasicInfo(getPokemonsPerPageNumber());
    await getPokemonsElementsInfo(getPokemonsPerPageNumber());
    await updateAllPokemonsBasicData()
    console.log('pokemon on page', pagePokemonsBasicData);
    renderHeader();
    await renderPokemonsPage(getPokemonsPerPageNumber());
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
    allPokemonsBasicData = await JSON.parse(localStorage.getItem(`allPokemonsBasicData`)) || []; 
    favPokemons = await JSON.parse(localStorage.getItem(`favPokemons`)) || [];
}


async function setLocalStorage() {
    localStorage.setItem('darkmode', darkmode);
    localStorage.setItem('sound', sound);
    localStorage.setItem('pokemonsPerPage', pokemonsPerPage);
    localStorage.setItem('pokemonsPerPageMobile', pokemonsPerPageMobile);
}


// PAGE Index & POKEMONS PER PAGE

function getPokemonsPerPageNumber() {
    if(window.innerWidth > 800) return pokemonsPerPage;
    else return pokemonsPerPageMobile;
}


// function getTargetPageIndex() {
//     if(window.innerWidth > 800) return (currentPageIndex + pokemonsPerPage);
//     else return (currentPageIndex + pokemonsPerPageMobile);
// }


// POKEMON LIST DATA
async function getPokemonsBasicInfo(targetPageNumber) {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=${currentPageIndex}&limit=${targetPageNumber}`;
    let response = await fetch(url);
    pagePokemonsBasicData = await response.json();
    localStorage.setItem('pagePokemonsBasicData', JSON.stringify(pagePokemonsBasicData));
}


async function getPokemonsElementsInfo(number) {
    pagePokemonsElementData = [];
    for (let i = 0; i < number; i++) {
        let url = pagePokemonsBasicData['results'][i]['url'];
        let resp = await fetch(url);
        pagePokemonsElementData.push(await resp.json());
    }
}  


// LATEST DATA
async function updateAllPokemonsBasicData() {
    if(allPokemonsBasicData.length == 0) {
        await getAllPokemonsBasicInfo();
        localStorage.setItem('currentDate', JSON.stringify(getDateAsArray()));
    } else {
        if(!dataIsFromLatestDate()) {
            localStorage.setItem('currentDate', JSON.stringify(currentDate));
            await getAllPokemonsBasicInfo();
        }
    }
}


async function getAllPokemonsBasicInfo() {
    count = pagePokemonsBasicData['count'];
    let allPokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`;
    let list = await fetch(allPokemonUrl);
    allPokemonsBasicData = await list.json();
    localStorage.setItem(`allPokemonsBasicData`, JSON.stringify(allPokemonsBasicData));
} 


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

async function renderPokemonsPage(elementsNumber) {
    let wrapper = document.getElementById(`pokemon-list-wrapper`);
    wrapper.innerHTML = templatePokemonList();
    let content = document.getElementById(`pokemon-list`);
    content.innerHTML = '';
    await renderPokemonsListContent(elementsNumber, content);
    renderPageColor();
}



function templatePokemonList() {
    return `<div class="pokemon-list flex w-100" id="pokemon-list"></div>`;
}


// ########## RENDER POKEMON LIST CONTENT ##########

async function renderPokemonsListContent(elementsNumber, content) {
    if(currentPage().includes('favorites.html')) {}
    else if(currentPage().includes('index.html')) {}
    let name;
    let id;
    for (let i = 0; i < elementsNumber; i++) {
        name = `${pagePokemonsBasicData['results'][i]['name'].charAt(0).toUpperCase()}` + `${pagePokemonsBasicData['results'][i]['name'].slice(1)}`;
        id = pagePokemonsElementData[i]['id'];
        content.innerHTML += templatePokemonsListElement(i, name, id);
        renderPokemonTypes(i, `pokemon-list-element-type-container-${i}`);
        let color = await getPokemonBackgroundColor(i);
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


function getPokemonName(name) {
    let nameArray = name.split('-');
    let betterArray = [];
    let finalName = '';
    for (let j = 0; j < nameArray.length; j++) {
        betterArray[j] = `${nameArray[j].charAt(0).toUpperCase()}` + `${nameArray[j].slice(1)}`;
        finalName += `${betterArray[j]}`;
        finalName += ' ';
    }
    return finalName;
}


function getPokemonId(i, id) {
    if((id.toString().length) < 5 ) {
        let rest = 4 - id.toString().length;
        let newId = '';
        for (let j = 0; j < rest; j++) {
            newId += '0';
        }
        return newId + id.toString();
    } else return id;
    
}


function getPokemonImage(i) {
    if (pagePokemonsElementData[i]['sprites']['other']['official-artwork']['front_default']) return `${pagePokemonsElementData[i]['sprites']['other']['official-artwork']['front_default']}`;
    else if (pagePokemonsElementData[i]['sprites']['other']['home']['front_default']) return `${pagePokemonsElementData[i]['sprites']['other']['home']['front_default']}`;
    else return `${pagePokemonsElementData[i]['sprites']['other']['dream_world']['front_default']}`;
}


function renderPokemonTypes(i, contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    let array = getPokemonTypes(i);
    for (let j = 0; j < array.length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type flex"><p>${array[j]}</p></div>`;
}


function getPokemonTypes(i) {
    let pokeType = [];
    for (let j = 0; j < pagePokemonsElementData[i]['types'].length; j++) {
        let typ = pagePokemonsElementData[i]['types'][j]['type']['name'];
        let typs = `${typ.charAt(0).toUpperCase()}` + `${typ.slice(1)}`;
        pokeType.push(typs);
    }
    return pokeType;
}


async function getPokemonBackgroundColor(i) {
    let url = pagePokemonsElementData[i]['species']['url'];
    let resp = await fetch(url);
    let response = await resp.json();
    let color = response['color']['name'];
    return color;
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


