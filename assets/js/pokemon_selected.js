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
                        <img src="assets/img/liked.png" class="pokemon-selected-header-like cursor-p" id="pokemon-selected-header-liked" onclick="addOrRemoveFromFavs()"> 
                        <img src="assets/img/unliked.png" class="pokemon-selected-header-like cursor-p" id="pokemon-selected-header-unliked" onclick="addOrRemoveFromFavs()">
                    </div>
                    <div class="pokemon-selected-header-name-and-type w-100 flex column">
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
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab c-white flex bs-tab cursor-p" id="tab_2" onclick="selectTab(2)">Base Stats</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab c-white flex cursor-p" id="tab_3" onclick="selectTab(3)">Evolution</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab c-white flex cursor-p" id="tab_4" onclick="selectTab(4)">Moves</p>`;
    wrapper.innerHTML += `<p class="pokemon-selected-info-tab c-white flex cursor-p" id="tab_5" onclick="selectTab(5)">Locations</p>`;
}


function loadStarIconIfPokemonInFavs() {
    if(currentPokemonIsInFavs()) {
        addClasslist('pokemon-selected-header-unliked', 'd-none');
        removeClasslist('pokemon-selected-header-liked', 'd-none');
    } else {
        addClasslist('pokemon-selected-header-liked', 'd-none');
        removeClasslist('pokemon-selected-header-unliked', 'd-none');
    }
}


function currentPokemonIsInFavs() {
    if(favPokemons.length > 0)
        for (let i = 0; i < favPokemons.length; i++)
            if(favPokemons[i]['name']['en'].includes(currentPokemon['name']['en']))
                return true;
    else false;
}


// CONTENT
async function renderPokemonContent() {
    let headerNameContainer = document.getElementById(`pokemon-selected-header-name-container`);
    headerNameContainer.innerHTML = `<p>${currentPokemon['name']['en']}</p><p>#${returnPokemonId(currentPokemon['id'])}</p>`;
    document.getElementById(`pokemon-selected-image`).src = `${currentPokemon['image']}`;
    renderSelectedPokemonTypes(`pokemon-selected-header-type-container`);
    renderSelectedPokemonStatus(`pokemon-selected-header-status`);
    addBackgroundColor();
}


function renderSelectedPokemonTypes(contentId) {
    let content = document.getElementById(contentId);
    content.innerHTML = '';
    for (let j = 0; j < currentPokemon['types'].length; j++) 
        content.innerHTML += `<div class="pokemon-list-element-type pokemon-selected-header-type flex"><p>${currentPokemon['types'][j]}</p></div>`;
}


function renderSelectedPokemonStatus(contentId) {
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
function showSelectedPokemonWrapper() {
    setTimeout(() => {
        let height = document.getElementById(`pokemon-list-wrapper`).clientHeight;
        document.getElementById(`pokemon-selected-wrapper`).style.minHeight = `${height}px`;
    }, 135);
    addClasslist('pokemon-selected-wrapper', 'selected-wrapper-width');
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
        removeClasslist('pokemon-selected-wrapper', 'selected-wrapper-width');
        document.getElementById(`pokemon-selected-wrapper`).style.minHeight = `0`;
    }, 260);
    if(lastSelected) unmarkLastSelectedPokemon();
    currentPokemon = '';
    lastSelected = false;
    sideWrapperIsOpen = false;
}


// UNMARK SELECTION
function unmarkLastSelectedPokemon() {
    if(!(onFavoritesPage && (favPokemons.length == 0))) 
        if(selectedPokemonIndex != -1) document.getElementById(`pokemon-list-element-container-${selectedPokemonIndex}`).style.border = `unset`;
}


function selectTab(i) {
    unselectAllTabs();
    removeClasslist(`tab_${i}`, `unselected-tab`);
    addClasslist(`tab_${i}`, `selected-tab`);
    document.getElementById(`tab_${i}`).style.borderBottomColor = `var(--${currentPokemon['background_color']})`;
    selectPokemonTab(i);
}


function unselectAllTabs() {
    for (let i = 1; i <= 5; i++) {
        removeClasslist(`tab_${i}`, `selected-tab`);
        addClasslist(`tab_${i}`, `unselected-tab`);
        document.getElementById(`tab_${i}`).style.borderBottomColor = `transparent`;
    }   
}


function selectPokemonTab(i) {
    if(i == 1) renderPokemonInfoAboutTemplate();
    else if(i == 2) renderPokemonInfoStatsTemplate();
    else if(i == 3) renderPokemonInfoEvolutionTemplate();
    else if(i == 4) renderPokemonInfoTemplate(currentPokemon['moves'], selectMovesTab());
    else renderPokemonInfoTemplate(currentPokemon['locations'], selectLocationsTab());
    coloringSubtitles();
}


function coloringSubtitles() {
    document.querySelectorAll('.subTitle').forEach(el => el.style.color = 'unset');
    document.querySelectorAll('.subTitle').forEach(el => el.style.color = `var(--${currentPokemon[`background_color`]})`);
}


function addOrRemoveFromFavs() {
    if(currentPokemonIsInFavs()) {
        for (let i = 0; i < favPokemons.length; i++)
            if(favPokemons[i]['name']['en'].includes(currentPokemon['name']['en'])) {
                favPokemons.splice(i, 1);
                localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
                loadStarIconIfPokemonInFavs();
                if(onFavoritesPage) renderPokemonsPage(0, 40);
            }
    } else {
        favPokemons.push(currentPokemon);
        localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
        loadStarIconIfPokemonInFavs();
    }
}
