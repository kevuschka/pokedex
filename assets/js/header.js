function renderHeader() {
    let header = document.getElementById(`header`);
    header.innerHTML = templateHeaderWrapper();
    let content = document.getElementById(`header-wrapper`);
    content.innerHTML = templateHeaderTitle();
    content.innerHTML += templateHeaderFunctionalityWrapper();
    let headerFunctionality = document.getElementById(`header-functionality-wrapper`);
    renderHeaderFunctionalityTemplates(headerFunctionality);
    renderHeaderColor();
    addClasslist(`header`, `tranY-0`);
}


function renderHeaderFunctionalityTemplates(content) {
    content.innerHTML = templateHeaderMusicIcon();
    content.innerHTML += templateHeaderSoundIcon();
    content.innerHTML += templateHeaderSearchbar();
    content.innerHTML += templateHeaderFavorites();
    content.innerHTML += templateHeaderSettings();
    renderHeaderIcons();
}


function renderHeaderColor() {
    if(darkmode) {
        removeClasslist('header', 'bg-normal');
        addClasslist('header', 'bg-darkmode');
    } else {
        removeClasslist('header', 'bg-darkmode');
        addClasslist('header', 'bg-normal');
    }
}


function templateHeaderWrapper() {
    return `<div class="header-wrapper w-100 h-100 flex" id="header-wrapper"></div>`;
}


function templateHeaderTitle() {
    return `<a class="header-title cursor-p" onclick="init()">Pokedex</a>`;
}


function templateHeaderFunctionalityWrapper() {
    return `<div class="header-functionality-wrapper flex" id="header-functionality-wrapper"></div>`;
}


function templateHeaderMusicIcon() {
    return `<img class="header-music cursor-p d-none" id="header-music-gray" src="assets/img/music_icon2.png" onclick="unmuteMusic()">
            <img class="header-music cursor-p d-none" id="header-music-dark" src="assets/img/music_icon_dark2.png" onclick="unmuteMusic()">
            <img class="header-music cursor-p d-none" id="header-music-mute" src="assets/img/music_icon_pause.png" onclick="muteMusic()">
            <img class="header-music cursor-p d-none" id="header-music-mute-dark" src="assets/img/music_icon_pause_dark.png" onclick="muteMusic()">`;
}


function templateHeaderSoundIcon() {
    return `<img class="header-sound cursor-p d-none" id="header-sound-gray" src="assets/img/sound_icon.png" onclick="muteSound()">
            <img class="header-sound cursor-p d-none" id="header-sound-dark" src="assets/img/sound_icon_dark.png" onclick="muteSound()"> 
            <img class="header-sound cursor-p d-none" id="header-sound-mute" src="assets/img/sound_icon_mute.png" onclick="unmuteSound()">`;
}


function templateHeaderSearchbar() {
    return `<form onsubmit="" class="header-searchbar flex" id="header-searchbar">
                <input type="text" class="header-searchbar-input w-100 h-100" id="header-searchbar-input" placeholder="Search Pokemons" onKeyUp="searchPokemon()">
                <input type="submit" style="display: none"/>
            </input></div>`;
}


function templateHeaderFavorites() {
    return `<img class="header-favorites cursor-p d-none" id="header-favorites-gray" src="assets/img/outline_star_icon.png" onclick="markFavoritesIcon()">
            <img class="header-favorites cursor-p d-none" id="header-favorites-dark" src="assets/img/outline_star_icon_dark.png" onclick="markFavoritesIcon()">`;
}


function templateHeaderSettings() {
    return `<img class="header-settings cursor-p d-none" id="header-settings-gray" src="assets/img/settings_icon.png" onclick="markSettingsIcon()">
            <img class="header-settings cursor-p d-none" id="header-settings-dark" src="assets/img/settings_icon_dark.png" onclick="markSettingsIcon()">`;
}


// RENDER HEADER ICONS 

function renderHeaderIcons() {
    renderFavoritesIcon();
    renderSettingsIcon();
    renderMusicIcon();
    // renderSoundIcon();
    
}


// FAVORITES
function renderFavoritesIcon() {
    cleanFavoritesIcon();
    if(window.location.pathname == 'favorites.html') renderFavoritesIconOnFavorites();
    else renderFavoritesIconStandard();
}

function cleanFavoritesIcon() {
    addClasslist(`header-favorites-gray`, `d-none`);
    addClasslist(`header-favorites-dark`,`d-none`);
}


function renderFavoritesIconOnFavorites() {
    if(darkmode) removeClasslist(`header-favorites-gray`,`d-none`);
    else removeClasslist(`header-favorites-dark`,`d-none`);
}


function renderFavoritesIconStandard() {
    if(darkmode) removeClasslist(`header-favorites-dark`,`d-none`);
    else removeClasslist(`header-favorites-gray`,`d-none`);
}


// SETTINGS
function renderSettingsIcon() {
    cleanSettingsIcon();
    if(darkmode) removeClasslist(`header-settings-dark`, `d-none`);
    else removeClasslist(`header-settings-gray`, `d-none`);
}

function cleanSettingsIcon() {
    addClasslist(`header-settings-gray`,`d-none`);
    addClasslist(`header-settings-dark`, `d-none`); 
}


function markSettingsIcon() {
    cleanSettingsIcon();
    if(darkmode) removeClasslist(`header-settings-gray`, `d-none`);  
    else removeClasslist(`header-settings-dark`, `d-none`);  
}


function unmarkSettingsIcon() {
    cleanSettingsIcon();
    if(darkmode) removeClasslist(`header-settings-dark`, `d-none`); 
    else removeClasslist(`header-settings-gray`,`d-none`);
}


// MUSIC
function renderMusicIcon() {
    cleanMusicIcon();
    if(darkmode) removeClasslist('header-music-dark', 'd-none');
    else removeClasslist('header-music-gray', 'd-none');
}


function cleanMusicIcon() {
    addClasslist(`header-music-gray`, `d-none`); 
    addClasslist('header-music-dark', 'd-none');
    addClasslist(`header-music-mute`, `d-none`);
    addClasslist(`header-music-mute-dark`, `d-none`);
}


function unmuteMusic() {
    cleanMusicIcon();
    if(darkmode) removeClasslist(`header-music-mute-dark`, `d-none`);
    else removeClasslist(`header-music-mute`, `d-none`);
    bgMusic.volume = 0.06;
    bgMusic.loop = true;
    bgMusic.play(); 
    bgSound = 1;
}


function muteMusic() {
    cleanMusicIcon();
    if(darkmode) removeClasslist(`header-music-dark`, `d-none`);
    else removeClasslist(`header-music-gray`, `d-none`);
    bgMusic.pause();
    bgSound = 0;
}


// SOUND 
//function renderSoundIcon() {};
// function muteSound() {
//     addClasslist(`header-sound-gray`, `d-none`);
//     addClasslist(`header-sound-dark`, `d-none`);
//     removeClasslist(`header-sound-mute`, `d-none`);
//     sound = 0;
//     localStorage.setItem('sound', sound);
// }


// function unmuteSound() {
//     addClasslist(`header-sound-mute`, `d-none`);
//     if(darkmode) removeClasslist(`header-sound-dark`, `d-none`); 
//     else removeClasslist(`header-sound-gray`, `d-none`);
//     sound = 1;
//     localStorage.setItem('sound', sound);
// }




// SEARCHBAR & SEARCHING
function searchPokemon() {
    let input = document.getElementById(`header-searchbar-input`).value;
    searchResults = [];
    if(input)
        for (let i = 0; i < allPokemons['results'].length; i++)
            if(allPokemons['results'][i]['name'].includes(input.toLowerCase())) 
                searchResults.push(i);
    else searchResults = [];
}







// DARKMODE
function darkmodeOnOff() {
    if(darkmode) {
        darkmode = 0;
        renderHeaderColor();
        document.getElementById(`content-container`).style.backgroundColor = 'white';
        
        
    }
    else {
        darkmode = 1;
        renderHeaderColor();
        document.getElementById(`content-container`).style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
    localStorage.setItem('darkmode', darkmode);
}


