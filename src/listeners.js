// dependencies
strt = document.querySelector('#pref-strt');
reload = document.querySelector('#reload');
backward = document.querySelector('#back');
forward = document.querySelector('#forward');
find = document.querySelector('#find');
zoom = document.querySelector('#zoom');
sidebar = document.querySelector('#tgl-sidebar');

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
    document.querySelector('.current').setZoomFactor(parseInt(zoom.value));
});

sidebar.addEventListener('click', () => {
    toggleDisplay(document.getElementById('sidebar'));
});