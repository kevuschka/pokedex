let myInterval;

function renderLoadPopup() {
    let content = document.getElementById('popups');
    content.innerHTML = templateLoadPopup();
    content.innerHTML +=  templateSettingsPopup();
    content.innerHTML += templateAbilityDescriptionPopup();
    let settingsContent = document.getElementById('settings-popup');
    settingsContent.innerHTML = templateSettingsPopupContent();
    openLoadPopup();
}


function templateLoadPopup() {
    return `<div class="loadPopup-full absolute flex d-none" id="loadPopup-full">
                <div class="loadPopup-container flex column smooth-trans" id="loadPopup-container">
                    <div class="loadPopup-logo-container relative">
                        <img class="loadPopup-image" src="assets/img/pokedex_logo.png" alt="pokemon-logo">
                        <div class="loadPopup-image-overlay absolute smooth-trans" id="loadPopup-image-overlay"></div>
                    </div>
                    <div class="loadPopup-subtitle-container flex smooth-trans d-none" id="loadPopup-subtitle-container">
                        <p>Loading...</p>
                        <img class="loading-circle smooth-trans" id="loading-circle" src="assets/img/loading1.png" alt="loading-circle">
                    </div>
                </div>
            </div>`;
}


function templateSettingsPopup() {
    return `<div class="settings-popup-full w-100 absolute flex d-none" onclick="closeSettingsPopup()" id="settings-popup-full">
                <div class="settings-popup flex column" id="settings-popup" onclick="doNotClose(event)"></div>    
            </div>`;
}


function templateSettingsPopupContent() {
    return `<div class="settings-numbers flex w-100">
                <p>Pokemons per Page</p>
                <div class="settings-numbers-selection flex">
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-10" onclick="selectSettingsPokemonNumberPerPage(10)">10</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-20" onclick="selectSettingsPokemonNumberPerPage(20)">20</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-30" onclick="selectSettingsPokemonNumberPerPage(30)">30</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-40" onclick="selectSettingsPokemonNumberPerPage(40)">40</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-50" onclick="selectSettingsPokemonNumberPerPage(50)">50</p>
                    <p class="settings-number-per-page cursor-p" id="settings-numbers-60" onclick="selectSettingsPokemonNumberPerPage(60)">60</p>
                </div>
                
            </div>
            <div class="settings-sound flex w-100">
                <p>Sound</p>
                <div class="settings-sound-selection flex">
                    <img src="assets/img/sound_icon.png" class="settings-sound-icon cursor-p" onclick="unmuteSound()" id="sound-icon">    
                    <img src="assets/img/sound_icon_selected.png" class="settings-sound-icon cursor-d" id="sound-icon-selected">    
                    <img src="assets/img/sound_icon_mute.png" class="settings-sound-icon cursor-p" onclick="muteSound()" id="sound-icon-mute">    
                    <img src="assets/img/sound_icon_mute_selected.png" class="settings-sound-icon cursor-d" id="sound-icon-mute-selected">    
                </div>
            </div>
            <div class="settings-theme flex w-100">
                <p>Theme</p>
                <div class="settings-theme-selection flex">
                    <div class="settings-theme-dark cursor-p" onclick="selectSettingsTheme('dark')" id="settings-theme-dark"></div>
                    <div class="settings-theme-light cursor-p" onclick="selectSettingsTheme('light')" id="settings-theme-light"></div>
                </div>
            </div>
            `;
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
    // if(dataLoaded) {
    //     dataLoaded = false;
    //     closeLoadPopupNow()
    // } else 
    closeLoadPopupLater();
}


function closeLoadPopupNow() {
    addClasslist('loadPopup-full', 'opa-off');
    setTimeout(() => {
        document.getElementById('popups').style.minHeight = '';
    }, 410);
    setTimeout(() => {
        removeClasslist('loadPopup-full', 'opa-off');
        addClasslist('loadPopup-subtitle-container', 'd-none');
        addClasslist('loadPopup-full', 'd-none');
    }, 1000);
}


function closeLoadPopupLater() {
    setTimeout(() => {
        loadImageVisibility = 0;
        myInterval = setInterval(() => {
            loadImageVisibility += 5;
            document.getElementById('loadPopup-full').style.backgroundImage = `linear-gradient(-45deg, rgb(1, 5, 53), white ${loadImageVisibility}%, rgb(1, 5, 53))`;
        }, 80);
    }, 300);
    

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


function selectSettingsSoundSwitch() {
    if(sound = "true" || sound == true) {
        sound = false;
        document.getElementById('sound-switch').checked = false;
    } else {
        sound = true;
        document.getElementById('sound-switch').checked = true;
    }
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


function templateAbilityDescriptionPopup() {
    return `<div class="ability-description-popup-full absolute flex d-none" id="ability-description-popup-full" onclick="closeAbilityDescription()">
                <div class="ability-description-popup flex" id="ability-description" onclick="doNotClose(event)"></div>
            </div>`;
}