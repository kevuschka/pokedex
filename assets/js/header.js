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


// RENDER HEADER ICONS 

function renderHeaderIcons() {
    renderFavoritesIcon();
    renderSettingsIcon();
    renderMusicIcon();
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
        addClasslist(`header-music-mute`, `d-none`);
        addClasslist(`header-music-mute-dark`, `d-none`);
    }
    else { 
        addClasslist('header-music-dark', 'd-none');
        addClasslist(`header-music-mute`, `d-none`);
        addClasslist(`header-music-mute-dark`, `d-none`);
    }
    bgMusic.pause();
    bgSound = 0;
}