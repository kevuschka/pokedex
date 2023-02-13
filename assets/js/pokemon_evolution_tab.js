function renderPokemonInfoEvolutionTemplate() {
    let wrapper = document.getElementById('pokemon-selected-info-data-wrapper');
    wrapper.innerHTML = templatePokemonInfoEvolutionContainer();
    let content = document.getElementById('pokemon-selected-info-chain-container');
    let chains = currentPokemon['evolution'].length;
    let chain;
    if(chains > 1) renderPokemonInfoEvolutionChains(content, chains, chain);
    else if(chains == 1) {
        content.innerHTML += templatePokemonInfoEVOLUTION(i);
        chain = document.getElementById(`pokemon-selected-info-chain-${i}`);
        chain.innerHTML = templatePokemonInfoEvolutionChainSingle(i);
    }
}

function templatePokemonInfoEvolutionContainer() {
    return `<div class="pokemon-selected-info-chain-container flex column w-100" id="pokemon-selected-info-chain-container">
                <p class="subTitle">Chain</p>
            </div>`;
}

function renderPokemonInfoEvolutionChains(content, chains, chain) {
    for (let i = 0; i < (chains-1); i++) {
        content.innerHTML += templatePokemonInfoEVOLUTION(i);
        chain = document.getElementById(`pokemon-selected-info-chain-${i}`);
        chain.innerHTML += templatePokemonInfoEvolutionChain(i, chains);
        renderPokemonEvolutionArrowDescription(i, chains);
    }
}


function templatePokemonInfoEVOLUTION(i) {
    return `<div class="pokemon-selected-info-chain flex" id="pokemon-selected-info-chain-${i}">
                <div class="pokemon-selected-info-chain-pokemon flex column cursor-p" onclick="renderPokemon(${currentPokemon['evolution'][i]['id']}-1)">
                    <img class="pokemon-selected-info-chain-pokemon-image" src="${currentPokemon['evolution'][i]['image']}">
                    <p class="pokemon-selected-info-chain-pokemon-name">${currentPokemon['evolution'][i]['name']}</p>
                </div>
            </div>`;
}


function templatePokemonInfoEvolutionChain(i, chains) {
    return `<div class="pokemon-selected-info-chain-arrow flex column">
                <img src="assets/img/evolution_arrow.png">
                <div class="pokemon-selected-info-chain-arrow-description flex" id="pokemon-selected-info-chain-arrow-description-${i}"></div>
            </div>
            <div class="pokemon-selected-info-chain-pokemon flex column cursor-p" onclick="renderPokemon(${currentPokemon['evolution'][i+1]['id']}-1)">
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


function renderPokemonEvolutionArrowDescription(i, chains) {
    let arrowDescription = document.getElementById(`pokemon-selected-info-chain-arrow-description-${i}`);
    if(currentPokemon['evolution'][i+1]['details']['trigger'] == 'Level Up')
        arrowDescription.innerHTML = `<p>(${currentPokemon['evolution'][i+1]['details']['trigger']} ${returnLevelUp(i)})</p>`;
    else if(currentPokemon['evolution'][i+1]['details']['trigger'] == 'Use Item')
        arrowDescription.innerHTML = `<p>(${currentPokemon['evolution'][i+1]['details']['trigger']}${returnItem(i)})</p>`;
    else arrowDescription.innerHTML = `<p>(${currentPokemon['evolution'][i+1]['details']['trigger']})</p>`;
    
}


function returnLevelUp(i) {
    if(currentPokemon['evolution'][i+1]['details']['level'] != null)
        return `at lvl. ${currentPokemon['evolution'][i+1]['details']['level']}`;
    else return 'at: no info..';
}


function returnItem(i) {
    if(currentPokemon['evolution'][i+1]['details']['item'] != null)
        return `: ${currentPokemon['evolution'][i+1]['details']['item']}`;
    else return ': no info..';
}