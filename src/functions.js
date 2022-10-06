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

function reload() {
    document.querySelector(".current").reload();
}

function hideDevPop() {
    document.querySelector("#devPop").style.display = "none";
}

function openDocs() {
    createTab('https://getcatalyst.eu.org/docs')
}

function forward() {
    document.querySelector(".current").goForward();
}

function backward() {
    document.querySelector(".current").goBack();
}

function clearData() {
    if (!confirm("Are you sure you want to delete all preferences from Catalyst?")) return;
    window.localStorage.clear();
    window.close();
}

function inspectTab() {
    document.querySelector(".current").inspectElement(0, 0);
}