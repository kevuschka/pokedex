let defense = [
    'normal', 'fire', 'water', 'electric', 'grass', 
    'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]

/**
 * That function renders the pokemon base-stats tab section and templates.
 */
function renderPokemonInfoStatsTemplate() {
    let content = document.getElementById('pokemon-selected-info-data-wrapper');
    content.innerHTML = templatePokemonInfoSTATS();
    renderPokemonInfoStats();
    let typeDefense = document.getElementById('pokemon-selected-info-type-defense-container');
    typeDefense.innerHTML += templatePokemonInfoStatsTypeDefense();
    renderPokemonInfoStatsTypeDefenseData();
}

/**
 * That function renders the pokemon base-stats tab section templates and stats-bars.
 */
function renderPokemonInfoStats() {
    let baseStats = document.getElementById('pokemon-selected-info-stats-values-container');
    baseStats.innerHTML = '<table class="about-table w-100"><tbody id="base-stats-table"></tbody></table>';
    let tblBody = document.getElementById('base-stats-table');
    renderPokemonInfoBaseStatsBars(tblBody);
}

/**
 * That function renders the pokemon base-stats bar.
 * @param {Element} content - is the table body div element
 */
function renderPokemonInfoBaseStatsBars(content) {
    let titlesArray = ['HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];
    for (let i = 0; i < currentPokemon['base_stats']['stats'].length; i++) {
        content.innerHTML += templateBaseStatsRows(i, titlesArray);
        renderBars(i);
    }
    content.innerHTML += templateBaseStatsRowsTotal();
    renderBarTotal();
}

/**
 * That function renders the base-stats bar width and background-color.
 * @param {number} i - is the index number of a specific base-stat
 */
function renderBars(i) {
    document.getElementById(`bar_${i}`).style.width = `${(currentPokemon['base_stats']['stats'][i]/255)*100}%`;
    document.getElementById(`bar_${i}`).style.backgroundColor = `var(--${currentPokemon['background_color']})`;
}

/**
 * That function renders the TOTAL base-stats bar width and background-color.
 */
function renderBarTotal() {
    document.getElementById(`bar_6`).style.width = `${(currentPokemon['base_stats']['total']/1300)*100}%`;
    document.getElementById(`bar_6`).style.backgroundColor = `var(--${currentPokemon['background_color']})`;
}

/**
 * That function renders the type-defense in the base-stats tab section.
 */
function renderPokemonInfoStatsTypeDefenseData() {
    let damageFrom = document.getElementById('pokemon-info-type-defense-damage-from-container');
    damageFrom.innerHTML += returnPokemonTypeDefenseDamageTemplate(1);
    renderPokemonBaseStatsTypeDefenseIcons(1);
    let damageTo = document.getElementById('pokemon-info-type-defense-damage-to-container');
    damageTo.innerHTML += returnPokemonTypeDefenseDamageTemplate(2);
    renderPokemonBaseStatsTypeDefenseIcons(2);
    colorTypeDefenseDamageIcons();
}

/**
 * That function renders the type-defense icons in the base-stats tab section.
 * @param {number} i - is a number given to create specific div element id's.
 */
function renderPokemonBaseStatsTypeDefenseIcons(i) {
    let firstContent = document.getElementById(`pokemon-defense-damage-first-row-${i}`);
    let secondContent = document.getElementById(`pokemon-defense-damage-second-row-${i}`);
    for (let j = 0; j < 9; j++) 
        firstContent.innerHTML += templatePokemonInfoTypeDefenseDamageFirstRow(i, j);
    for (let j = 9; j < 18; j++) 
        secondContent.innerHTML += templatePokemonInfoTypeDefenseDamageSecondRow(i, j);
}

/**
 * That function renders the type-defense damage template for the damage effectivness from other pokemon.
 * @param {*} i - is a number given to create specific div element id's.
 * @param {*} j - is a number given to create specific div element id's, from 0 to 9
 * @returns the damage icons template for damage from other pokemon
 */
function templatePokemonInfoTypeDefenseDamageFirstRow(i, j) {
    return `
        <div class="damage-icon-container flex column">
            <img class="damage-icon" id="damage-icon-first-${i}-${j}" src="assets/img/${defense[j]}.png" title="${returnNameFormatted(defense[j])}">
            ${returnTypeDefenseDamageValues(defense[j], i)}
        </div>`;
}

/**
 * That function renders the type-defense damage template for the damage effectivness to other pokemon.
 * @param {*} i - is a number given to create specific div element id's.
 * @param {*} j - is a number given to create specific div element id's, from 0 to 9
 * @returns the damage icons template for damage to other pokemon
 */
function templatePokemonInfoTypeDefenseDamageSecondRow(i, j) {
    return `
        <div class="damage-icon-container flex column">
            <img class="damage-icon" id="damage-icon-second-${i}-${j}" src="assets/img/${defense[j]}.png" title="${returnNameFormatted(defense[j])}">
            ${returnTypeDefenseDamageValues(defense[j], i)}
        </div>`;
}

/**
 * That function renders the specific damage values into the type-defense damage templates.
 * @param {string} typeName - is the damage icon type name for hovering purposes
 * @param {number} k - is a number given to create specific div element id's. Here to specify to which row the damage values belong to.
 * @returns damage values, if available
 */
function returnTypeDefenseDamageValues(typeName, k) {
    if(k == 1) {
        if(damageTypeValueExist(currentPokemon['base_stats']['type_defense']['damage_from'], typeName)) 
            return returnDamageTypeValue(currentPokemon['base_stats']['type_defense']['damage_from'], typeName);
        else return `<div></div>`;
    } else {
        if(damageTypeValueExist(currentPokemon['base_stats']['type_defense']['damage_to'], typeName))
            return returnDamageTypeValue(currentPokemon['base_stats']['type_defense']['damage_to'], typeName);
            else return `<div></div>`;
    }
}

/**
 * That function checks if there are any damage-type-values available in the given array.
 * @param {array} checkArray - is a array with damage value stored
 * @param {string} checkName - is the damage icon type name for hovering purposes
 * @returns a boolean.
 */
function damageTypeValueExist(checkArray, checkName) {
    let includesIt = false;
    for (let i = 0; i < checkArray.length; i++)
        if(checkArray[i][0].includes(checkName))
            includesIt = true;
    return includesIt;
}

/**
 * That function checks and returns a damage-type-value.
 * @param {array} checkArray - is a array with damage value stored
 * @param {string} checkName - is the damage icon type name for hovering purposes
 * @returns a html snipper with the specific damage-type-value
 */
function returnDamageTypeValue(checkArray, checkName) {
    for (let i = 0; i < checkArray.length; i++) 
        if(checkArray[i][0].includes(checkName)) {
            if (checkArray[i][1] == 0.5) 
                return '<p class="damage-value-half">1/2</p>';
            else return `<p>${checkArray[i][1]}</p>`;
        }
}

/**
 * That function colors the damage-type-values.
 */
function colorTypeDefenseDamageIcons() {
    for (let j = 0; j < 9; j++) {
        addClasslist(`damage-icon-first-1-${j}`, `${defense[j]}`);
        addClasslist(`damage-icon-first-2-${j}`, `${defense[j]}`);
    }
    for (let j = 9; j < 18; j++) {
        addClasslist(`damage-icon-second-1-${j}`, `${defense[j]}`);
        addClasslist(`damage-icon-second-2-${j}`, `${defense[j]}`);
    }
}