// Init variables
let activeHash = '0';
let hasFavicon = {};
// Functions

/**
 * Creates a new tab
 * @param {string} url The URL of the page to go to, optional.
 */

async function createTab(url) {
    url = url || ctlyststrppg;
    const packageJSON = await getPackageJSON();
    const inputAgent = JSON.parse(
        window.localStorage.getItem('preferences')
    ).agent;
    let tab = document.createElement('div');
    let span = document.createElement('span');
    // Some parts taken from MystPi/Ninetails on Github. Thank you so much!!!
    let randomHash = generateHashkey();
    tab.classList.add('tab');
    tab.id = `tab-${randomHash}`;
    tab.onclick = () => {
        switchTabs(randomHash);
    };
    span.innerText = 'New Tab';
    document.getElementById('tabs-bar').appendChild(tab);
    let view = document.createElement('webview');
    view.id = 'view-' + randomHash;
    view.classList.add('view');
    view.allowpopups = 'allowpopups';
    view.webpreferences = 'nativeWindowOpen=true';
    if (!inputAgent.length < 1) {
        view.useragent = inputAgent.replace('{{version}}', packageJSON.version);
    }
    view.src = url;
    let image = document.createElement('img');
    image.width = '16';
    image.height = '16';
    image.style.border = '0';
    tab.appendChild(image);
    tab.appendChild(span);
    addListeners(view, randomHash);
    document.getElementById('webviews').appendChild(view);
    switchTabs(randomHash);
}
createTab();

/**
 * Switches the tab to the selected one
 * @param {string} tabHash - The random hash of the tab to switch to
 */
function switchTabs(tabHash) {
    let currentTab = document.querySelector('.active-tab');
    if (currentTab) {
        currentTab.classList.remove('active-tab');
        currentTab.classList.add('tab');
    }

    let activeTab = document.getElementById('tab-' + tabHash);
    activeTab.classList.add('active-tab');
    activeTab.classList.remove('tab');

    let views = document.querySelectorAll('.view');
    views.forEach((x) => {
        x.style.display = 'none';
        x.classList.remove('current');
    });
    document.getElementById('view-' + tabHash).style.display = 'flex';
    document.getElementById('view-' + tabHash).classList.add('current');
    view = document.getElementById('view-' + tabHash);
    activeHash = tabHash;
}

function addListeners(view, hash) {
    const tab = document.getElementById(`tab-${hash}`);
    hasFavicon[hash] = false;
    if (!hasFavicon[hash]) {
        tab.getElementsByTagName('img')[0].style.display = 'none';
    } else {
        tab.getElementsByTagName('img')[0].style.display = 'inline';
    }
    view.addEventListener('did-stop-loading', () => {
        tab.getElementsByTagName('span')[0].innerText = view.getTitle();
        tab.classList.remove('animate-pulse');
        let viewURL = view.getURL();
        if (!viewURL.startsWith('file://')) {
            document.getElementById('searchbar').value = viewURL;
        }
        removeChildren(document.getElementById('autocomplete-suggestions'));
    });
    view.addEventListener('did-start-loading', () => {
        tab.classList.add('animate-pulse');
        tab.getElementsByTagName('img')[0].style.display = 'none';
        removeChildren(document.getElementById('autocomplete-suggestions'));
    });
    view.addEventListener('page-title-updated', (e) => {
        tab.getElementsByTagName('span')[0].innerText = e.title;
        let viewURL = view.getURL();
        if (!viewURL.startsWith('file://')) {
            document.getElementById('searchbar').value = viewURL;
        }
    });
    view.addEventListener('new-window', (e) => createTab(e.url));
    view.addEventListener('close', removeTab);
    view.addEventListener('page-favicon-updated', (e) => {
        if (e.favicons.length > 0) {
            hasFavicon[hash] = true;
            let icon = e.favicons[0];
            let img = tab.getElementsByTagName('img')[0];
            img.style.display = 'inline';
            tab.getElementsByTagName('span')[0].classList.add('px-2');
            img.src = icon;
        } else {
            hasFavicon[hash] = false;
            tab.getElementsByTagName('span')[0].classList.remove('px-2');
            tab.getElementsByTagName('img')[0].style.display = 'none';
        }
    });
}

function removeTab() {
    if (document.getElementById('webviews').childNodes.length === 1) return;
    document.querySelector('.current').remove();
    document.querySelector('.active-tab').classList.toggle('sliding-rtl');
    document.querySelector('.active-tab').remove();
    switchTabs(
        document
            .getElementById('tabs-bar')
            .lastElementChild.id.substring(
                4,
                document.getElementById('tabs-bar').lastElementChild.id.length
            )
    );
}

document.addEventListener('keydown', (e) => handleTabShortcuts(e));

function handleTabShortcuts(e) {
    // on macos, e.ctrlKey isn't true when pressing cmd, so use e.metaKey too
    const isModifier = e.metaKey || e.ctrlKey;
    if (isModifier && e.key === 't') {
        createTab();
        e.preventDefault();
    }
    if (isModifier && e.key === 'w') {
        removeTab();
        e.preventDefault();
    }
}