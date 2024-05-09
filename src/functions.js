const generateHashkey = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
};

const removeChildren = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};


function downloadCurrentPage() {
    currentView = document.querySelector('.current');
    let contents = currentView.src;
    downloadURI(contents, contents);
}

function closeWelcome() {
    // add hidden class to welcomepage id
    document.getElementById('welcomepage').classList.add('hidden');
}

// if value new isn't set, remove class hidden from welcomepage id then set value new to false
function openWelcome() {
    if (window.localStorage.getItem('new') === null) {
        // remove class hidden from welcomepage id and add flex to welcomepage id
        document.getElementById('welcomepage').classList.remove('hidden');
        window.localStorage.setItem('new', false);
    }
}

function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

const getPackageJSON = async () => {
    return await (await fetch('../package.json')).json();
};

function openDocs() {
    createTab('https://getcatalyst.eu.org/docs');
}

function clearData() {
    if (!confirm('Are you sure you want to delete all preferences and bookmarks from Catalyst? \n   You will stay logged into all the websites you use!')) return;
    window.localStorage.clear();
    localStorage.setItem('ctlyststrppg', './home.html');
    window.close();
}

function inspectTab() {
    document.querySelector('.current').inspectElement(0, 0);
}

function invertTab() {
    view.insertCSS('html { filter: invert(100%); }');
    view.insertCSS('img { filter: invert(100%) !important} ');
}

function openChangeLog() {
    ver = document.querySelector('#ver').innerText;
    createTab(`https://github.com/jdev082/Catalyst/releases/tag/${ver}`);
}

openWelcome();

function toggleBookmarks() {
    document.querySelector('#bookmarks').classList.toggle('hidden');
    document.querySelector('.current').classList.toggle('hidden');
}

function toggleDisplay(e) {
    e.classList.toggle('hidden');
}

function toggleFind() {
    e = document.querySelector('#find');
    e.classList.toggle('hidden');
}

function toggleFullScreen() {
    toggleDisplay(document.querySelector('#userchrome'));
    cat.ipcToggleFs();
}

function createModal(h, t, f="") {
    let modal = document.createElement('div')
    modal.classList.add("modal")
    let head = document.createElement('h1')
    head.innerText = h;
    let text = document.createElement('p')
    text.innerText = t;
    let func = document.createElement('button')
    func.innerText = 'Ok'
    func.onclick = f;
    let exit = document.createElement('button')
    exit.innerText = 'Done'
    exit.onclick = console.log(document.querySelectorAll("modal"))
    modal.appendChild(head)
    modal.appendChild(text)
    modal.appendChild(func)
    modal.appendChild(exit)
    document.body.appendChild(modal)
}