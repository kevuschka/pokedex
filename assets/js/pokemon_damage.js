///////////////////////////////  P O K E M O N   T Y P E   D A M A G E  ///////////////////////////////

let doubleDamageFrom = [];
let halfDamageFrom = [];
let noDamageFrom = [];
let doubleDamageTo = [];
let halfDamageTo = [];
let noDamageTo = [];

let damageFrom = [];
let damageTo = [];


async function renderTypeDamageValues() {
    cleanDamageArrays();
    for (let i = 0; i < pokemonElementData['types'].length; i++) {
        let url = pokemonElementData['types'][i]['type']['url'];
        let resp = await fetch(url);
        let response = await resp.json();   
        getTypeDamageFromValues(response);
        getTypeDamageToValues(response);
    }
    if(i > 1) {
        renderTypeDamageFromValues();
        renderTypeDamageToValues(); 
    } else copyDamageValues();
}


function cleanDamageArrays() {
    damageFrom = [];    /////////////////////// HERE
    damageTo = [];      /////////////////////// HERE
    doubleDamageFrom = [];
    halfDamageFrom = [];
    noDamageFrom = [];
    doubleDamageTo = [];
    halfDamageTo = [];
    noDamageTo = [];
}


function getTypeDamageFromValues(response) {
    if(response['damage_relations']['double_damage_from'].length > 0) 
        for (let j = 0; j < response['damage_relations']['double_damage_from'].length; j++) 
            doubleDamageFrom.push([response['damage_relations']['double_damage_from'][j]['name'], 2]);
    if(response['damage_relations']['half_damage_from'].length > 0) 
        for (let j = 0; j < response['damage_relations']['half_damage_from'].length; j++) 
            halfDamageFrom.push([response['damage_relations']['half_damage_from'][j]['name'], 0.5]);
    if(response['damage_relations']['no_damage_from'].length > 0) 
        for (let j = 0; j < response['damage_relations']['no_damage_from'].length; j++) 
            noDamageFrom.push([response['damage_relations']['no_damage_from'][j]['name'], 0]);
}


function getTypeDamageToValues(response) {
    if(response['damage_relations']['double_damage_to'].length > 0) 
        for (let j = 0; j < response['damage_relations']['double_damage_to'].length; j++) 
            doubleDamageTo.push([response['damage_relations']['double_damage_to'][j]['name'], 2]);
    if(response['damage_relations']['half_damage_to'].length > 0) 
        for (let j = 0; j < response['damage_relations']['half_damage_to'].length; j++) 
            halfDamageTo.push([response['damage_relations']['half_damage_to'][j]['name'], 0.5]);
    if(response['damage_relations']['no_damage_to'].length > 0) 
        for (let j = 0; j < response['damage_relations']['no_damage_to'].length; j++) 
            noDamageTo.push([response['damage_relations']['no_damage_to'][j]['name'], 0]);
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
            if(isNotAlreadyAdded(doubleDamageFrom, i)) 
                if(isNotInOwnArray(doubleDamageFrom, i)) 
                    if(isNotInThatArray(doubleDamageFrom, i, halfDamageFrom))
                        if(isNotInThatArray(doubleDamageFrom, i, noDamageFrom)) 
                            damageFrom.push(doubleDamageFrom[i]);
}


function renderHalfDamageFrom() {
    if(halfDamageFrom.length > 0)
        for (let i = 0; i < halfDamageFrom.length; i++) 
            if(isNotAlreadyAdded(halfDamageFrom, i)) 
                if(isNotInOwnArray(halfDamageFrom, i)) 
                    if(isNotInThatArray(halfDamageFrom, i, noDamageFrom)) 
                        damageFrom.push(halfDamageFrom[i]);
}


function renderNoDamageFrom() {
    if(noDamageFrom.length > 0)
        for (let i = 0; i < noDamageFrom.length; i++) 
            if(isNotAlreadyAdded(noDamageFrom, i)) 
                damageFrom.push(noDamageFrom[i]);
}


////////////  D A M A G E   T O  ////////////
function renderDoubleDamageTo() {
    if(doubleDamageTo.length > 0)
        for (let i = 0; i < doubleDamageTo.length; i++) 
            if(isNotAlreadyAdded(doubleDamageTo, i)) 
                if(isNotInOwnArray(doubleDamageTo, i)) 
                    if(isNotInThatArray(doubleDamageTo, i, halfDamageTo))
                        if(isNotInThatArray(doubleDamageTo, i, noDamageTo)) 
                            damageTo.push(doubleDamageTo[i]);
}


function renderHalfDamageTo() {
    if(halfDamageTo.length > 0)
        for (let i = 0; i < halfDamageTo.length; i++) 
            if(isNotAlreadyAdded(halfDamageTo, i)) 
                if(isNotInOwnArray(halfDamageTo, i)) 
                    if(isNotInThatArray(halfDamageTo, i, noDamageTo)) 
                        damageTo.push(halfDamageTo[i]);
}


function renderNoDamageTo() {
    if(noDamageTo.length > 0)
        for (let i = 0; i < noDamageTo.length; i++) 
            if(isNotAlreadyAdded(noDamageTo, i)) 
                damageTo.push(noDamageTo[i]);
}


//GENERAL
function isNotAlreadyAdded(array, i) {
    if(damageFrom.length > 0)
        for (let j = 0; j < damageFrom.length; j++)
            if(damageFrom[j][0].includes(array[i][0]))
                return false;
    return true;
}


function isNotInOwnArray(array, i) {
    if(array.length > i+1) 
        for (let j = i+1; j < array.length; j++) 
            if(array[j][0].includes(array[i][0])) {
                damageFrom.push([array[i][0], `${array[j][1]*array[i][1]}`]);
                return false;
            }
    return true;
}


function isNotInThatArray(currentArray, currentIndex, targetArray) {
    if(targetArray.length > 0)
        for (let j = 0; j < targetArray.length; j++) 
            if(targetArray[j][0].includes(currentArray[currentIndex][0])) {
                damageFrom.push([currentArray[currentIndex][0], `${targetArray[j][1]*currentArray[currentIndex][1]}`]);
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
