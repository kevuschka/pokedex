///////////////////////////////  P O K E M O N   T Y P E   D A M A G E  ///////////////////////////////

let doubleDamageFrom = [];
let halfDamageFrom = [];
let noDamageFrom = [];
let doubleDamageTo = [];
let halfDamageTo = [];
let noDamageTo = [];

let damageFrom = [];
let damageTo = [];


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


function checkTypeDamageValues(typesNumber) {
    if(typesNumber > 1) {
        renderTypeDamageFromValues();
        renderTypeDamageToValues(); 
    } else copyDamageValues();
    renderDamageImages();
}


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


function renderTypeDamageFromValues() {
    renderDoubleDamageFrom();
    renderHalfDamageFrom();
    renderNoDamageFrom();
}


function renderTypeDamageToValues() {
    renderDoubleDamageTo();
    renderHalfDamageTo();
    renderNoDamageTo();
}

////////////  D A M A G E   F R O M  ////////////
function renderDoubleDamageFrom() {
    if(doubleDamageFrom.length > 0)
        for (let i = 0; i < doubleDamageFrom.length; i++) 
            if(isNotAlreadyAdded(doubleDamageFrom, i, damageFrom)) 
                if(isNotInOwnArray(doubleDamageFrom, i, damageFrom)) 
                    if(isNotInThatArray(doubleDamageFrom, i, halfDamageFrom, damageFrom))
                        if(isNotInThatArray(doubleDamageFrom, i, noDamageFrom, damageFrom)) 
                            damageFrom.push(doubleDamageFrom[i]);
}


function renderHalfDamageFrom() {
    if(halfDamageFrom.length > 0)
        for (let i = 0; i < halfDamageFrom.length; i++) 
            if(isNotAlreadyAdded(halfDamageFrom, i, damageFrom)) 
                if(isNotInOwnArray(halfDamageFrom, i, damageFrom)) 
                    if(isNotInThatArray(halfDamageFrom, i, noDamageFrom, damageFrom)) 
                        damageFrom.push(halfDamageFrom[i]);
}


function renderNoDamageFrom() {
    if(noDamageFrom.length > 0)
        for (let i = 0; i < noDamageFrom.length; i++) 
            if(isNotAlreadyAdded(noDamageFrom, i, damageFrom)) 
                damageFrom.push(noDamageFrom[i]);
}


////////////  D A M A G E   T O  ////////////
function renderDoubleDamageTo() {
    if(doubleDamageTo.length > 0)
        for (let i = 0; i < doubleDamageTo.length; i++) 
            if(isNotAlreadyAdded(doubleDamageTo, i, damageTo)) 
                if(isNotInOwnArray(doubleDamageTo, i, damageTo)) 
                    if(isNotInThatArray(doubleDamageTo, i, halfDamageTo, damageTo))
                        if(isNotInThatArray(doubleDamageTo, i, noDamageTo, damageTo)) 
                            damageTo.push(doubleDamageTo[i]);
}


function renderHalfDamageTo() {
    if(halfDamageTo.length > 0)
        for (let i = 0; i < halfDamageTo.length; i++) 
            if(isNotAlreadyAdded(halfDamageTo, i, damageTo)) 
                if(isNotInOwnArray(halfDamageTo, i, damageTo)) 
                    if(isNotInThatArray(halfDamageTo, i, noDamageTo, damageTo)) 
                        damageTo.push(halfDamageTo[i]);
}


function renderNoDamageTo() {
    if(noDamageTo.length > 0)
        for (let i = 0; i < noDamageTo.length; i++) 
            if(isNotAlreadyAdded(noDamageTo, i, damageTo)) 
                damageTo.push(noDamageTo[i]);
}


//GENERAL
function isNotAlreadyAdded(array, i, checkArray) {
    if(checkArray.length > 0)
        for (let j = 0; j < checkArray.length; j++)
            if(checkArray[j][0].includes(array[i][0]))
                return false;
    return true;
}


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


function isNotInThatArray(currentArray, currentIndex, targetArray, resultArray) {
    if(targetArray.length > 0)
        for (let j = 0; j < targetArray.length; j++) 
            if(targetArray[j][0].includes(currentArray[currentIndex][0])) {
                resultArray.push([currentArray[currentIndex][0], targetArray[j][1]*currentArray[currentIndex][1]]);
                return false;
            }
    return true;
}


function  copyDamageValues() {
    if(doubleDamageFrom.length > 0)
        for (let i = 0; i < doubleDamageFrom.length; i++) 
            damageFrom.push(doubleDamageFrom[i]);
    if(halfDamageFrom.length > 0)
        for (let i = 0; i < halfDamageFrom.length; i++)
        damageFrom.push(halfDamageFrom[i]);
    if(noDamageFrom.length > 0)
        for (let i = 0; i < noDamageFrom.length; i++)
        damageFrom.push(noDamageFrom[i]);
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



function getDamageValues() {
    for (let i = 0; i < damageTo.length; i++) 
        pokemonData['base_stats']['type_defense']['damage_to'].push(damageTo[i]);
    for (let j = 0; j < damageFrom.length; j++) 
        pokemonData['base_stats']['type_defense']['damage_from'].push(damageFrom[j]);
}


function renderDamageImages() {
    for (let i = 0; i < damageTo.length; i++) 
        damageTo[i].push(`assets/img/${damageTo[i][0]}.png`);
    for (let j = 0; j < damageFrom.length; j++) 
        damageFrom[j].push(`assets/img/${damageFrom[j][0]}.png`);
}