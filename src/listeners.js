bkmrk.addEventListener('click', () => {
    toggleBookmarks();
    console.log('t');
});

document.getElementById('more-btn').addEventListener('click', () => {
    document.getElementById('more-menu').classList.toggle('hidden');
    document.querySelector('#more-btn').classList.toggle('bg-gray-400');
});

strt.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        if (strt.value.includes('\'') || strt.value.includes('"')) {
            alert('Invalid characters. Must not contain quotes!');
            return;
        }
        if (strt.value == 'default') {
            localStorage.setItem('ctlyststrppg', './home.html');
            return;
        }
        localStorage.setItem('ctlyststrppg', strt.value);
        alert('Browser must be restarted to complete change.');
    }}
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