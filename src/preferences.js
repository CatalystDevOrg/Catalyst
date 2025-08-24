let preferences = getPreferences();
const categories = ['basic', 'advanced', 'experiments'];
const preferencesBox = document.getElementById('preferences-box');
evaluatePreferences();

/**
 * Toggles the preferences viewer
 */
function togglePreferences() {
    preferences = getPreferences();
    preferencesBox.classList.toggle('hidden');
    if (!preferencesBox.classList.contains('hidden')) {
        // run preferences
        evaluatePreferences();
        // update fields in preferences
        document.getElementById('pref-darkmode').checked = preferences.darkModeEnabled;
        addCheckboxListener(document.getElementById('pref-darkmode'), 'darkModeEnabled');

        document.getElementById('pref-autocomplete').checked = preferences.autocompleteEnabled;
        addCheckboxListener(document.getElementById('pref-autocomplete'), 'autocompleteEnabled');

        document.getElementById('pref-dm').checked = preferences.forcedDarkEnabled;
        addCheckboxListener(document.getElementById('pref-dm'), 'forcedDarkEnabled');

        document.getElementById('pref-usrchr').checked = preferences.userChromeEnabled;
        addCheckboxListener(document.getElementById('pref-usrchr'), 'userChromeEnabled');

        document.getElementById('pref-adblk').checked = preferences.adblockEnabled;
        addCheckboxListener(document.getElementById('pref-adblk'), 'adblockEnabled');

        addCheckboxListener(document.getElementById('pref-esb'), 'sideBarEnabled');
        document.getElementById('pref-esb').checked = preferences.sideBarEnabled;

        addCheckboxListener(document.getElementById('pref-anicontent'), 'anicontent');
        document.getElementById('pref-anicontent').checked = preferences.anicontent;

        addSelectListener(document.getElementById('se'), 'searchEngine');
        document.getElementById('se').value = preferences.searchEngine;

        addSelectListener(document.getElementById('pref-theme'), 'theme');
        document.getElementById('pref-theme').value = preferences.theme;

        addSelectListener(document.getElementById('lang'), 'language');
        document.getElementById('lang').value = preferences.language;

        addTextListener(document.getElementById('pref-useragent'), 'userAgent');
        document.getElementById('pref-useragent').value = preferences.userAgent;

        addTextListener(document.getElementById('pref-font'), 'font');
        document.getElementById('pref-font').value = preferences.font;

        addTextListener(document.getElementById('pref-strt'), 'startupPage');
        document.getElementById('pref-strt').value = preferences.startupPage;

        addTextListener(document.getElementById('pref-useragent'), 'userAgent');
        document.getElementById('pref-useragent').value = preferences.userAgent;
    }
}

function closePreferences() {
    preferences = getPreferences();
    toggleDisplay(preferencesBox);
}

/**
 * Gets the preferences stored in LocalStorage
 * @returns {Object}
 */
function getPreferences() {
    if (!window.localStorage.getItem('preferences')) {
        window.localStorage.setItem(
            'preferences',
            JSON.stringify({ darkModeEnabled: false, userAgent: null, autocompleteEnabled: true, bookmarks: false, sidebarEnabled: false, startupPage: './home.html', sidebarSide: 1, searchEngine: 1, anicontent: false, theme: 0, language: 'en' })
        );
    }
    return JSON.parse(window.localStorage.getItem('preferences'));
}

/**
 * Adds a Checkbox listener
 * @param {HTMLElement} element The HTMLElement to listen to
 * @param {string} prefKey The key in "preferences" for this element.
 */
function addCheckboxListener(element, prefKey) {
    element.addEventListener('change', () => {
        preferences[prefKey] = !!element.checked;
        updatePreferences();
    });
}
/**
 * Adds a Text input listener
 * @param {HTMLElement} element The HTMLElement to listen to
 * @param {string} prefKey The key in "preferences" for this element.
 */
function addTextListener(element, prefKey) {
    element.addEventListener('input', () => {
        preferences[prefKey] = element.value;
        updatePreferences();
    });
}

function addSelectListener(element, prefKey) {
    element.addEventListener('change', () => {
        preferences[prefKey] = element.value;
        updatePreferences();
    });
}

/**
 * Updates the preferences in LocalStorage to the new preferences and evaluates the new ones
 */
function updatePreferences() {
    window.localStorage.setItem('preferences', JSON.stringify(preferences));
    evaluatePreferences();
}

/**
 * Evaluates the preferences in the preferences variable
 */
function evaluatePreferences() {
    if (preferences.darkModeEnabled) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    if (preferences.userChrome) {
        native.loadCustomStyles();
    }
    if (preferences.theme) {
        if (document.getElementsByClassName('theme').length > 0) {
            native.unloadTheme();
        }
        /* if (preferences.theme == 0) {
        } */
        native.loadTheme(preferences.theme);
    }
    if (preferences.font) {
        document.body.style.fontFamily = preferences.font;
    }
    if (preferences.sideBarEnabled) {
        document.getElementById('tgl-sidebar').classList.remove('hidden');
    }
    if (preferences.sidebarSide) {
        var sb = document.getElementById('sidebar');
        if (preferences.sidebarside === '0') {
            sb.style.right = 'unset';
            sb.style.left = 0;
        }
        if (preferences.sidebarSide === '1') {
            sb.style.left = 'unset';
            sb.style.right = 0;
        }
    }
    if (!preferences.anicontent) {
        document.getElementById('userchrome').style.backgroundImage = 'none';
    }
}

function changePrefTab(itm) {
    document.querySelector(`#${itm}`).classList.remove('hidden');
    others = document.querySelector('#preferences-box').getElementsByTagName('*');
    for (i = 0; i < others.length; ++i) {
        e = others[i];
        if (e.id != itm && categories.includes(e.id)) {
            e.classList.add('hidden');
        }
    }
}