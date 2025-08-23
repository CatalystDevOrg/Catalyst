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
        document.getElementById('pref-usrchr').checked = preferences.userChrome
        addCheckboxListener(document.getElementById('pref-usrchr'), 'userChrome');
        document.getElementById('pref-adblk').checked = preferences.adblockEnabled;
        addCheckboxListener(document.getElementById('pref-adblk'), 'adblockEnabled');
        if (preferences.agent.toString().length > 1) {
            document.getElementById('pref-useragent').value =
                preferences.agent || 'Catalyst/{{version}}';
        } else {
            document.getElementById('pref-useragent').value = preferences.userAgent;
        }
        addTextListener(document.getElementById('pref-useragent'), 'agent');
        addTextListener(document.getElementById('pref-font'), 'font');
        addTextListener(document.getElementById('pref-strt'), 'startpage');
        addSelectListener(document.getElementById('pref-theme'), 'theme');
        addCheckboxListener(document.getElementById('pref-esb'), 'esb');
        document.getElementById('pref-esb').checked = preferences.esb;
        addSelectListener(document.getElementById('se'), 'searchengine');
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
            JSON.stringify({ dark: false, agent: '', autocomplete: true, bookmarks: false, esb: false, startpage: './home.html', sidebarside: '1', searchengine: 1 })
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
        if (preferences.sidebarSide === '1' ){
            sb.style.left = 'unset';
            sb.style.right = 0;
        }}
}

var enginespref = document.querySelector('#se');
enginespref.onchange = (event) => {
    var index = enginespref.options.selectedIndex;
    localStorage.setItem('engine', index);
};

enginespref.value = localStorage.getItem('engine') || '1';

var langpref = document.querySelector('#lang');
langpref.onchange = (event) => {
    var index = langpref.value;
    localStorage.setItem('catalyst.localization.language', index);
    alert('Restart required to apply change.');
};

langpref.value = localStorage.getItem('catalyst.localization.language') || 'en';

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