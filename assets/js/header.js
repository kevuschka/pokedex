/**
 * That function renders the header with its buttons and its color.
 */
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

/**
 * That function includes templates and renders the buttons and the searchbar on the right side of the header.
 * @param {Element} content - is the div element where the templates will be rendered in.
 */
function renderHeaderFunctionalityTemplates(content) {
    content.innerHTML = templateHeaderMusicIcon();
    content.innerHTML += templateHeaderSearchbar();
    content.innerHTML += templateHeaderFavorites();
    content.innerHTML += templateHeaderSettings();
    renderHeaderIcons();
}

/**
 * That function renders the header background color: darkmode if 'darkmode' is true, else lightmode.
 */
function renderHeaderColor() {
    removeAllHeaderAdditionClasses(); 
    if(darkmode) addClasslist('header', 'bg-darkmode');
    else addClasslist('header', 'bg-normal');
}

/**
 * That function removes any background classes from the header.
 */
function removeAllHeaderAdditionClasses() {
    removeClasslist('header', 'bg-normal');
    removeClasslist('header', 'bg-darkmode');
}


// RENDER HEADER ICONS 
/**
 * That function renders the correct header icons on the right side.
 */
function renderHeaderIcons() {
    renderFavoritesIcon();
    renderSettingsIcon();
    renderMusicIcon();
}

// FAVORITES
/**
 * That function renders the correct header favorites icon depending on page url and dark-/lightmode and if selected.
 */
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

/**
 * That function removes the 'd-none' class from the header favorites icons.
 */
function cleanFavoritesIcon() {
    removeClasslist(`header-favorites-gray`, `d-none`);
    removeClasslist(`header-favorites-dark`,`d-none`);
}


// SETTINGS
/**
 * That function renders the header settings icon depending on dark-/lightmode and if selected.
 */
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

/**
 * That function removes the 'd-none' classes from the header settings icons.
 */
function cleanSettingsIcon() {
    removeClasslist(`header-settings-gray`,`d-none`);
    removeClasslist(`header-settings-dark`, `d-none`); 
}


// MUSIC
/**
 * That function renders the music icon in the header.
 */
function renderMusicIcon() {
    cleanMusicIcon();
    if(bgSound == 1) renderMusicIconWhenMusicPlays();
    else renderMusicIconWhenMusicMuted();
}

/**
 * That function removes the 'd-none' classes from the header music icons.
 */
function cleanMusicIcon() {
    removeClasslist(`header-music-gray`, `d-none`); 
    removeClasslist('header-music-dark', 'd-none');
    removeClasslist(`header-music-mute`, `d-none`);
    removeClasslist(`header-music-mute-dark`, `d-none`);
}

/**
 * That function renders the correct header music icon when music is not muted (unmuted), depending on dark-/lightmode.
 */
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

/**
 * That function renders the correct header music icon when music is muted, depending on dark-/lightmode.
 */
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

/**
 * That function mutes the music and renders the header music icon.
 */
function unmuteMusic() {
    cleanMusicIcon();
    if(darkmode) unmuteMusicInDarkmode();
    else unmuteMusicInLightmode();
    bgMusic.volume = 0.1;
    bgMusic.loop = true;
    bgMusic.play(); 
    bgSound = 1;
}

/**
 * That function adds the 'd-none' class to several header-music elements when the music is unmuted, in darkmode.
 */
function unmuteMusicInDarkmode() {
    addClasslist(`header-music-gray`, `d-none`); 
    addClasslist('header-music-dark', 'd-none');
    addClasslist(`header-music-mute`, `d-none`);
}

/**
 * That function adds the 'd-none' class to several header-music elements when the music is unmuted, in lightmode.
 */
function unmuteMusicInLightmode() {
    addClasslist(`header-music-gray`, `d-none`); 
    addClasslist('header-music-dark', 'd-none');
    addClasslist(`header-music-mute-dark`, `d-none`);
}

/**
 * That function adds the 'd-none' class to several header-music elements when the music is muted, depending on dark-/lightmode.
 */
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