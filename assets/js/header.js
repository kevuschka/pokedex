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
    // renderHeaderStarIcon();
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
    removeAllHeaderAdditionClasses(); 
    if(darkmode) addClasslist('header', 'bg-darkmode');
    else addClasslist('header', 'bg-normal');
}


function removeAllHeaderAdditionClasses() {
    removeClasslist('header', 'bg-normal');
    removeClasslist('header', 'bg-darkmode');
}


// function renderHeaderStarIcon() {
//     if(onFavoritesPage) {
//         addClasslist('header-favorites-gray', 'd-none');
//         removeClasslist('header-favorites-dark', 'd-none');
//     } else {
//         addClasslist('header-favorites-dark', 'd-none');
//         removeClasslist('header-favorites-gray', 'd-none');
//     }
// }


function templateHeaderWrapper() {
    return `<div class="header-wrapper w-100 h-100 flex" id="header-wrapper"></div>`;
}


function templateHeaderTitle() {
    return `<a href="/index.html" class="header-title cursor-p">Pokedex</a>`;
}


function templateHeaderFunctionalityWrapper() {
    return `<div class="header-functionality-wrapper flex" id="header-functionality-wrapper"></div>`;
}


function templateHeaderMusicIcon() {
    return `<img class="header-music cursor-p" id="header-music-gray" src="assets/img/music_icon2.png" onclick="unmuteMusic()">
            <img class="header-music cursor-p" id="header-music-dark" src="assets/img/music_icon_dark2.png" onclick="unmuteMusic()">
            <img class="header-music cursor-p" id="header-music-mute" src="assets/img/music_icon_pause.png" onclick="muteMusic()">
            <img class="header-music cursor-p" id="header-music-mute-dark" src="assets/img/music_icon_pause_dark.png" onclick="muteMusic()">`;
}


function templateHeaderSoundIcon() {
    return `<img class="header-sound cursor-p d-none" id="header-sound-gray" src="assets/img/sound_icon.png" onclick="muteSound()">
            <img class="header-sound cursor-p d-none" id="header-sound-dark" src="assets/img/sound_icon_dark.png" onclick="muteSound()"> 
            <img class="header-sound cursor-p d-none" id="header-sound-mute" src="assets/img/sound_icon_mute.png" onclick="unmuteSound()">`;
}


function templateHeaderSearchbar() {
    return `<div class="header-searchbar flex" id="header-searchbar" onKeyUp="searchPokemon()">
                <input type="text" class="header-searchbar-input w-100 h-100" id="header-searchbar-input" placeholder="Search Pokemons">
            </div>`;
}


function templateHeaderFavorites() {
    return `<a href="/favorites.html" id="header-favorites-gray"><img class="header-favorites cursor-p" src="assets/img/outline_star_icon.png"></a>
            <a href="/favorites.html" id="header-favorites-dark"><img class="header-favorites cursor-p" src="assets/img/outline_star_icon_dark.png"></a>`;
}


function templateHeaderSettings() {
    return `<img class="header-settings cursor-p" id="header-settings-gray" src="assets/img/settings_icon.png" onclick="openSettingsPopup()">
            <img class="header-settings cursor-p" id="header-settings-dark" src="assets/img/settings_icon_dark.png" onclick="openSettingsPopup()">`;
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
    if(window.location.pathname.includes('favorites.html')) {
        if(darkmode) addClasslist(`header-favorites-dark`,`d-none`);
        else addClasslist(`header-favorites-gray`,`d-none`);
    } else {
        if(darkmode) addClasslist(`header-favorites-gray`,`d-none`);
        else addClasslist(`header-favorites-dark`,`d-none`);
    }
}

function cleanFavoritesIcon() {
    removeClasslist(`header-favorites-gray`, `d-none`);
    removeClasslist(`header-favorites-dark`,`d-none`);
}


// function renderFavoritesIconOnFavorites() {
//     if(darkmode) addClasslist(`header-favorites-dark`,`d-none`);
//     else addClasslist(`header-favorites-gray`,`d-none`);
// }


// function renderFavoritesIconStandard() {
//     if(darkmode) addClasslist(`header-favorites-gray`,`d-none`);
//     else addClasslist(`header-favorites-dark`,`d-none`);
// }


// SETTINGS
function renderSettingsIcon() {
    cleanSettingsIcon();
    if(darkmode) {
        if(settingsOpen) addClasslist(`header-settings-dark`, `d-none`);
        else addClasslist(`header-settings-gray`, `d-none`);
    } else {
        if(settingsOpen) addClasslist(`header-settings-gray`, `d-none`);
        else addClasslist(`header-settings-dark`, `d-none`);
    }
}

function cleanSettingsIcon() {
    removeClasslist(`header-settings-gray`,`d-none`);
    removeClasslist(`header-settings-dark`, `d-none`); 
}


// MUSIC
function renderMusicIcon() {
    cleanMusicIcon();
    if(bgSound == 1) renderMusicIconWhenMusicPlays();
    else renderMusicIconWhenMusicMuted();
}


function cleanMusicIcon() {
    removeClasslist(`header-music-gray`, `d-none`); 
    removeClasslist('header-music-dark', 'd-none');
    removeClasslist(`header-music-mute`, `d-none`);
    removeClasslist(`header-music-mute-dark`, `d-none`);
}


function renderMusicIconWhenMusicPlays() {
    if(darkmode) {
        addClasslist(`header-music-gray`, `d-none`); 
        addClasslist('header-music-dark', 'd-none');
        addClasslist(`header-music-mute`, `d-none`);
    } else {
        addClasslist('header-music-gray', 'd-none');
        addClasslist(`header-music-dark`, `d-none`);
        addClasslist(`header-music-mute-dark`, `d-none`);
    }
}


function renderMusicIconWhenMusicMuted() {
    if(darkmode) {
        addClasslist(`header-music-gray`, `d-none`); 
        addClasslist(`header-music-mute`, `d-none`);
        addClasslist(`header-music-mute-dark`, `d-none`);
        
    } else { 
        addClasslist('header-music-dark', 'd-none');
        addClasslist(`header-music-mute`, `d-none`);
        addClasslist(`header-music-mute-dark`, `d-none`);
    }
}


function unmuteMusic() {
    cleanMusicIcon();
    if(darkmode) unmuteMusicInDarkmode();
    else muteMusicInDarkmoder();
    bgMusic.volume = 0.1;
    bgMusic.loop = true;
    bgMusic.play(); 
    bgSound = 1;
}


function unmuteMusicInDarkmode() {
    addClasslist(`header-music-gray`, `d-none`); 
    addClasslist('header-music-dark', 'd-none');
    addClasslist(`header-music-mute`, `d-none`);
}


function muteMusicInDarkmoder() {
    addClasslist(`header-music-gray`, `d-none`); 
    addClasslist('header-music-dark', 'd-none');
    addClasslist(`header-music-mute-dark`, `d-none`);
}


function muteMusic() {
    cleanMusicIcon();
    if(darkmode) {
        addClasslist(`header-music-gray`, `d-none`); 
        addClasslist('header-music-dark', 'd-none');
        addClasslist(`header-music-mute`, `d-none`);
    }
    else {
        addClasslist(`header-music-gray`, `d-none`); 
        addClasslist('header-music-dark', 'd-none');
        addClasslist(`header-music-mute-dark`, `d-none`);
    }
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








// DARKMODE
// function darkmodeOnOff() {
//     if(darkmode) {
//         darkmode = 0;
//         renderHeaderColor();
//         document.getElementById(`content-container`).style.backgroundColor = 'white';
        
        
//     }
//     else {
//         darkmode = 1;
//         renderHeaderColor();
//         document.getElementById(`content-container`).style.backgroundColor = 'rgba(0,0,0,0.5)';
//     }
//     localStorage.setItem('darkmode', darkmode);
// }