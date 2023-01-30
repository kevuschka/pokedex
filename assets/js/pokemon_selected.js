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
                    <div class="pokemon-selected-header-status flex" id="pokemon-selected-header-status"></div>
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

///////////////////////////////  R E N D E R   A B O U T  ///////////////////////////////
// ...

function renderPokemonInfoStatsTemplate() {
    let content = document.getElementById('pokemon-selected-info-data-wrapper');
    content.innerHTML = templatePokemonInfoSTATS();
    renderPokemonInfoStats();
}


function templatePokemonInfoSTATS() {
    return `<div class="pokemon-selected-info-stats-wrapper flex column w-100">
                <div class="pokemon-selected-info-stats-values-container" id="pokemon-selected-info-stats-values-container"></div>
                <div class="pokemon-selected-info-type-defense-container flex column w-100">
                    <p class="subTitle">Type Defense</p>
                    <div class="pokemon-selected-info-type-defense-content flex column" id="pokemon-selected-info-type-defense-content"></div>
                </div>
            </div>`;
}


function renderPokemonInfoStats() {
    let baseStats = document.getElementById('pokemon-selected-info-stats-values-container');
    baseStats.innerHTML = '<table class="about-table w-100"><tbody id="base-stats-table"></tbody></table>';
    let tblBody = document.getElementById('base-stats-table');
    renderPokemonInfoBaseStatsBars(tblBody);
}


function renderPokemonInfoBaseStatsBars(content) {
    let titlesArray = ['HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];
    for (let i = 0; i < currentPokemon['base_stats']['stats'].length; i++) {
        content.innerHTML += templateBaseStatsRows(i, titlesArray);
        renderBars(i);
    }
    content.innerHTML += templateBaseStatsRowsTotal();
    renderBarTotal();
}


function templateBaseStatsRows(i, titlesArray) {
    return `<tr>
                <td class="table-titles">${titlesArray[i]}</td>
                <td class="stats-table-values">${currentPokemon['base_stats']['stats'][i]}</td>
                <td><div class="stats-bar-regular w-100 flex"><div class="stats-bar-valued" id="bar_${i}"></div></div></td>
            </tr>`;
}


function renderBars(i) {
    document.getElementById(`bar_${i}`).style.width = `${(currentPokemon['base_stats']['stats'][i]/255)*100}%`;
    document.getElementById(`bar_${i}`).style.backgroundColor = `var(--${currentPokemon['background_color']})`;
}


function templateBaseStatsRowsTotal() {
    return `<tr>
                <td class="table-titles pad-0">Total</td>
                <td class="stats-table-values pad-0">${currentPokemon['base_stats']['total']}</td>
                <td class="pad-0"><div class="stats-bar-regular w-100 flex"><div class="stats-bar-valued" id="bar_6"></div></div></td>
            </tr>`;
}


function renderBarTotal() {
    document.getElementById(`bar_6`).style.width = `${(currentPokemon['base_stats']['total']/1300)*100}%`;
    document.getElementById(`bar_6`).style.backgroundColor = `var(--${currentPokemon['background_color']})`;
}


////////////////////////////////////////////////////////
function templatePokemonInfoEVOLUTION() {

}

function templatePokemonInfoMOVES() {}
function templatePokemonInfoLOCATIONS() {}


function coloringSubtitles() {
    document.querySelectorAll('.subTitle').forEach(el => el.style.color = 'unset');
    document.querySelectorAll('.subTitle').forEach(el => el.style.color = `var(--${currentPokemon[`background_color`]})`);
}


// CONTENT
async function renderPokemonContent() {
    let headerNameContainer = document.getElementById(`pokemon-selected-header-name-container`);
    headerNameContainer.innerHTML = `<p>${currentPokemon['name']['name']}</p><p>#${returnPokemonId(currentPokemon['id'])}</p>`;
    document.getElementById(`pokemon-selected-image`).src = `${currentPokemon['image']}`;
    renderSelectedPokemonTypes(`pokemon-selected-header-type-container`);
    renderSelectedPokemonStatur(`pokemon-selected-header-status`);
    addBackgroundColor();
}


function renderSelectedPokemonTypes(contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    for (let j = 0; j < currentPokemon['types'].length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type pokemon-selected-header-type flex"><p>${currentPokemon['types'][j]}</p></div>`;
}


function renderSelectedPokemonStatur(contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    if(currentPokemon['is_baby']) content.innerHTML = '<p>Baby</p>';
    else if(currentPokemon['is_legendary']) content.innerHTML = '<p>Legendary</p>';
    else if(currentPokemon['is_mythical']) content.innerHTML = '<p>Mythical</p>';
}


function addBackgroundColor() {
    document.getElementById(`pokemon-selected`).style.backgroundColor = `var(--${currentPokemon['background_color']})`;
}


// SHOW & HIDE
function showSelectedPokemonWrapper(i) {
    setTimeout(() => {
        let height = document.getElementById(`pokemon-list-wrapper`).clientHeight;
        document.getElementById(`pokemon-selected-wrapper`).style.minHeight = `${height}px`;
    }, 130);
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
    document.getElementById(`pokemon-selected-wrapper`).style.width = `0`;
    document.getElementById(`pokemon-selected-wrapper`).style.minHeight = `0`;
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
    document.getElementById(`tab_${i}`).style.borderBottom = `2px solid var(--${currentPokemon['background_color']})`;
    selectPokemonTab(i);
}


function selectPokemonTab(i) {
    if(i == 1) renderPokemonInfoAboutTemplate();
    if(i == 2) renderPokemonInfoStatsTemplate();
    if(i == 3){}
    if(i == 4){}
    coloringSubtitles();
}

function unselectAllTabs() {
    for (let i = 1; i <= 5; i++) {
        removeClasslist(`tab_${i}`, `selected-tab`);
        addClasslist(`tab_${i}`, `unselected-tab`);
        document.getElementById(`tab_${i}`).style.borderBottom = `none`;
    }   
}