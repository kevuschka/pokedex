////////////////////  E V O L U T I O N   T A B  ////////////////////


////////////////////  M O V E S   &   L O C A T I O N S   T A B  ////////////////////

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
                        <td class="table-titles">Game Version</td><td class="table-titles">Method</td><td class="table-titles table-titles-short">Lvl.</td>
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