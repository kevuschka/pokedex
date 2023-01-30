function renderPokemonInfoAboutTemplate() {
    let content = document.getElementById('pokemon-selected-info-data-wrapper');
    content.innerHTML = templatePokemonInfoABOUT();
    renderPokemonInfoAbout();
}


function templatePokemonInfoABOUT() {
    return `
        <div class="pokemon-selected-info-about-wrapper w-100 flex column">
            <p class="pokemon-selected-info-about-description" id="pokemon-selected-info-about-description"></p>
            <div class="pokemon-selected-info-about-pokedex-data-wrapper flex column">
                <p class="subTitle">Pokédex Data</p>
                <div class="pokemon-selected-info-about-pokedex-data-container" id="pokemon-selected-info-about-pokedex-data-container"></div>
            </div>
            <div class="pokemon-selected-info-about-breeding-wrapper flex column">
                <p class="subTitle">Breeding</p>
                <div class="pokemon-selected-info-about-breeding-container" id="pokemon-selected-info-about-breeding-container"></div>
            </div>
        </div>`;
}


function renderPokemonInfoAbout() {
    let descriptionContent = document.getElementById('pokemon-selected-info-about-description');
    descriptionContent.innerHTML = currentPokemon['description'];
    let pokedexDataContent = document.getElementById(`pokemon-selected-info-about-pokedex-data-container`);
    renderPokemonAboutPokedexData(pokedexDataContent);
    let breedingDataContent = document.getElementById(`pokemon-selected-info-about-breeding-container`);
    renderPokemonAboutBreedingData(breedingDataContent);
}

///////////////////////////////  R E N D E R   P O K E D E X - D A T A  

function renderPokemonAboutPokedexData(content) {
    content.innerHTML = '<table class="about-table w-100"><tbody id="pokedex-data-table"></tbody></table>';
    let tblBody = document.getElementById('pokedex-data-table');
    renderPokemonAboutPokedexSpeciesData(tblBody);
    tblBody.innerHTML += `<tr><td class="table-titles">Height</td><td><p>${currentPokemon['about']['height']['inch']} (${currentPokemon['about']['height']['meter']}m)</p></td></tr>`;
    tblBody.innerHTML += `<tr><td class="table-titles">Weight</td><td><p>${currentPokemon['about']['weight']['lbs']}lbs (${currentPokemon['about']['weight']['kg']}kg)</p></td></tr>`;
    renderPokemonAboutPokedexAbilitiesData(tblBody);
    renderPokemonAboutPokedexWeaknessesData(tblBody);
}


function renderPokemonAboutPokedexSpeciesData(content) {
    for (let i = 0; i < currentPokemon['about']['species'].length; i++) 
        content.innerHTML += `<tr><td class="table-titles">Species<td>${currentPokemon['about']['species'][i]}</td></tr>`;
}


function renderPokemonAboutPokedexAbilitiesData(content) {
    content.innerHTML += `<tr><td class="table-titles">Abilities</td><td class="flex gap-10" id="pokedex-data-abilities-tr"></td></tr>`;
    let tblRow = document.getElementById(`pokedex-data-abilities-tr`);
    for (let i = 0; i < currentPokemon['about']['abilities'].length; i++) 
        tblRow.innerHTML += `<p>${currentPokemon['about']['abilities'][i][0]}</p>`;
}


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


function doubleDamagesAvailable(array) {
    let number = 0;
    for (let i = 0; i < array.length; i++) 
        if(array[i][1] >= 2)
            number++;
    if(number > 0) return true;
    else return false;
}

///////////////////////////////  R E N D E R   B R E E D I N G  

function renderPokemonAboutBreedingData(content) {
    content.innerHTML += '<table class="about-table w-100"><tbody id="breeding-table"></tbody></table>';
    let tblBody = document.getElementById('breeding-table');
    renderPokemonAboutBreedingEggGroupsData(tblBody);
    renderPokemonAboutBreedingGrowthRateData(tblBody);
    renderPokemonAboutBreedingEggCycleData(tblBody);
    
}


function renderPokemonAboutBreedingEggGroupsData(content) {
    content.innerHTML += `<tr><td class="table-titles">Egg Groups</td><td class="flex gap-10" id="breeding-egg-groups-tr"></td></tr>`;
    let tblRow = document.getElementById('breeding-egg-groups-tr');
    for (let i = 0; i < currentPokemon['about']['egg_groups'].length; i++)
        tblRow.innerHTML += `<p>${currentPokemon['about']['egg_groups'][i]}</p>`;
} 


function renderPokemonAboutBreedingGrowthRateData(content) {
    content.innerHTML += '<tr><td class="table-titles">Growth Rate</td><td class="flex gap-10" id="breeding-growth-rate-tr"></td></tr>';
    let tblRow = document.getElementById('breeding-growth-rate-tr');
    for (let i = 0; i < currentPokemon['about']['growth_rate'].length; i++)
        tblRow.innerHTML += `<p>${currentPokemon['about']['growth_rate'][i]}</p>`;
}


function renderPokemonAboutBreedingEggCycleData(content) {
    content.innerHTML += '<tr><td class="table-titles pad-0">Egg Cycles</td><td class="flex gap-10 pad-0" id="breeding-egg-cycles-tr"></td></tr>';
    let tblRow = document.getElementById('breeding-egg-cycles-tr');
    tblRow.innerHTML = `<p>${currentPokemon['hatch_counter']} (${(currentPokemon['hatch_counter']+1) * 255} steps)</p>`;
}