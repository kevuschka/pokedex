function renderPokemonInfoEvolutionTemplate() {
    let wrapper = document.getElementById('pokemon-selected-info-data-wrapper');
    wrapper.innerHTML = templatePokemonInfoEvolutionContainer();
    let content = document.getElementById('pokemon-selected-info-chain-container');
    let chains = currentPokemon['evolution'].length;
    let chain;
    if(chains > 1) renderPokemonInfoEvolutionChains(content, chains, chain);
    else if(chains == 1) {
        content.innerHTML += templatePokemonInfoEVOLUTION(0);
        chain = document.getElementById(`pokemon-selected-info-chain-${0}`);
        chain.innerHTML = templatePokemonInfoEvolutionChainSingle(0);
    }
}


function renderPokemonInfoEvolutionChains(content, chains, chain) {
    for (let i = 0; i < (chains-1); i++) {
        content.innerHTML += templatePokemonInfoEVOLUTION(i);
        chain = document.getElementById(`pokemon-selected-info-chain-${i}`);
        chain.innerHTML += templatePokemonInfoEvolutionChain(i);
        renderPokemonEvolutionArrowDescription(i);
    }
}


function renderPokemonEvolutionArrowDescription(i) {
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