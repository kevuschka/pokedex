/**
 * That function renders the pokemon-info-about-tab section
 */
function renderPokemonInfoAboutTemplate() {
    let content = document.getElementById('pokemon-selected-info-data-wrapper');
    content.innerHTML = templatePokemonInfoABOUT();
    renderPokemonInfoAbout();
}

/**
 * That function renders the description, pokedex data and the breeding in the about tab section.
 */
function renderPokemonInfoAbout() {
    let descriptionContent = document.getElementById('pokemon-selected-info-about-description');
    descriptionContent.innerHTML = currentPokemon['description'];
    let pokedexDataContent = document.getElementById(`pokemon-selected-info-about-pokedex-data-container`);
    renderPokemonAboutPokedexData(pokedexDataContent);
    let breedingDataContent = document.getElementById(`pokemon-selected-info-about-breeding-container`);
    renderPokemonAboutBreedingData(breedingDataContent);
}

///////////////////////////////  R E N D E R   P O K E D E X - D A T A  
/**
 * That function renders the pokemon species data, the ability data and the weakness (short) in the about tab section.
 * @param {Element} content - is the div element where the pokedex table data will be rendered in.
 */
function renderPokemonAboutPokedexData(content) {
    content.innerHTML = '<table class="about-table w-100"><tbody id="pokedex-data-table"></tbody></table>';
    let tblBody = document.getElementById('pokedex-data-table');
    renderPokemonAboutPokedexSpeciesData(tblBody);
    tblBody.innerHTML += `<tr><td class="table-titles">Height</td><td><p>${currentPokemon['about']['height']['inch']} (${currentPokemon['about']['height']['meter']}m)</p></td></tr>`;
    tblBody.innerHTML += `<tr><td class="table-titles">Weight</td><td><p>${currentPokemon['about']['weight']['lbs']}lbs (${currentPokemon['about']['weight']['kg']}kg)</p></td></tr>`;
    renderPokemonAboutPokedexAbilitiesData(tblBody);
    renderPokemonAboutPokedexWeaknessesData(tblBody);
}

/**
 * That function render the pokemon species data in the about tab section.
 * @param {Element} content - is the div element where the about table data will be rendered in.
 */
function renderPokemonAboutPokedexSpeciesData(content) {
    for (let i = 0; i < currentPokemon['about']['species'].length; i++) 
        content.innerHTML += `<tr><td class="table-titles">Species<td>${currentPokemon['about']['species'][i]}</td></tr>`;
}

/**
 * That function renders the pokemon ability data in the about tab section.
 * @param {Element} content - is the div element where the ability table data will be rendered in.
 */
function renderPokemonAboutPokedexAbilitiesData(content) {
    content.innerHTML += `<tr><td class="table-titles">Abilities</td><td class="flex gap-10" id="pokedex-data-abilities-tr"></td></tr>`;
    let tblRow = document.getElementById(`pokedex-data-abilities-tr`);
    for (let i = 0; i < currentPokemon['about']['abilities'].length; i++) 
        tblRow.innerHTML += `<p class="cursor-p" id="currentPokemon-ability-${i}" onclick="showAbilityDescription(${i})">${currentPokemon['about']['abilities'][i][0]}</p>`;
}

/**
 * That function renders the pokemon weakness data in the about tab section.
 * @param {Element} content - is the div element where the weakness table data will be rendered in.
 */
function renderPokemonAboutPokedexWeaknessesData(content) {
    content.innerHTML += `<tr><td class="table-titles pad-0">Weaknesses</td><td class="flex gap-10 pad-0" id="pokedex-data-weaknesses-tr"></td></tr>`;
    let tblRow = document.getElementById(`pokedex-data-weaknesses-tr`);
    let weaknesses = [];
    weaknesses = getWeaknessesAboutSection(currentPokemon['base_stats']['type_defense']['damage_from']);
    for (let i = 0; i < weaknesses.length; i++) {
        tblRow.innerHTML += `<img class="weakness-icons" id="weakness-icon-${i}" src="${weaknesses[i][2]}" alt="${weaknesses[i][0]}" title="${weaknesses[i][0]}">`;
        addClasslist(`weakness-icon-${i}`, `${weaknesses[i][0]}`);
    }
}

/**
 * That function gets the highest damage values from the array 'damageFrom' for the about tab section in weaknesses.
 * @param {array} original - is the damageFrom array
 * @returns - an array with the filtered highest damage values
 */
function getWeaknessesAboutSection(original) {
    let array = [];
    if(doubleDamagesAvailable(original)) {
        for (let i = 0; i < original.length; i++) 
            if(original[i][1] >= 2)
                array.push(original[i]);
    } else {
        for (let i = 0; i < original.length; i++) 
            if(original[i][1] >= 1)
                array.push(original[i]);
    }
    return array;
}

/**
 * That function check if there are values in the damageFrom array with double damage.
 * @param {array} array - is the damageFrom array
 * @returns - a boolean.
 */
function doubleDamagesAvailable(array) {
    let number = 0;
    for (let i = 0; i < array.length; i++) 
        if(array[i][1] >= 2)
            number++;
    if(number > 0) return true;
    else return false;
}

///////////////////////////////  R E N D E R   B R E E D I N G  
/**
 * That function renders the pokemon breeding data in the about tab section.
 * @param {Element} content - is the div element where the breeding table data will be rendered in.
 */
function renderPokemonAboutBreedingData(content) {
    content.innerHTML += '<table class="about-table w-100"><tbody id="breeding-table"></tbody></table>';
    let tblBody = document.getElementById('breeding-table');
    renderPokemonAboutBreedingEggGroupsData(tblBody);
    renderPokemonAboutBreedingGrowthRateData(tblBody);
    renderPokemonAboutBreedingEggCycleData(tblBody);
    
}

/**
 * That function renders the pokemon breeding egg group data in the about tab section.
 * @param {Element} content - is the div element where the breeding egg group table data will be rendered in.
 */
function renderPokemonAboutBreedingEggGroupsData(content) {
    content.innerHTML += `<tr><td class="table-titles">Egg Groups</td><td class="flex gap-10" id="breeding-egg-groups-tr"></td></tr>`;
    let tblRow = document.getElementById('breeding-egg-groups-tr');
    for (let i = 0; i < currentPokemon['about']['egg_groups'].length; i++)
        tblRow.innerHTML += `<p>${currentPokemon['about']['egg_groups'][i]}</p>`;
} 

/**
 * That function renders the pokemon breeding growth rate data in the about tab section.
 * @param {Element} content - is the div element where the breeding growth rate table data will be rendered in.
 */
function renderPokemonAboutBreedingGrowthRateData(content) {
    content.innerHTML += '<tr><td class="table-titles">Growth Rate</td><td class="flex gap-10" id="breeding-growth-rate-tr"></td></tr>';
    let tblRow = document.getElementById('breeding-growth-rate-tr');
    for (let i = 0; i < currentPokemon['about']['growth_rate'].length; i++)
        tblRow.innerHTML += `<p>${currentPokemon['about']['growth_rate'][i]}</p>`;
}

/**
 * That function renders the pokemon breeding egg cicle data in the about tab section.
 * @param {Element} content - is the div element where the breeding egg cicle table data will be rendered in.
 */
function renderPokemonAboutBreedingEggCycleData(content) {
    content.innerHTML += '<tr><td class="table-titles pad-0">Egg Cycles</td><td class="flex gap-10 pad-0" id="breeding-egg-cycles-tr"></td></tr>';
    let tblRow = document.getElementById('breeding-egg-cycles-tr');
    tblRow.innerHTML = `<p>${currentPokemon['hatch_counter']} (${(currentPokemon['hatch_counter']+1) * 255} steps)</p>`;
}

/**
 * That function shows on onclick a popup and renders the ability description in it.
 * @param {number} i - is the index of the ability from the current pokemon.
 */
function showAbilityDescription(i) {
    let description = currentPokemon['about']['abilities'][i][1];
    let content = document.getElementById('ability-description');
    content.innerHTML = `<p>${description}</p>`;
    removeClasslist('ability-description-popup-full', 'd-none');
}

/**
 * That function closes the ability description popup.
 */
function closeAbilityDescription() {
    addClasslist('ability-description-popup-full', 'd-none');
}