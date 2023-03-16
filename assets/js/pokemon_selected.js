// TEMPLATE
function renderPokemonTemplate() {
    let content = document.getElementById(`pokemon-selected-wrapper`);
    content.innerHTML = templatePokemonWrapper();
    let wrapper = document.getElementById(`pokemon-selected`);
    wrapper.innerHTML += templatePokemonHeaderAndImage();
    let pokemonHeader = document.getElementById('pokemon-selected-header');
    pokemonHeader.innerHTML += templatePokemonHeaderNameTypeStatus()
    let overlay = document.getElementById(`pokemon-selected-overlay`)
    overlay.innerHTML += templatePokemonInfoWrapper();
    templatePokemonInfoTabs();
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
    if(window.innerWidth < 700) renderPokemonResp();
    addClasslist('pokemon-selected-wrapper', 'selected-wrapper-width');
}


function renderPokemonResp() {
    addClasslist('pokemon-list-wrapper', 'tranX-100-minus');
    addClasslist('pokemon-list-wrapper', 'd-none');
    addClasslist('header', 'd-none');
    addClasslist('footer', 'd-none');
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
        removeClasslist('pokemon-list-wrapper', 'd-none');
        removeClasslist('pokemon-list-wrapper', 'tranX-100-minus');
        removeClasslist('pokemon-selected-wrapper', 'selected-wrapper-width');
        document.getElementById(`pokemon-selected-wrapper`).style.minHeight = `0`;
        hideSelectedPokemonWrapperResp();
    }, 260);
    if(lastSelected) unmarkLastSelectedPokemon();
    resetCurrentPokemonValues();
}


function resetCurrentPokemonValues() {
    currentPokemon = '';
    lastSelected = false;
    sideWrapperIsOpen = false;
}


function hideSelectedPokemonWrapperResp() {
    removeClasslist('header', 'd-none');
    removeClasslist('footer', 'd-none');
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
