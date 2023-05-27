const { remote } = require('electron');
const path = require('path');

const dat = require(path.join(__dirname, '../package.json'),);

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#ver').innerText = 'v' + dat.version;
});


const { Titlebar } = require("custom-electron-titlebar");

window.addEventListener('DOMContentLoaded', () => {
    new Titlebar({
        icon: '../assets/icon.png',
        containerOverflow: 'hidden',
    })
});