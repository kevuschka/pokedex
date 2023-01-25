// TEMPLATE
function renderPokemonTemplate() {
    let content = document.getElementById(`pokemon-selected-wrapper`);
    content.innerHTML = templatePokemonWrapper();
    let wrapper = document.getElementById(`pokemon-selected`);
    wrapper.innerHTML += templatePokemonHeaderAndImage();
    let overlay = document.getElementById(`pokemon-selected-overlay`)
    overlay.innerHTML += templatePokemonInfoWrapper();
    templatePokemonInfoTabs();
}


function templatePokemonWrapper() {
    return `<div class="pokemon-selected-container sticky w-100" id="pokemon-selected-container">
                <div class="pokemon-selected relative flex w-100 h-100" id="pokemon-selected">
                    <div class="pokemon-selected-overlay-wrapper absolute flex" id="pokemon-selected-overlay-wrapper">
                        <div class="pokemon-selected-overlay flex column w-100" id="pokemon-selected-overlay"></div>
                    </div>
                </div>
            </div>`;
}


function templatePokemonHeaderAndImage() {
    return `<div class="pokemon-selected-header-wrapper fixed" id="pokemon-selected-header-wrapper">
                <div class="pokemon-selected-header flex column w-100 h-100">
                    <div class="pokemon-selected-header-function-icons w-100 flex">
                        <img src="assets/img/back_arrow_white.png" class="pokemon-selected-header-arrow cursor-p" onclick="hideSelectedPokemonWrapper()"> 
                        <img src="assets/img/liked.png" class="pokemon-selected-header-like cursor-p d-none" id="pokemon-selected-header-liked"> 
                        <img src="assets/img/unliked.png" class="pokemon-selected-header-like cursor-p" id="pokemon-selected-header-unliked">
                    </div>
                    <div class="pokemon-selected-header-name-and-type flex column">
                        <div class="pokemon-selected-header-name-container flex" id="pokemon-selected-header-name-container"></div>
                        <div class="pokemon-selected-header-type-container flex" id="pokemon-selected-header-type-container"></div>
                    </div>
                    <div class="pokemon-selected-header-status flex"><p id="pokemon-selected-header-status"></p></div>
                </div>
            </div>
            <img src="" class="pokemon-selected-image absolute" id="pokemon-selected-image">`;
}


function templatePokemonInfoWrapper() {
    return `<div class="pokemon-selected-info-wrapper flex column">
                <div class="pokemon-selected-info-tab-wrapper w-100">
                    <div class="pokemon-selected-info-tab-container flex h-100" id="pokemon-selected-info-tab-container"></div>
                </div>
                <div class="pokemon-selected-info-data-wrapper" id="pokemon-selected-info-data-wrapper"></div>
            </div>`;
}


function templatePokemonInfoTabs() {
    let wrapper = document.getElementById(`pokemon-selected-info-tab-container`);
    wrapper.innerHTML = `<p class="pokemon-selected-info-tab flex cursor-p" id="tab_1" onclick="selectTab(1)">About</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab flex sp-tab cursor-p" id="tab_2" onclick="selectTab(2)">Base Stats</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab flex cursor-p" id="tab_3" onclick="selectTab(3)">Evolution</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab flex cursor-p" id="tab_4" onclick="selectTab(4)">Moves</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab flex cursor-p" id="tab_5" onclick="selectTab(5)">Locations</p>`;
}

function renderPokemonInfoAboutTemplate() {
    let content = document.getElementById('pokemon-selected-info-data-wrapper');
    content.innerHTML = templatePokemonInfoABOUT();
    renderPokemonInfoAbout();
}


function templatePokemonInfoABOUT() {
    return `
        <div class="pokemon-selected-info-about-wrapper w-100 flex column">
            <p class="pokemon-selected-info-about-description" id="pokemon-selected-info-about-description"></p>
            <div class="pokemon-selected-info-about-pokedex-data-wrapper flex column">
                <p class="title" id="title_1">Pokédex Data</p>
                <div class="pokemon-selected-info-about-pokedex-data-container flex">
                    <div class="pokemon-selected-info-about-pokedex-data-titles flex column">
                        <p>Species</p>
                        <p>Height</p>
                        <p>Weight</p>
                        <p>Abilities</p>
                        <p>Weaknesses</p>
                    </div>
                    <div class="pokemon-selected-info-about-pokedex-data-info flex column" id="pokemon-selected-info-about-pokedex-data-info"></div>
                </div>
            </div>
            <div class="pokemon-selected-info-about-breeding-wrapper flex column">
                <p class="title" id="title_2">Breeding</p>
                <div class="pokemon-selected-info-about-breeding-container flex">
                    <div class="pokemon-selected-info-about-breeding-titles flex column">
                        <p>Egg Groups</p>
                        <p>Growth Rate</p>
                    </div>
                    <div class="pokemon-selected-info-about-breeding-info flex column" id="pokemon-selected-info-about-breeding-info"></div>
                </div>
            </div>
        </div>`;
}


function renderPokemonInfoAbout() {
    let descriptionContent = document.getElementById('pokemon-selected-info-about-description');
    descriptionContent.innerHTML = currentPokemon[0]['description'];
    let pokedexDataContent = document.getElementById('pokemon-selected-info-about-pokedex-data-info');
    renderPokemonAboutPokedexData(pokedexDataContent);
    colorTitlesAbout();
}


function renderPokemonAboutPokedexData(content) {
    content.innerHTML = '';
    renderPokemonAboutPokedexSpeciesData(content);
    content.innerHTML += `<p>${currentPokemon[0]['about']['height']['inch']} (${currentPokemon[0]['about']['height']['meter']}m)</p>`;
    content.innerHTML += `<p>${currentPokemon[0]['about']['weight']['lbs']}lbs (${currentPokemon[0]['about']['weight']['kg']}kg)</p>`;
    renderPokemonAboutPokedexAbilitiesData(content);
    renderPokemonAboutPokedexWeaknessesData(content);
}


function renderPokemonAboutPokedexSpeciesData(content) {
    content.innerHTML += `<div class="pokemon-selected-info-about-pokedex-data-species flex" id="pokemon-selected-info-about-pokedex-data-species"></div>`;
    let speciesContent = document.getElementById('pokemon-selected-info-about-pokedex-data-species');
    for (let i = 0; i < currentPokemon[0]['about']['species'].length; i++) 
        speciesContent.innerHTML += currentPokemon[0]['about']['species'][i];
}


function renderPokemonAboutPokedexAbilitiesData(content) {
    content.innerHTML += `<div class="pokemon-selected-info-about-pokedex-data-abilities flex" id="pokemon-selected-info-about-pokedex-data-abilities"></div>`;
    let abilityContent = document.getElementById('pokemon-selected-info-about-pokedex-data-abilities');
    for (let i = 0; i < currentPokemon[0]['about']['abilities'].length; i++) 
        abilityContent.innerHTML += `<p>${currentPokemon[0]['about']['abilities'][i][0]}</p>`;
}


function renderPokemonAboutPokedexWeaknessesData(content) {
    content.innerHTML += `<div class="pokemon-selected-info-about-pokedex-data-weaknesses flex" id="pokemon-selected-info-about-pokedex-data-weaknesses"></div>`;
    let weaknessesContent = document.getElementById('pokemon-selected-info-about-pokedex-data-weaknesses');
    for (let i = 0; i < currentPokemon[0]['base_stats']['type_defense']['damage_from'].length; i++) 
        if(currentPokemon[0]['base_stats']['type_defense']['damage_from'][i][1] >= 2)
            weaknessesContent.innerHTML += `<img src="${currentPokemon[0]['base_stats']['type_defense']['damage_from'][i][2]}">`;
}

function templatePokemonInfoSTATS() {}

function templatePokemonInfoEVOLUTION() {

}

function templatePokemonInfoMOVES() {}
function templatePokemonInfoLOCATIONS() {}


function colorTitlesAbout() {
    document.getElementById('title_1').style.color = 'unset';
    document.getElementById('title_1').style.color = `var(--${currentPokemon[0][`background_color`]})`;
    document.getElementById('title_2').style.color = 'unset';
    document.getElementById('title_2').style.color = `var(--${currentPokemon[0][`background_color`]})`;
}

// CONTENT
async function renderPokemonContent() {
    let headerNameContainer = document.getElementById(`pokemon-selected-header-name-container`);
    headerNameContainer.innerHTML = `<p>${currentPokemon[0]['name']['name']}</p><p>#${returnPokemonId(currentPokemon[0]['id'])}</p>`;
    document.getElementById(`pokemon-selected-image`).src = `${currentPokemon[0]['image']}`;
    renderSelectedPokemonTypes(`pokemon-selected-header-type-container`);
    renderSelectedPokemonStatur(`pokemon-selected-header-status`);
    addBackgroundColor();
}


function renderSelectedPokemonTypes(contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    for (let j = 0; j < currentPokemon[0]['types'].length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type pokemon-selected-header-type flex"><p>${currentPokemon[0]['types'][j]}</p></div>`;
}


function renderSelectedPokemonStatur(contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    if(currentPokemon['is_baby']) content.innerHTML = 'Baby';
    else if(currentPokemon['is_legendary']) content.innerHTML = 'Legendary';
    else if(currentPokemon['is_mythical']) content.innerHTML = 'Mythical';
}


function addBackgroundColor() {
    document.getElementById(`pokemon-selected`).style.backgroundColor = `var(--${currentPokemon[0]['background_color']})`;
}


// SHOW & HIDE
function showSelectedPokemonWrapper(i) {
    setTimeout(() => {
        let height = document.getElementById(`pokemon-list-wrapper`).clientHeight;
        document.getElementById(`pokemon-selected-wrapper`).style.minHeight = `${height}px`;
    }, 100);
    if(window.innerWidth > 999) document.getElementById(`pokemon-selected-wrapper`).style.width = `60%`;
    else document.getElementById(`pokemon-selected-wrapper`).style.width = `100%`;
    showSelectedPokemonInfo();
}


function showSelectedPokemonInfo() {
    setTimeout(() => {
        addClasslist(`pokemon-selected`, `tranX-0`);
    }, 300); 
    setTimeout(() => {
        addClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
    }, 480);
    sideWrapperIsOpen = true;
}


function hideSelectedPokemonWrapper() {
    removeClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
    setTimeout(() => {
        removeClasslist(`pokemon-selected`, `tranX-0`);
    }, 130);
    setTimeout(() => {
        removeClasslist(`pokemon-selected-overlay-wrapper`, `pad-top-50`);
    document.getElementById(`pokemon-selected-wrapper`).style.width = `0`;
    document.getElementById(`pokemon-selected-wrapper`).style.height = `0`;
    }, 260);
    sideWrapperIsOpen = false;
    unmarkLastSelectedPokemon();
}


// UNMARK SELECTION
function unmarkLastSelectedPokemon() {
    if(selectedPokemonIndex != -1) document.getElementById(`pokemon-list-element-container-${selectedPokemonIndex}`).style = `none`;
}


function selectTab(i) {
    unselectAllTabs();
    removeClasslist(`tab_${i}`, `unselected-tab`);
    addClasslist(`tab_${i}`, `selected-tab`);
    document.getElementById(`tab_${i}`).style.borderBottom = `2px solid var(--${currentPokemon[0]['background_color']})`;
}


function unselectAllTabs() {
    for (let i = 1; i <= 5; i++) {
        removeClasslist(`tab_${i}`, `selected-tab`);
        addClasslist(`tab_${i}`, `unselected-tab`);
        document.getElementById(`tab_${i}`).style.borderBottom = `none`;
    }   
}