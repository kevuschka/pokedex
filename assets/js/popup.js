let myInterval;

function renderLoadPopup() {
    let content = document.getElementById('popups');
    content.innerHTML = templateLoadPopup();
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


function openLoadPopup() {
    // if(allPokemons.length == 0) {
    //     document.getElementById('popups').style.minHeight = '100vh';
    //     removeClasslist('loadPopup-full', 'd-none');
    //     removeClasslist('loadPopup-subtitle-container', 'd-none');
    // } else {
        document.getElementById('popups').style.minHeight = '100vh';
        addClasslist('loadPopup-full', 'opa-off');
        removeClasslist('loadPopup-full', 'd-none');
        document.getElementById('loadPopup-image-overlay').style.backgroundImage = `linear-gradient(90deg, transparent 100%, rgb(1, 5, 53) 0%)`;
        setTimeout(() => {
            removeClasslist('loadPopup-full', 'opa-off');
        }, 300);
    //}
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
        addClasslist('loadPopup-full', 'd-none');
    }, 1800);
    clearInterval(myInterval);
}
