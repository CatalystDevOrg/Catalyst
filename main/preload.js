const { remote } = require('electron');
const path = require('path');

const dat = require(path.join(__dirname, '../package.json'),);

window.addEventListener('DOMContentLoaded', () => {
    version = dat.version.substring(0, 5)
    document.querySelector('#ver').innerText = 'v' + version;
});
