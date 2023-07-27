const path = require('path');
const { Titlebar } = require('custom-electron-titlebar');
const { ipcRenderer, contextBridge, app } = require('electron');

const dat = require(path.join(__dirname, '../package.json'),);

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ver').innerText = 'v' + dat.version;
    document.getElementById('pref-ver').innerText = 'v' + dat.version;
    new Titlebar();
});

contextBridge.exposeInMainWorld('cat', {
    loadExt: (ext) => {
        ipcRenderer.invoke('loadExt', ext);
    },
    loadCustomStyles: () => {
        const file = ipcRenderer.invoke('read-user-data', 'userChrome.css').then(
            result => {
                let el = document.createElement('style');
                el.type = 'text/css';
                el.innerText = result;
                document.head.appendChild(el);
            }
        );
    },
    enableAdBlocker: () => ipcRenderer.invoke('enable-ad-blocker'),
    addToHistory: (title, url) => ipcRenderer.invoke('write-to-history')
});

