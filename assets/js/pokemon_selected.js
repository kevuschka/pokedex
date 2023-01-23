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
                    <div class="pokemon-selected-header-pokemonNumber flex"><p id="pokemon-selected-header-pokemonNumber"></p></div>
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


function templatePokemonInfoABOUT() {

}

function templatePokemonInfoBASESTATS() {}

function templatePokemonInfoEVOLUTION() {

}

function templatePokemonInfoMOVES() {}
function templatePokemonInfoLOCATIONS() {}


// CONTENT
async function renderPokemonContent() {
    let headerNameContainer = document.getElementById(`pokemon-selected-header-name-container`);
    headerNameContainer.innerHTML = `<p>${currentPokemon[0]['name']['name']}</p><p>#${returnPokemonId(currentPokemon[0]['id'])}</p>`;
    document.getElementById(`pokemon-selected-image`).src = `${currentPokemon[0]['image']}`;
    renderSelectedPokemonTypes(`pokemon-selected-header-type-container`);
    addBackgroundColor();
}


function renderSelectedPokemonTypes(contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    for (let j = 0; j < currentPokemon[0]['types'].length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type pokemon-selected-header-type flex"><p>${currentPokemon[0]['types'][j]}</p></div>`;
}


function addBackgroundColor() {
    document.getElementById(`pokemon-selected`).style.backgroundColor = `var(--${currentPokemon[0]['background_color']})`;
}


function loadPokemonContent() {
    

}

// SHOW & HIDE
function showSelectedPokemonWrapper(i) {
    setTimeout(() => {
        let height = document.getElementById(`pokemon-list-wrapper`).clientHeight;
        document.getElementById(`pokemon-selected-wrapper`).style.minHeight = `${height}px`;
    }, 100);
    document.getElementById(`pokemon-list-element-container-${i}`).style.border = `inset`;
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