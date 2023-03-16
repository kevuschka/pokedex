function templateHeaderWrapper() {
    return `<div class="header-wrapper w-100 h-100 flex" id="header-wrapper"></div>`;
}


function templateHeaderTitle() {
    return `<a href="./index.html" class="header-title cursor-p">Pokedex</a>`;
}


function templateHeaderFunctionalityWrapper() {
    return `<div class="header-functionality-wrapper flex" id="header-functionality-wrapper"></div>`;
}


function templateHeaderMusicIcon() {
    return `<img class="header-music cursor-p" id="header-music-gray" src="assets/img/music_icon2.png" onclick="unmuteMusic()">
            <img class="header-music cursor-p" id="header-music-dark" src="assets/img/music_icon_dark2.png" onclick="unmuteMusic()">
            <img class="header-music cursor-p" id="header-music-mute" src="assets/img/music_icon_pause.png" onclick="muteMusic()">
            <img class="header-music cursor-p" id="header-music-mute-dark" src="assets/img/music_icon_pause_dark.png" onclick="muteMusic()">`;
}


function templateHeaderSearchbar() {
    return `<div class="header-searchbar flex" id="header-searchbar" onKeyUp="searchPokemon()">
                <input type="text" class="header-searchbar-input w-100 h-100" id="header-searchbar-input" placeholder="Search Pokemons">
            </div>`;
}


function templateHeaderFavorites() {
    return `<a href="./favorites.html" id="header-favorites-gray"><img class="header-favorites cursor-p" src="assets/img/outline_star_icon.png"></a>
            <a href="./favorites.html" id="header-favorites-dark"><img class="header-favorites cursor-p" src="assets/img/outline_star_icon_dark.png"></a>`;
}


function templateHeaderSettings() {
    return `<img class="header-settings cursor-p" id="header-settings-gray" src="assets/img/settings_icon.png" onclick="openSettingsPopup()">
            <img class="header-settings cursor-p" id="header-settings-dark" src="assets/img/settings_icon_dark.png" onclick="openSettingsPopup()">`;
}


function templatePokemonInfoABOUT() {
    return `
        <div class="pokemon-selected-info-about-wrapper w-100 flex column">
            <p class="pokemon-selected-info-about-description" id="pokemon-selected-info-about-description"></p>
            <div class="pokemon-selected-info-about-pokedex-data-wrapper flex column">
                <p class="subTitle">Pokédex Data</p>
                <div class="pokemon-selected-info-about-pokedex-data-container" id="pokemon-selected-info-about-pokedex-data-container"></div>
            </div>
            <div class="pokemon-selected-info-about-breeding-wrapper flex column">
                <p class="subTitle">Breeding</p>
                <div class="pokemon-selected-info-about-breeding-container" id="pokemon-selected-info-about-breeding-container"></div>
            </div>
        </div>`;
}


function templatePokemonInfoSTATS() {
    return `<div class="pokemon-selected-info-stats-wrapper flex column w-100">
                <div class="pokemon-selected-info-stats-values-container flex column w-100" id="pokemon-selected-info-stats-values-container"></div>
                <div class="pokemon-selected-info-type-defense-container flex column w-100" id="pokemon-selected-info-type-defense-container"></div>
            </div>`;
}


function templateBaseStatsRows(i, titlesArray) {
    return `<tr>
                <td class="table-titles">${titlesArray[i]}</td>
                <td class="stats-table-values">${currentPokemon['base_stats']['stats'][i]}</td>
                <td><div class="stats-bar-regular w-100 flex"><div class="stats-bar-valued" id="bar_${i}"></div></div></td>
            </tr>`;
}


function templateBaseStatsRowsTotal() {
    return `<tr>
                <td class="table-titles pad-0">Total</td>
                <td class="stats-table-values pad-0">${currentPokemon['base_stats']['total']}</td>
                <td class="pad-0"><div class="stats-bar-regular w-100 flex"><div class="stats-bar-valued" id="bar_6"></div></div></td>
            </tr>`;
}


function templatePokemonInfoStatsTypeDefense() {
    return `<p class="subTitle">Type Defense</p>
            <p class="subSubTitle">The effectiveness of each type on ${returnNameFormatted(currentPokemon['name']['en'])}.</p>
            <div id="pokemon-info-type-defense-damage-from-container"></div>
            <p class="subSubTitle">The effectiveness on each type from ${returnNameFormatted(currentPokemon['name']['en'])}.</p>
            <div id="pokemon-info-type-defense-damage-to-container"></div>`;
}


function returnPokemonTypeDefenseDamageTemplate(i) {
    return `<div class="pokemon-info-type-defense-damage-container flex column w-100">
                <div class="pokemon-defense-damage-first-row flex" id="pokemon-defense-damage-first-row-${i}"></div>
                <div class="pokemon-defense-damage-second-row flex" id="pokemon-defense-damage-second-row-${i}"></div>
            </div>`;
}


function templatePokemonInfoEvolutionContainer() {
    return `<div class="pokemon-selected-info-chain-container flex column w-100" id="pokemon-selected-info-chain-container">
                <p class="subTitle">Chain</p>
            </div>`;
}


function templatePokemonInfoEVOLUTION(i) {
    return `<div class="pokemon-selected-info-chain flex" id="pokemon-selected-info-chain-${i}">
                <div class="pokemon-selected-info-chain-pokemon flex column cursor-p" onclick="checkIfPokemonIsOnThisPage(${getRightArrayIndex(currentPokemon['evolution'][i]['id'])})">
                    <img class="pokemon-selected-info-chain-pokemon-image" src="${currentPokemon['evolution'][i]['image']}">
                    <p class="pokemon-selected-info-chain-pokemon-name">${currentPokemon['evolution'][i]['name']}</p>
                </div>
            </div>`;
}


function templatePokemonInfoEvolutionChain(i) {
    return `<div class="pokemon-selected-info-chain-arrow flex column">
                <img src="assets/img/evolution_arrow.png">
                <div class="pokemon-selected-info-chain-arrow-description flex" id="pokemon-selected-info-chain-arrow-description-${i}"></div>
            </div>
            <div class="pokemon-selected-info-chain-pokemon flex column cursor-p" onclick="checkIfPokemonIsOnThisPage(${getRightArrayIndex(currentPokemon['evolution'][i+1]['id'])})">
                <img class="pokemon-selected-info-chain-pokemon-image" src="${currentPokemon['evolution'][i+1]['image']}">
                <p class="pokemon-selected-info-chain-pokemon-name">${currentPokemon['evolution'][i+1]['name']}</p>
            </div>`;
}


function templatePokemonInfoEvolutionChainSingle(i) {
    return `<div class="pokemon-selected-info-chain-pokemon flex column">
                <img class="pokemon-selected-info-chain-pokemon-image" src="${currentPokemon['evolution'][i]['image']}">
                <p class="pokemon-selected-info-chain-pokemon-name">${currentPokemon['evolution'][i]['name']}</p>
            </div>`;
}


function templateAbilityDescriptionPopup() {
    return `<div class="ability-description-popup-full absolute flex d-none" id="ability-description-popup-full" onclick="closeAbilityDescription()">
                <div class="ability-description-popup flex" id="ability-description" onclick="doNotClose(event)"></div>
            </div>`;
}


function templatePokemonInfoLocationsContainer() {
    return `<div class="pokemon-selected-info-locations-container flex column w-100" id="pokemon-selected-info-locations-container"></div>`;
}


function templatePokemonInfoLocationsContainerTable() {
    return `<table class="about-table">
                <tbody>
                    <tr id="locataions-data-1"><td class="table-titles" title=" When caught with normal Pokeball.">Base Happiness</td>
                        <td title=" When caught with normal Pokeball.">${currentPokemon['base_happiness']} 
                        <span class="table-subtitles"> (max 255)</span></td></tr>
                    <tr id="locataions-data-2"><td class="table-titles" title=" The higher, the easier to catch.">Capture Rate</td>
                        <td title=" The higher, the easier to catch.">${currentPokemon['capture_rate']}
                        <span class="table-subtitles"> (max 255)</span></td></tr>
                    <tr id="locataions-data-3"><td class="table-titles pad-0" title="The Base Exp. gained for defeating this Pokemon.">Base Exp.</td>
                        <td class="pad-0" title="The Base Exp. gained for defeating this Pokemon.">${currentPokemon['base_exp']}</tr>
                </tbody>
            </table>`;
}

function templatePokemonInfoLocationsContainerTitle() {
    return `<p class="subTitle">Locations</p>`;
}


function templatePokemonInfoLocationsContainerData() {
    return `<div class="pokemon-selected-info-container flex column w-100" id="pokemon-selected-info-container"></div>`;
}


function templatePokemonInfoContainer() {
    return `<div class="pokemon-selected-info-container flex column w-100" id="pokemon-selected-info-container"></div>`;
}


function templateTabDataElement(i, tabData) {
    let tab = getCurrentTab();
    return `<div class="collapse-element-btn cursor-p flex w-100" onclick="collapseElement(${i}, '${tab}')" id="${tab}-collapse-element-btn-${i}">
                <p id="${tab}-collapse-element-btn-title-${i}">${tabData[i]['name']}</p>
                <img id="${tab}-element-arrow-${i}" src="assets/img/element_arrow.png">
            </div>
            <div class="collapse-element-content w-100" id="${tab}-collapse-element-content-${i}"></div>`;
}


function templateMoveTable(i) {
    return `<table class="w-100">
                <thead>
                    <tr>
                        <td class="table-titles">Game Version</td><td class="table-titles table-titles-short-method">Method</td><td class="table-titles table-titles-short">Lvl.</td>
                    </tr>
                </thead>
                <tbody class="collapse-table-content" id="collapse-table-content-${i}"></tbody>
            </table>`;
}


function templateLocationsTable(i) {
    return `<table class="w-100">
                <thead>
                    <tr>
                        <td class="table-titles">Game Version</td><td class="table-titles">Method</td>
                    </tr>
                </thead>
                <tbody class="collapse-table-content" id="collapse-table-content-${i}"></tbody>
            </table>`;
}


function templateLoadPopup() {
    return `<div class="loadPopup-full absolute flex d-none" id="loadPopup-full">
                <div class="loadPopup-container flex column smooth-trans" id="loadPopup-container">
                    <div class="loadPopup-logo-container relative">
                        <img class="loadPopup-image" src="assets/img/pokedex_logo.png" alt="pokemon-logo">
                        <div class="loadPopup-image-overlay absolute smooth-trans" id="loadPopup-image-overlay"></div>
                    </div>
                    <div class="loadPopup-subtitle-container flex smooth-trans d-none" id="loadPopup-subtitle-container">
                        <p>Loading...</p>
                        <img class="loading-circle smooth-trans" id="loading-circle" src="assets/img/loading1.png" alt="loading-circle">
                    </div>
                </div>
            </div>`;
}


function templateSettingsPopup() {
    return `<div class="settings-popup-full w-100 absolute flex d-none" onclick="closeSettingsPopup()" id="settings-popup-full">
                <div class="settings-popup flex column" id="settings-popup" onclick="doNotClose(event)"></div>    
            </div>`;
}


function templateSettingsPopupContent() {
    return `<div class="settings-numbers flex w-100">
                <p>Pokemons per Page</p>
                <div class="settings-numbers-selection flex">
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-10" onclick="selectSettingsPokemonNumberPerPage(10)">10</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-20" onclick="selectSettingsPokemonNumberPerPage(20)">20</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-30" onclick="selectSettingsPokemonNumberPerPage(30)">30</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-40" onclick="selectSettingsPokemonNumberPerPage(40)">40</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-50" onclick="selectSettingsPokemonNumberPerPage(50)">50</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-60" onclick="selectSettingsPokemonNumberPerPage(60)">60</p>
                </div>
            </div>
            <div class="settings-sound flex w-100" id="settings-sound"></div>
            <div class="settings-theme flex w-100" id="settings-theme"></div>`;
}


function templateSettingsPopupSound() {
    let content = document.getElementById('settings-sound');
    content.innerHTML = `
        <p>Sound</p>
        <div class="settings-sound-selection flex">
            <img src="assets/img/sound_icon.png" class="settings-sound-icon cursor-p" onclick="unmuteSound()" id="sound-icon">    
            <img src="assets/img/sound_icon_selected.png" class="settings-sound-icon cursor-d" id="sound-icon-selected">    
            <img src="assets/img/sound_icon_mute.png" class="settings-sound-icon cursor-p" onclick="muteSound()" id="sound-icon-mute">    
            <img src="assets/img/sound_icon_mute_selected.png" class="settings-sound-icon cursor-d" id="sound-icon-mute-selected">    
        </div>`;
}


function templateSettingsPopupTheme() {
    let content = document.getElementById('settings-theme');
    content.innerHTML = `
        <p>Theme</p>
        <div class="settings-theme-selection flex">
            <div class="settings-theme-dark cursor-p" onclick="selectSettingsTheme('dark')" id="settings-theme-dark"></div>
            <div class="settings-theme-light cursor-p" onclick="selectSettingsTheme('light')" id="settings-theme-light"></div>
        </div>`;
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
                <div class="pokemon-selected-header flex column w-100 h-100" id="pokemon-selected-header">
                    <div class="pokemon-selected-header-function-icons w-100 flex">
                        <img src="assets/img/back_arrow_white.png" class="pokemon-selected-header-arrow cursor-p" onclick="hideSelectedPokemonWrapper()"> 
                        <img src="assets/img/liked.png" class="pokemon-selected-header-like cursor-p" id="pokemon-selected-header-liked" onclick="addOrRemoveFromFavs()"> 
                        <img src="assets/img/unliked.png" class="pokemon-selected-header-like cursor-p" id="pokemon-selected-header-unliked" onclick="addOrRemoveFromFavs()">
                    </div>
                </div>
            </div>
            <img src="" class="pokemon-selected-image absolute" id="pokemon-selected-image">`;
}


function templatePokemonHeaderNameTypeStatus() {
    return `<div class="pokemon-selected-header-name-and-type w-100 flex column">
                <div class="pokemon-selected-header-name-container flex" id="pokemon-selected-header-name-container"></div>
                <div class="pokemon-selected-header-type-container flex" id="pokemon-selected-header-type-container"></div>
            </div>
            <div class="pokemon-selected-header-status flex" id="pokemon-selected-header-status"></div>`;
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


function noPokemonHere(content) {
    content.innerHTML = `<div class="empty-fav-sign-container w-100 h-100 flex align-center">
                            <a class="relative "href="./index.html">
                                <span class="no-pokemon-here">No Pokemon here.</span>
                                <span class="go-catch-pokemon absolute">Go, catch em all!</span>
                            </a>
                        </div>`;
}


function templatePokemonsListElement(i, pokemon) {
    return `<div class="pokemon-list-element-container relative cursor-p" id="pokemon-list-element-container-${i}" onclick="renderPokemon(${i});clickOnElement(${i})">
                <div class="pokemon-list-element flex column">
                    <div class="pokemon-list-element-id-container flex absolute"><p>#${returnPokemonId(pokemon['id'])}</p></div>
                    <div class="pokemon-list-element-name-container"><p>${pokemon['name']['en']}</p></div>
                    <div class="pokemon-list-element-type-container flex" id="pokemon-list-element-type-container-${i}"></div>
                    <img src="${pokemon['image']}" class="pokemon-list-element-image absolute" id="pokemon-list-element-image-${i}">
                </div>
            </div>`;
}


function templateFooter() {
    return ` <div class="footer-container flex w-100 h-100">
                <div>
                    <p>Icons by <a href="https://iconsdb.com" target="_blank">iconsbd.com</a></p>
                    <p>Design inspired by 
                        <a href="https://dribbble.com/shots/6545819-Pokedex-App" target="_blank">Saepul Nahwan</a> and 
                        <a href="https://dribbble.com/shots/11114892-Pok-dex-App" target="_blank">Flavio Farias</a></p>
                    <p>Pokemon information from the <a href="https://pokeapi.co" target="_blank">Pokeapi</a></p>
                </div>
                <div>
                    <a class="impressum-link" href="./impressum.html">Impressum</a>
                </div>
            </div>`;
}