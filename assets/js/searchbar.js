/**
 * That function will be executed onKeyUp on the searchbar. 
 * It renders the search results depending on the input by the user.
 */
function searchPokemon() {
    if(sideWrapperIsOpen) hideSelectedPokemonWrapper();
    searching = true;
    searchResults = [];
    let input = document.getElementById('header-searchbar-input').value.toLowerCase();
    if(input.length > 0) renderSearchResults(input);
    else searching = false;
    renderPokemonsPage(0, pokemonsPerPage);
    if(searching == false) renderPageSiteBottomNav();
}

/**
 * That function searches the pokemon name in the 'allPokemonsBasicData' array and compare it to the input.
 * @param {string} input - is the input in the searchbar by the user.
 */
function renderSearchResults(input) {
    if(!onFavoritesPage) 
        for (let i = 0; i < allPokemonsBasicData.length; i++) {
            if(allPokemonsBasicData[i]['name']['en'].toLowerCase().includes(input.toLowerCase()) || 
                allPokemonsBasicData[i]['name']['de'].toLowerCase().includes(input.toLowerCase()))
                    searchResults.push(allPokemonsBasicData[i]);
        }
    else if(favPokemons.length > 0)
        for (let i = 0; i < favPokemons.length; i++) {
            if (favPokemons[i]['name']['en'].toLowerCase().includes(input.toLowerCase()) ||
                favPokemons[i]['name']['de'].toLowerCase().includes(input.toLowerCase()))
                    searchResults.push(favPokemons[i]);
        }
}