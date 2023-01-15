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
}

const removeChildren = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};


function downloadCurrentPage() {
    currentView = document.querySelector('.current')
    let contents = currentView.src;
    downloadURI(contents, contents);
}

function closeWelcome() {
    // add hidden class to welcomepage id
    document.getElementById("welcomepage").classList.add("hidden");
}

// if value new isn't set, remove class hidden from welcomepage id then set value new to false
function openWelcome() {
    if (window.localStorage.getItem("new") === null) {
        // remove class hidden from welcomepage id and add flex to welcomepage id
        document.getElementById("welcomepage").classList.remove("hidden");
        window.localStorage.setItem("new", false);
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    try {
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    } 
    catch(err) {
        alert(err.message)
    }
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

const getPackageJSON = async() => {
    return await (await fetch("../package.json")).json();
};

function openFeedback() {
    createTab('https://github.com/JaydenDev/Catalyst/issues/new')
}

function openGithub() {
    createTab('https://github.com/JaydenDev/Catalyst')
}

function openDocs() {
    createTab('https://getcatalyst.eu.org/docs')
}

function clearData() {
    if (!confirm("Are you sure you want to delete all preferences and bookmarks from Catalyst? \n   You will stay logged into all the websites you use!")) return;
    window.localStorage.clear();
    localStorage.setItem('ctlyststrppg', './home.html')
    window.close();
}

function inspectTab() {
    document.querySelector(".current").inspectElement(0, 0);
}

function invertTab() {
    view.insertCSS('html { filter: invert(100%); }')
    view.insertCSS("img { filter: invert(100%) !important} ")
}

openWelcome()