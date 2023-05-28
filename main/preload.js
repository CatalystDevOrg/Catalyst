const { remote } = require('electron');
const path = require('path');

const dat = require(path.join(__dirname, '../package.json'),);

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#ver').innerText = 'v' + dat.version;
});
