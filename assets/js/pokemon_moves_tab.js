function renderPokemonInfoMovesTemplate() {
    let wrapper = document.getElementById('pokemon-selected-info-data-wrapper');
    wrapper.innerHTML = templatePokemonInfoMovesContainer();
    let container = document.getElementById('pokemon-selected-info-moves-container');
    renderMovesContainer(container);
}


function templatePokemonInfoMovesContainer() {
    return `<div class="pokemon-selected-info-moves-container flex column w-100" id="pokemon-selected-info-moves-container"></div>`;
}


function renderMovesContainer(container) {
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        container.innerHTML += `<div class="pokemon-selected-info-move w-100" id="pokemon-selected-info-move-${i}"></div>`;
        renderMoveContent(i);
    }
}


function renderMoveContent(i) {
    let moveContent = document.getElementById(`pokemon-selected-info-move-${i}`);
    moveContent.innerHTML = templateMoveBtn(i);
    // renderTableContent(i);
}


function templateMoveBtn(i) {
    return `<div class="move-element-btn cursor-p flex w-100" onclick="collapseMoveElement(${i})" id="move-element-btn-${i}">
                <p id="move-element-btn-title-${i}">${currentPokemon['moves'][i]['name']}</p>
                <img id="element-arrow-${i}" src="assets/img/element_arrow.png">
            </div>
            <div class="move-element-content w-100" id="move-element-content-${i}"></div>`;
}


function renderTableContent(i) {
    let tableStructure = document.getElementById(`move-element-content-${i}`);
    tableStructure.innerHTML = templateMoveTable(i);
    let tblBody = document.getElementById(`move-table-content-${i}`);
    for (let j = 0; j < currentPokemon['moves'][i]['versions'].length; j++) {
        tblBody.innerHTML += `<tr>
                        <td>${currentPokemon['moves'][i]['versions'][j]['name']}</td>
                        <td>${currentPokemon['moves'][i]['versions'][j]['methods'][0]['method']}</td>
                        <td>${currentPokemon['moves'][i]['versions'][j]['methods'][0]['level']}</td>
                    </tr>`;
    }
}


function templateMoveTable(i) {
    return `<table class="w-100">
                <tbody id="move-table-content-${i}">
                    <tr>
                        <td>Game Version</td><td>Method</td><td>Lvl.</td>
                    </tr>
                </tbody>
            </table>`;
}


function collapseMoveElement(i) {
    if(document.getElementById(`move-element-content-${i}`).offsetHeight > 1) {
        removeClasslist(`move-element-content-${i}`, `move-element-content-padding`);
        document.getElementById(`move-element-content-${i}`).innerHTML = '';
        document.getElementById(`element-arrow-${i}`).style.transform = 'unset';
        setTimeout(() => {
            removeClasslist(`move-element-btn-${i}`, `bottom-no-radius`);
        }, 35); 
        document.getElementById(`move-element-btn-title-${i}`).style.color = 'black';
    } else openMoveElement(i);
}


function openMoveElement(i) {
    document.getElementById(`move-element-btn-title-${i}`).style.color = `var(--${currentPokemon['background_color']})`;
    addClasslist(`move-element-btn-${i}`, `bottom-no-radius`);
    renderTableContent(i);
    addClasslist(`move-element-content-${i}`, `move-element-content-padding`);
    document.getElementById(`element-arrow-${i}`).style.transform = 'rotate(180deg)';
}