function renderPageSiteBottomNav() {
    if(!(onFavoritesPage || searching)) {
        calculateLastPageNumber(pokemonsPerPage);
        let content = document.getElementById(`pokemon-list`);
        content.innerHTML += `<div class="bottom-nav-container w-100 flex">
                                    <div class="bottom-nav align-center flex" id="bottom-nav"></div>
                                </div>`;
        renderBottomNavNumbers();
        addClasslist(`bottom-nav-number-${currentPageNumber}`, `selected-bottom-nav-number`);
    }
}


function calculateLastPageNumber(pokemonPerPageNumber) {
    let max = allPokemonsBasicData.length;
    if((max % pokemonPerPageNumber) > 0) lastPageNumber = parseInt((max / pokemonPerPageNumber).toString().split('.')[0]) + 1;
    else lastPageNumber = (max / pokemonPerPageNumber).toFixed();
    localStorage.setItem('lastPageNumber', JSON.stringify(lastPageNumber));
}


function renderBottomNavNumbers() {
    let nav = document.getElementById('bottom-nav');
    nav.innerHTML = '';
    if(!searching && !onFavoritesPage) {
        if(currentPageNumber == 1 || currentPageNumber == lastPageNumber) renderBottomNavNumbersEndPoints(nav);
        else if(currentPageNumber == 2 || currentPageNumber == (lastPageNumber-1)) renderBottomNavNumbersSecondEndPoints(nav);
        else if(currentPageNumber == 3 || currentPageNumber == (lastPageNumber-2)) renderBottomNavNumbersThirdEndPoints(nav);
        else renderBottomNavNumbersMiddle(nav);
    }
}


function renderBottomNavNumbersEndPoints(content) {
    if(lastPageNumber > 3) {
        if(currentPageNumber == 1) {
            renderBottomNavNumbersInLoopFor(3, 1, content);
            renderBottomNavEndingPlaceholder(content);
        } else if(currentPageNumber == lastPageNumber) {
            renderBottomNavBeginningPlaceholder(content);
            renderBottomNavNumbersInLoopFor(3, lastPageNumber-2, content);
        }
    } else renderBottomNavNumbersInLoopFor(3, 1, content);
}


function renderBottomNavNumbersSecondEndPoints(content) {
    if(lastPageNumber > 4) {
        if(currentPageNumber == 2) {
            renderBottomNavNumbersInLoopFor(4, 1, content);
            renderBottomNavEndingPlaceholder(content);
        } else if(currentPageNumber == (lastPageNumber-1)) {
            renderBottomNavBeginningPlaceholder(content);
            renderBottomNavNumbersInLoopFor(4, lastPageNumber-3, content);
        }
    } else renderBottomNavNumbersInLoopFor(4, 1, content)
}


function renderBottomNavNumbersThirdEndPoints(content) {
    if(lastPageNumber > 5) {
        if(currentPageNumber == 3) {
            renderBottomNavNumbersInLoopFor(5, 1, content);
            renderBottomNavEndingPlaceholder(content);
        } else if(currentPageNumber == (lastPageNumber-2)) {
            renderBottomNavBeginningPlaceholder(content);
            renderBottomNavNumbersInLoopFor(5, lastPageNumber-4, content);
        }
    } else renderBottomNavNumbersInLoopFor(5, 1, content);
}


function renderBottomNavNumbersMiddle(content) {
    renderBottomNavBeginningPlaceholder(content);
    renderBottomNavNumbersInLoopFor(5, currentPageNumber-2, content)
    renderBottomNavEndingPlaceholder(content);
}


function renderBottomNavBeginningPlaceholder(content) {
    content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-1" onclick="renderPageNumber(1)">1</p>`;
    content.innerHTML += `<p class="bottom-nav-placeholder">...</p>`;
}


function renderBottomNavEndingPlaceholder(content) {
    content.innerHTML += `<p class="bottom-nav-placeholder">...</p>`;
    content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-${lastPageNumber}" onclick="renderPageNumber(${lastPageNumber})">${lastPageNumber}</p>`;
}


function renderBottomNavNumbersInLoopFor(loopTimes, startingAt, content) {
    for (let i = 0; i < loopTimes; i++) {
        content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-${startingAt}" onclick="renderPageNumber(${startingAt})">${startingAt}</p>`;
        startingAt++;
    }
}


function renderPageNumber(i) {
    lastSelected = false;
    if(sideWrapperIsOpen) hideSelectedPokemonWrapper();
    currentPageNumber = i;
    let from = (i-1)*pokemonsPerPage;
    let to;
    if(i == lastPageNumber) to = from + (allPokemonsBasicData.length % pokemonsPerPage);
    else to = from + pokemonsPerPage;
    renderPokemonsPage(from, to);
    renderPageSiteBottomNav();
}