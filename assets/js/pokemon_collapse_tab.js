let onMoveTab = false;

/**
 * That function sets the 'onMoveTab' variable to 'true', if the moves tab is rendered.
 */
function selectMovesTab() {
    onMoveTab = true;
}

/**
 * That function sets the 'onMoveTab' variable to 'false', if the locations tab is rendered.
 */
function selectLocationsTab() {
    onMoveTab = false;
}

/**
 * That function render the moves/locations tab section templates.
 * @param {JSON} tabData - is a json array with the stored moves/locations rendered before.
 */
function renderPokemonInfoTemplate(tabData) {
    let wrapper = document.getElementById('pokemon-selected-info-data-wrapper');
    if(!onMoveTab) renderPokemonInfoLocationsContainer(wrapper);
    else if(onMoveTab) wrapper.innerHTML = templatePokemonInfoContainer();
    let container = document.getElementById('pokemon-selected-info-container');
    renderContainer(container, tabData);
}

/**
 * That function renders the pokemon locations tab section templates.
 * @param {Element} content - is the div element where location-tab-section wrapper is rendered to.
 */
function renderPokemonInfoLocationsContainer(content) {
    content.innerHTML = templatePokemonInfoLocationsContainer();
    let tblContent = document.getElementById('pokemon-selected-info-locations-container');
    tblContent.innerHTML += templatePokemonInfoLocationsContainerTable();
    tblContent.innerHTML += templatePokemonInfoLocationsContainerTitle();
    tblContent.innerHTML += templatePokemonInfoLocationsContainerData();
}

/**
 * That function renders the specific tab section container, depending on moves or location selection
 * @param {Element} container - is the div element where the moves/locations data will be rendered in
 * @param {JSON} tabData - is a json array with the stored moves/locations rendered before.
 */
function renderContainer(container, tabData) {
    container.innerHTML = '';
    if(!onMoveTab) areThereAnyLocations(container);
    for (let i = 0; i < tabData.length; i++) {
        container.innerHTML += `<div class="pokemon-selected-info w-100" id="pokemon-selected-info-${i}"></div>`;
        renderContent(i, tabData);
    }
}

/**
 * That function checks if that pokemon has any locations stored, if not, a 'no location' sign will be rendered in.
 * @param {Element} container - is the div element where the moves/locations data will be rendered in
 */
function areThereAnyLocations(container) {
    if(currentPokemon['locations'].length == 0) {
        container.innerHTML += `<div class="no-locations-sign flex align-center w-100"><p>No locations available.</p></div>`;
    }
}

/**
 * That function renders the moves tab section content template.
 * @param {number} i - is a index number of the tabData json array.
 * @param {JSON} tabData - is a json array with the stored moves/locations rendered before.
 */
function renderContent(i, tabData) {
    let moveContent = document.getElementById(`pokemon-selected-info-${i}`);
    moveContent.innerHTML = templateTabDataElement(i, tabData);
}

/**
 * That function closes/collapses the moves/locations data list element.
 * @param {number} i - index 
 * @param {*} tab 
 */
function collapseElement(i, tab) {
    if(document.getElementById(`${tab}-collapse-element-content-${i}`).offsetHeight > 1) {
        removeClasslist(`${tab}-collapse-element-content-${i}`, `collapse-element-content-padding`);
        document.getElementById(`${tab}-collapse-element-content-${i}`).innerHTML = '';
        document.getElementById(`${tab}-element-arrow-${i}`).style.transform = 'unset';
        setTimeout(() => {
            removeClasslist(`${tab}-collapse-element-btn-${i}`, `bottom-no-radius`);
        }, 35); 
        document.getElementById(`${tab}-collapse-element-btn-title-${i}`).style.color = 'black';
    } else openElement(i, tab);
}

/**
 * That function opens the moves/locations data list element.
 * @param {number} i - is the index of a element in the moves/locations tab section list.
 * @param {string} tab - is the tab name, that is used: e.g. 'move' or 'location'.
 */
function openElement(i, tab) {
    document.getElementById(`${tab}-collapse-element-btn-title-${i}`).style.color = `var(--${currentPokemon['background_color']})`;
    addClasslist(`${tab}-collapse-element-btn-${i}`, `bottom-no-radius`);
    getTableContent(i, tab);
    addClasslist(`${tab}-collapse-element-content-${i}`, `collapse-element-content-padding`);
    document.getElementById(`${tab}-element-arrow-${i}`).style.transform = 'rotate(180deg)';
}

/**
 * That function renders the table templates and the table content, depending on moves/locations tab selection
 * @param {number} i - is the index of a element in the moves/locations tab section list.
 * @param {string} tab - is the tab name, that is used: e.g. 'move' or 'location'.
 */
function getTableContent(i, tab) {
    let tableStructure = document.getElementById(`${tab}-collapse-element-content-${i}`);
    if(onMoveTab) tableStructure.innerHTML = templateMoveTable(i);
    else tableStructure.innerHTML = templateLocationsTable(i);
    let tblBody = document.getElementById(`collapse-table-content-${i}`);
    renderTableContent(tblBody, i);
}

/**
 * That function renders the moves/locations tab section list-element table-description.
 * @param {Element} content - is the div element table body, where the table description gets rendered in.
 * @param {number} i - is the index of a element in the moves/locations tab section list.
 */
function renderTableContent(content, i) {
    if(onMoveTab) 
        for(let j = 0; j < currentPokemon['moves'][i]['versions'].length; j++) {
            content.innerHTML += `<tr>
                            <td>${currentPokemon['moves'][i]['versions'][j]['name']}</td>
                            <td>${currentPokemon['moves'][i]['versions'][j]['methods'][0]['method']}</td>
                            <td>${currentPokemon['moves'][i]['versions'][j]['methods'][0]['level']}</td>
                        </tr>`;
        }
    else for(let j = 0; j < currentPokemon['locations'][i]['versions'].length; j++)
            content.innerHTML += getLocationsTableRow(i, j);     
}

/**
 * That function return a template with the version data from a specific location.
 * @param {number} i - is the index of a element in the moves/locations tab section list.
 * @param {number} j - is the index of a pokemon version from a specific location.
 * @returns - a html snippet withe the location version name and the method, to get the pokemon.
 */
function getLocationsTableRow(i, j) {
    return `<tr>
                <td>${currentPokemon['locations'][i]['versions'][j]['name']}</td>
                <td>${currentPokemon['locations'][i]['versions'][j]['methods'][0]}</td>
            </tr>`; 
}

/**
 * That function returns the current active/selected tab between 'moves' and 'locations'.
 * @returns - a string of the current selected tab: moves or locations
 */
function getCurrentTab() {
    if(onMoveTab) return 'move';
    else return 'locations';
}