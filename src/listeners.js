/* eslint-disable no-redeclare */
const strt = document.querySelector('#pref-strt');
const reload = document.querySelector('#reload');
const backward = document.querySelector('#back');
const forward = document.querySelector('#forward');
const find = document.querySelector('#find');
const zoom = document.querySelector('#zoom');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.querySelector('#tgl-sidebar');
const lang = document.getElementById('lang');
const anicontent = document.getElementById('pref-anicontent');

document.getElementById('more-btn').addEventListener('click', () => {
    toggleDisplay(document.getElementById('more-menu'));
    document.querySelector('#more-btn').classList.toggle('bg-indigo-400');
});

reload.addEventListener('click', () => {
    document.querySelector('.current').reload();
});

forward.addEventListener('click', () => {
    document.querySelector('.current').goForward();
});

backward.addEventListener('click', () => {
    document.querySelector('.current').goBack();
});

find.addEventListener('input', (event) => {
    if (find.value !== '') {
        document.querySelector('.current').findInPage(find.value);
    } else {
        document.querySelector('.current').stopFindInPage('clearSelection');
    }
});

zoom.addEventListener('input', (event) => {
    document.querySelector('.current').setZoomFactor(parseFloat(zoom.value / 100));
});

sidebarToggle.addEventListener('click', () => {
    toggleDisplay(document.getElementById('sidebar'));
});

lang.addEventListener('change', () => {
    createModal('Restart required', 'A restart is required to change languages.');
});

anicontent.addEventListener('change', () => {
    createModal('Restart required', 'This change requires a restart.');
});

document.getElementById('sideBarWikipediaShortcut').addEventListener('click', () => {
    openInSidebar('https://wikipedia.org');
});

document.getElementById('calculatorShortcut').addEventListener('click', () => {
    openInSidebar('https://duckduckgo.com/?q=calculator&ia=calculator');
});