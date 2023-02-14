let onMoveTab = false;


function selectMovesTab() {
    onMoveTab = true;
}


function selectLocationsTab() {
    onMoveTab = false;
}


function renderPokemonInfoTemplate(tabData) {
    let wrapper = document.getElementById('pokemon-selected-info-data-wrapper');
    if(!onMoveTab) renderPokemonInfoLocationsContainer(wrapper);
    else if(onMoveTab) wrapper.innerHTML = templatePokemonInfoContainer();
    let container = document.getElementById('pokemon-selected-info-container');
    renderContainer(container, tabData);
}


function renderPokemonInfoLocationsContainer(content) {
    content.innerHTML = templatePokemonInfoLocationsContainer();
    let tblContent = document.getElementById('pokemon-selected-info-locations-container');
    tblContent.innerHTML += templatePokemonInfoLocationsContainerTable();
    tblContent.innerHTML += templatePokemonInfoLocationsContainerTitle();
    tblContent.innerHTML += templatePokemonInfoLocationsContainerData();
}


function renderContainer(container, tabData) {
    container.innerHTML = '';
    if(!onMoveTab) areThereAnyLocations();
    for (let i = 0; i < tabData.length; i++) {
        container.innerHTML += `<div class="pokemon-selected-info w-100" id="pokemon-selected-info-${i}"></div>`;
        renderContent(i, tabData);
    }
}


function areThereAnyLocations() {
    if(currentPokemon['locations'].length == 0) {
        let container = document.getElementById('pokemon-selected-info-container');
        container.innerHTML += `<div class="no-locations-sign flex align-center w-100"><p>No locations available.</p></div>`;
    }
}


function renderContent(i, tabData) {
    let moveContent = document.getElementById(`pokemon-selected-info-${i}`);
    moveContent.innerHTML = templateTabDataElement(i, tabData);
}


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


function openElement(i, tab) {
    document.getElementById(`${tab}-collapse-element-btn-title-${i}`).style.color = `var(--${currentPokemon['background_color']})`;
    addClasslist(`${tab}-collapse-element-btn-${i}`, `bottom-no-radius`);
    getTableContent(i, tab);
    addClasslist(`${tab}-collapse-element-content-${i}`, `collapse-element-content-padding`);
    document.getElementById(`${tab}-element-arrow-${i}`).style.transform = 'rotate(180deg)';
}


function getTableContent(i, tab) {
    let tableStructure = document.getElementById(`${tab}-collapse-element-content-${i}`);
    if(onMoveTab) tableStructure.innerHTML = templateMoveTable(i);
    else tableStructure.innerHTML = templateLocationsTable(i);
    let tblBody = document.getElementById(`collapse-table-content-${i}`);
    renderTableContent(tblBody, i);
}


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


function getLocationsTableRow(i, j) {
    return `<tr>
                <td>${currentPokemon['locations'][i]['versions'][j]['name']}</td>
                <td>${currentPokemon['locations'][i]['versions'][j]['methods'][0]}</td>
            </tr>`; 
}


function getCurrentTab() {
    if(onMoveTab) return 'move';
    else return 'locations';
}


