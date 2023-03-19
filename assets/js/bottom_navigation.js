/**
 * That function renders the bottom navigation on the page.
 */
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

/**
 * That function calculates the last page number and stores it in the localstorage.
 * @param {number} pokemonPerPageNumber - is the number of pokemons shown per page.
 */
function calculateLastPageNumber(pokemonPerPageNumber) {
    let max = allPokemonsBasicData.length;
    if((max % pokemonPerPageNumber) > 0) lastPageNumber = parseInt((max / pokemonPerPageNumber).toString().split('.')[0]) + 1;
    else lastPageNumber = (max / pokemonPerPageNumber).toFixed();
    localStorage.setItem('lastPageNumber', JSON.stringify(lastPageNumber));
}

/**
 * That function renders the bottom navigation numbers, depending on the page numbers before and after.
 */
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

/**
 * That function renders the bottom navigation in 'end point' style.
 * @param {element} content - is the div element in which the bottom navigation numbers will be rendered in.
 */
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

/**
 * That function renders the bottom navigation in 'second end point' style.
 * E.g. on page number 2 or lastPageNumber-1.
 * @param {element} content - is the div element in which the bottom navigation numbers will be rendered in.
 */
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

/**
 * That function renders the bottom navigation in 'third end point' style.
 * E.g. on page number 3 or lastPageNumber-2.
 * @param {element} content - is the div element in which the bottom navigation numbers will be rendered in.
 */
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

/**
 * That function renders the bottom navigation in 'middle' style.
 * E.g. on page number 4 or lastPageNumber-3. So there are 3 pages before or after available.
 * @param {element} content - is the div element in which the bottom navigation numbers will be rendered in.
 */
function renderBottomNavNumbersMiddle(content) {
    renderBottomNavBeginningPlaceholder(content);
    renderBottomNavNumbersInLoopFor(5, currentPageNumber-2, content)
    renderBottomNavEndingPlaceholder(content);
}

/**
 * That function renders the bottom navigation first page number and adds a placeholder '...' after it.
 * @param {element} content - is the div element in which the bottom navigation numbers will be rendered in.
 */
function renderBottomNavBeginningPlaceholder(content) {
    content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-1" onclick="renderPageNumber(1)">1</p>`;
    content.innerHTML += `<p class="bottom-nav-placeholder">...</p>`;
}

/**
 * That function renders the bottom navigation last page number and adds a placeholder '...' before it.
 * @param {element} content - is the div element in which the bottom navigation numbers will be rendered in.
 */
function renderBottomNavEndingPlaceholder(content) {
    content.innerHTML += `<p class="bottom-nav-placeholder">...</p>`;
    content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-${lastPageNumber}" onclick="renderPageNumber(${lastPageNumber})">${lastPageNumber}</p>`;
}

/**
 * That function renders the bottom navigation numbers in a loop, which are directly neighbours without any placeholder.
 * @param {number} loopTimes - is the number for bottom navigation number in a row (without placeholders between).
 * @param {number} startingAt - is the page number at which the following rendered bottom-navigation-page-numbers are starting
 * @param {element} content - is the div element in which the bottom navigation numbers will be rendered in.
 */
function renderBottomNavNumbersInLoopFor(loopTimes, startingAt, content) {
    for (let i = 0; i < loopTimes; i++) {
        content.innerHTML += `<p class="bottom-nav-number cursor-p" id="bottom-nav-number-${startingAt}" onclick="renderPageNumber(${startingAt})">${startingAt}</p>`;
        startingAt++;
    }
}

/**
 * That function renders the page when clicking on a page numberin the bottom navigation.
 * @param {number} i - is the page number from the bottom navigation.
 */
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