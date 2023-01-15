let pokemonName;
let pokemonImages = [];
let pokemonEvolutionImages = [];
let pokemonElementData = [];

let pokemonInfo = {
    'about': [
        {   'species' :  '',
            'height' : '',
            'weight' : '',
            'Abilities' : ''
        },{ 'Gendar' : '',
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
    'evolution': [

    ]
};

async function renderPokemon(i) {
    showSelectedPokemonWrapper();

    copyPokemonElementData(i);
    await loadPokemonInformation();
    renderPokemonTemplate(i);
    renderPokemonContent(i);
}




function copyPokemonElementData(i) {
    pokemonElementData = [];
    for (let j = 0; j < pagePokemonsElementData[i].length; j++) {
        pokemonElementData.push(pagePokemonsElementData[i][j]);
    }
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
    return `<div class="pokemon-selected relative flex column w-100 h-100" id="pokemon-selected"></div>`;
}


function templatePokemonHeaderAndImage(i) {
    return `<div class="pokemon-selected-header-wrapper" id="pokemon-selected-header-wrapper">
                <div class="pokemon-selected-header flex w-100 h-100">
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
    return `<div class="pokemon-selected-info-wrapper flex column absolute">
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

function showSelectedPokemonWrapper() {
    document.getElementById(`pokemon-list`).style.paddingRight = `50%`;
    document.getElementById(`pokemon-selected-wrapper`).style.width = `50%`;
    addClasslist(`pokemon-selected-wrapper`, `tranX-0`);
}