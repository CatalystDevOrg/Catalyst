// dependencies
strt = document.querySelector('#pref-strt');
reload = document.querySelector('#reload');
backward = document.querySelector('#back');
forward = document.querySelector('#forward');

document.getElementById('more-btn').addEventListener('click', () => {
    document.getElementById('more-menu').classList.toggle('hidden');
    document.querySelector('#more-btn').classList.toggle('bg-gray-400');
});

strt.addEventListener('change', () => {
    if (strt.value == 'default') {
        localStorage.setItem('ctlyststrppg', './home.html')
        return;
    }
    localStorage.setItem('ctlyststrppg', strt.value);
}   
);
strt.value = localStorage.getItem('ctlyststrppg');

reload.addEventListener('click', () => {
    document.querySelector('.current').reload();
});

forward.addEventListener('click', () => {
    document.querySelector('.current').goForward();
});

backward.addEventListener('click', () => {
    document.querySelector('.current').goBack();
});