let pokemonName;
let pokemonImages = [];
let pokemonEvolutionImages = [];

async function renderPokemon(i) {
    document.getElementById(`pokemon-list`).style.paddingRight = `50%`;
    showSelectedPokemonWrapper();

    await loadPokemonInformation();
    renderPokemonTemplate(i);
    renderPokemonContent(i);
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
                    <div class="pokemon-selecte-header-pokemonNumber flex"><p>#${getPokemonId(i, allPokemonsPageElements[i]['id'])}</p></div>
                </div>
            </div>
            <img src="${getPokemonImage(i)}" class="pokemon-selected-image absolute">`;
}


function templatePokemonInfoWrapper() {
    return `<div class="pokemon-selected-info-wrapper flex column absolute">
                <div class="pokemon-selected-info-tab-wrapper" id="pokemon-selecte-info-tab-wrapper"></div>
                <div class="pokemon-selected-info-data-wrapper" id="pokemon-selected-info-data-wrapper"></div>
            </div>`;
}


// CONTENT
function renderPokemonContent(i) {
    renderPokemonTypes(i, `pokemon-selected-header-type-container`);
}


// SHOW & HIDE

function showSelectedPokemonWrapper() {
    document.getElementById(`pokemon-selected-wrapper`).style.width = `50%`;
    addClasslist(`pokemon-selected-wrapper`, `tranX-0`);
}