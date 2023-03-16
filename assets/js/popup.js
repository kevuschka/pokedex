let myInterval;

function renderLoadPopup() {
    let content = document.getElementById('popups');
    content.innerHTML = templateLoadPopup();
    content.innerHTML +=  templateSettingsPopup();
    content.innerHTML += templateAbilityDescriptionPopup();
    let settingsContent = document.getElementById('settings-popup');
    settingsContent.innerHTML = templateSettingsPopupContent();
    templateSettingsPopupSound();
    templateSettingsPopupTheme();
    openLoadPopup();
}


function openLoadPopup() {
    document.getElementById('popups').style.minHeight = '100vh';
    addClasslist('loadPopup-full', 'opa-off');
    removeClasslist('loadPopup-full', 'd-none');
    document.getElementById('loadPopup-image-overlay').style.backgroundImage = `linear-gradient(90deg, transparent 100%, rgb(1, 5, 53) 0%)`;
    setTimeout(() => {
        removeClasslist('loadPopup-full', 'opa-off');
    }, 300);
}


function closeLoadPopup() {
    closeLoadPopupLater();
}


function closeLoadPopupLater() {
    loadPopupEffect();
    setTimeout(() => {
        addClasslist('loadPopup-full', 'opa-off');
    }, 1500);
    setTimeout(() => {
        document.getElementById('popups').style.minHeight = '';
    }, 1800);
    setTimeout(() => {
        removeClasslist('loadPopup-full', 'opa-off');
        clearInterval(myInterval);
        addClasslist('loadPopup-full', 'd-none');
    }, 1800);
}


function loadPopupEffect() {
    setTimeout(() => {
        loadImageVisibility = 0;
        myInterval = setInterval(() => {
            loadImageVisibility += 5;
            document.getElementById('loadPopup-full').style.backgroundImage = `linear-gradient(-45deg, rgb(1, 5, 53), white ${loadImageVisibility}%, rgb(1, 5, 53))`;
        }, 80);
    }, 300);
}


function openSettingsPopup() {
    settingsOpen = true;
    renderSettingsState();
    removeClasslist('settings-popup-full', 'd-none');
    setTimeout(() => {
        addClasslist('settings-popup-full', 'opa-on');
    }, 10);
    renderHeader();
}


function closeSettingsPopup() {
    settingsOpen = false;
    removeClasslist('settings-popup-full', 'opa-on');
    setTimeout(() => {
        addClasslist('settings-popup-full', 'd-none');
    }, 130);
    renderHeader();
}


function muteSound() {
    addClasslist('sound-icon-mute', 'd-none');
    addClasslist('sound-icon-selected', 'd-none');
    removeClasslist('sound-icon', 'd-none');
    removeClasslist('sound-icon-mute-selected', 'd-none');
    sound = false;
    localStorage.setItem('sound', sound);
}


function unmuteSound() {
    addClasslist('sound-icon', 'd-none');
    addClasslist('sound-icon-mute-selected', 'd-none');
    removeClasslist('sound-icon-mute', 'd-none');
    removeClasslist('sound-icon-selected', 'd-none');
    sound = true;
    localStorage.setItem('sound', sound);
}


function renderSettingsState() {
    checkPokemonPerPageSettings();
    checkSoundSettings();
    checkThemeSettings();
}


function checkPokemonPerPageSettings() {
    unselectAllPerPageNumbersInSettings();
    addClasslist(`settings-numbers-${pokemonsPerPage}`, 'choosed-settings-number');
}


function checkSoundSettings() {
    if(sound == "true" || sound == true) unmuteSound();
    else muteSound();
}


function checkThemeSettings() {
    removeClasslist(`settings-theme-dark`, 'choosed-settings-theme');
    removeClasslist(`settings-theme-light`, 'choosed-settings-theme');
    if(darkmode) addClasslist(`settings-theme-dark`, 'choosed-settings-theme');
    else addClasslist(`settings-theme-light`, 'choosed-settings-theme');
}


function selectSettingsPokemonNumberPerPage(number) {
    lastSelected = false;
    if(sideWrapperIsOpen) hideSelectedPokemonWrapper();
    if(pokemonsPerPage != number) {
        unselectAllPerPageNumbersInSettings();
        addClasslist(`settings-numbers-${number}`, 'choosed-settings-number');
        pokemonsPerPage = number;
        setLocalStorage();
        renderPageNumber(1);
    }
}


function unselectAllPerPageNumbersInSettings() {
    for (let i = 1; i < 7; i++)
        removeClasslist(`settings-numbers-${i}0`, 'choosed-settings-number')
}


function selectSettingsTheme(theme) {
    removeClasslist('settings-theme-dark', 'choosed-settings-theme');
    removeClasslist('settings-theme-light', 'choosed-settings-theme');
    addClasslist(`settings-theme-${theme}`, 'choosed-settings-theme');
    document.getElementById('settings-popup').style.color = 'rgb(197, 197, 197)';
    if(theme == 'dark') darkmode = true;
    else darkmode = false;
    setLocalStorage();
    renderHeader();
    renderPageColor();
}