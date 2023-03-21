let doubleDamageFrom = [];
let halfDamageFrom = [];
let noDamageFrom = [];

let doubleDamageTo = [];
let halfDamageTo = [];
let noDamageTo = [];

let damageFrom = [];
let damageTo = [];

/**
 * That function cleans all damage arrays for fetching and storing the damage data of a pokemon.
 */
function cleanDamageArrays() { 
    damageFrom = [];    
    damageTo = [];   
    doubleDamageFrom = [];
    halfDamageFrom = [];
    noDamageFrom = [];
    doubleDamageTo = [];
    halfDamageTo = [];
    noDamageTo = [];
}

/**
 * That function renders the type-damage-values from the pokeapi.
 * @param {JSON} pokemon - is a JSON data from a specific pokemon, fetched from the pokeapi.
 */
async function renderTypeDamageValues(pokemon) {
    for (let i = 0; i < pokemon['types'].length; i++) {
        let url = pokemon['types'][i]['type']['url'];
        let response = await fetch(url);
        let type = await response.json(); 
        getTypeDamageFromValues(type);
        getTypeDamageToValues(type);
    }
    checkTypeDamageValues(pokemon['types'].length);
}

/**
 * That function renders the damage-from (other pokemons) values.
 * @param {JSON} type - is a JSON type data from a specific pokemon, fetched from the pokeapi.
 */
function getTypeDamageFromValues(type) {
    if(type['damage_relations']['double_damage_from'].length > 0) 
        for (let j = 0; j < type['damage_relations']['double_damage_from'].length; j++) 
            doubleDamageFrom.push([type['damage_relations']['double_damage_from'][j]['name'], 2]);
    if(type['damage_relations']['half_damage_from'].length > 0) 
        for (let j = 0; j < type['damage_relations']['half_damage_from'].length; j++) 
            halfDamageFrom.push([type['damage_relations']['half_damage_from'][j]['name'], 0.5]);
    if(type['damage_relations']['no_damage_from'].length > 0) 
        for (let j = 0; j < type['damage_relations']['no_damage_from'].length; j++) 
            noDamageFrom.push([type['damage_relations']['no_damage_from'][j]['name'], 0]);
}

/**
 * That function renders the damage-to (other pokemons) values.
 * @param {JSON} type - is a JSON type data from a specific pokemon, fetched from the pokeapi.
 */
function getTypeDamageToValues(type) {
    if(type['damage_relations']['double_damage_to'].length > 0) 
        for (let j = 0; j < type['damage_relations']['double_damage_to'].length; j++) 
            doubleDamageTo.push([type['damage_relations']['double_damage_to'][j]['name'], 2]);
    if(type['damage_relations']['half_damage_to'].length > 0) 
        for (let j = 0; j < type['damage_relations']['half_damage_to'].length; j++) 
            halfDamageTo.push([type['damage_relations']['half_damage_to'][j]['name'], 0.5]);
    if(type['damage_relations']['no_damage_to'].length > 0) 
        for (let j = 0; j < type['damage_relations']['no_damage_to'].length; j++) 
            noDamageTo.push([type['damage_relations']['no_damage_to'][j]['name'], 0]);
}

/**
 * That function checks the number of types (of a pokemon) and renders if necessary the type-damage-values again.
 * @param {number} typesNumber - is the length number of types of a specific pokemon.
 */
function checkTypeDamageValues(typesNumber) {
    if(typesNumber > 1) {
        renderTypeDamageFromValues();
        renderTypeDamageToValues(); 
    } else copyDamageValues();
    renderDamageImages();
}

/**
 * That function renders the specific type-damage-values for the damage FROM other pokemons:
 *  double damage, half damage, no damage for damage-from
 */
function renderTypeDamageFromValues() {
    renderDoubleDamageFrom();
    renderHalfDamageFrom();
    renderNoDamageFrom();
}

/**
 * That function renders the specific type-damage-values for the damage TO other pokemons:
 *  double damage, half damage, no damage for damage-from
 */
function renderTypeDamageToValues() {
    renderDoubleDamageTo();
    renderHalfDamageTo();
    renderNoDamageTo();
}

////////////  D A M A G E   F R O M  ////////////
/**
 * That function renders the double-damage values for damage from other pokemons.
 */
function renderDoubleDamageFrom() {
    if(doubleDamageFrom.length > 0)
        for (let i = 0; i < doubleDamageFrom.length; i++) 
            if(isNotAlreadyAdded(doubleDamageFrom, i, damageFrom)) 
                if(isNotInOwnArray(doubleDamageFrom, i, damageFrom)) 
                    if(isNotInThatArray(doubleDamageFrom, i, halfDamageFrom, damageFrom))
                        if(isNotInThatArray(doubleDamageFrom, i, noDamageFrom, damageFrom)) 
                            damageFrom.push(doubleDamageFrom[i]);
}

/**
 * That function renders the half-damage values for damage from other pokemons.
 */
function renderHalfDamageFrom() {
    if(halfDamageFrom.length > 0)
        for (let i = 0; i < halfDamageFrom.length; i++) 
            if(isNotAlreadyAdded(halfDamageFrom, i, damageFrom)) 
                if(isNotInOwnArray(halfDamageFrom, i, damageFrom)) 
                    if(isNotInThatArray(halfDamageFrom, i, noDamageFrom, damageFrom)) 
                        damageFrom.push(halfDamageFrom[i]);
}

/**
 * That function renders the no-damage values for damage from other pokemons.
 */
function renderNoDamageFrom() {
    if(noDamageFrom.length > 0)
        for (let i = 0; i < noDamageFrom.length; i++) 
            if(isNotAlreadyAdded(noDamageFrom, i, damageFrom)) 
                damageFrom.push(noDamageFrom[i]);
}


////////////  D A M A G E   T O  ////////////
/**
 * That function renders the double-damage values for damage to other pokemons.
 */
function renderDoubleDamageTo() {
    if(doubleDamageTo.length > 0)
        for (let i = 0; i < doubleDamageTo.length; i++) 
            if(isNotAlreadyAdded(doubleDamageTo, i, damageTo)) 
                if(isNotInOwnArray(doubleDamageTo, i, damageTo)) 
                    if(isNotInThatArray(doubleDamageTo, i, halfDamageTo, damageTo))
                        if(isNotInThatArray(doubleDamageTo, i, noDamageTo, damageTo)) 
                            damageTo.push(doubleDamageTo[i]);
}

/**
 * That function renders the double-damage values for damage to other pokemons.
 */
function renderHalfDamageTo() {
    if(halfDamageTo.length > 0)
        for (let i = 0; i < halfDamageTo.length; i++) 
            if(isNotAlreadyAdded(halfDamageTo, i, damageTo)) 
                if(isNotInOwnArray(halfDamageTo, i, damageTo)) 
                    if(isNotInThatArray(halfDamageTo, i, noDamageTo, damageTo)) 
                        damageTo.push(halfDamageTo[i]);
}

/**
 * That function renders the double-damage values for damage to other pokemons.
 */
function renderNoDamageTo() {
    if(noDamageTo.length > 0)
        for (let i = 0; i < noDamageTo.length; i++) 
            if(isNotAlreadyAdded(noDamageTo, i, damageTo)) 
                damageTo.push(noDamageTo[i]);
}


//GENERAL
/**
 * That function checks if a safed damage-value is already rendered and stored or not.
 * @param {array} array - is the array where the damage-values are fetched and stored into.
 * @param {number} i - is the index number of a array where the damage-values are fetched and stored into.
 * @param {array} checkArray - is the final damage array, where all damage-values (depending on damageFrom and damageTo) will be rendered into.
 * @returns a boolean.
 */
function isNotAlreadyAdded(array, i, checkArray) {
    if(checkArray.length > 0)
        for (let j = 0; j < checkArray.length; j++)
            if(checkArray[j][0].includes(array[i][0]))
                return false;
    return true;
}

/**
 * That function checks if a safed damage-value is already rendered and stored or not, in the array 'array'.
 * @param {array} array - is the array where the damage-values are fetched and stored into.
 * @param {number} i - is the index number of a array where the damage-values are fetched and stored into.
 * @param {array} targetArray - is the final damage array, where all damage-values (depending on damageFrom and damageTo) will be rendered into.
 * @returns a boolean.
 */
function isNotInOwnArray(array, i, targetArray) {
    if(array.length > i+1) 
        for (let j = i+1; j < array.length; j++) 
            if(array[j][0].includes(array[i][0])) {
                if((array[i][1] == 0.5) && (array[j][1] == 0.5)) targetArray.push([array[i][0], 0.5]);
                else targetArray.push([array[i][0], array[j][1]*array[i][1]]);
                return false;
            }
    return true;
}

/**
 * That function checks if a safed damage-value-name from 'currentArray' is also rendered and stored in the 'targetArray'.
 * @param {*} currentArray - is the array where the damage-values are fetched and stored into.
 * @param {*} currentIndex - is the index number of a array where the damage-values are fetched and stored into.
 * @param {*} targetArray - is the array where to check for similar type-damage names
 * @param {*} resultArray - is the final damage array, where all damage-values (depending on damageFrom and damageTo) will be rendered into.
 * @returns - a boolean.
 */
function isNotInThatArray(currentArray, currentIndex, targetArray, resultArray) {
    if(targetArray.length > 0)
        for (let j = 0; j < targetArray.length; j++) 
            if(targetArray[j][0].includes(currentArray[currentIndex][0])) {
                resultArray.push([currentArray[currentIndex][0], targetArray[j][1]*currentArray[currentIndex][1]]);
                return false;
            }
    return true;
}

/**
 * Taht function copies all damage values to the final damage arrays, depending on damageFrom and damageTo.
 */
function  copyDamageValues() {
    copyDamageValuesFrom();
    copyDamageValuesTo();
}

/**
 * Taht function copies all type-damage-from (double, half, no) values to the final damage array damageFrom.
 */
function copyDamageValuesFrom() {
    if(doubleDamageFrom.length > 0)
        for (let i = 0; i < doubleDamageFrom.length; i++) 
            damageFrom.push(doubleDamageFrom[i]);
    if(halfDamageFrom.length > 0)
        for (let i = 0; i < halfDamageFrom.length; i++)
            damageFrom.push(halfDamageFrom[i]);
    if(noDamageFrom.length > 0)
        for (let i = 0; i < noDamageFrom.length; i++)
            damageFrom.push(noDamageFrom[i]);
}

/**
 * Taht function copies all type-damage-to (double, half, no) values to the final damage array damageTo.
 */
function copyDamageValuesTo() {
    if(doubleDamageTo.length > 0)
        for (let i = 0; i < doubleDamageTo.length; i++) 
            damageTo.push(doubleDamageTo[i]);
    if(halfDamageTo.length > 0)
        for (let i = 0; i < halfDamageTo.length; i++)
            damageTo.push(halfDamageTo[i]);
    if(noDamageTo.length > 0)
        for (let i = 0; i < noDamageTo.length; i++)
            damageTo.push(noDamageTo[i]);
}

/**
 * That function renders the type-damage images.
 */
function renderDamageImages() {
    for (let i = 0; i < damageTo.length; i++) 
        damageTo[i].push(`assets/img/${damageTo[i][0]}.png`);
    for (let j = 0; j < damageFrom.length; j++) 
        damageFrom[j].push(`assets/img/${damageFrom[j][0]}.png`);
}