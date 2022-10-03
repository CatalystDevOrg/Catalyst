strt = document.querySelector('#pref-strt')
strt.addEventListener('change', () => {
    localStorage.setItem('ctlyststrppg', strt.value)
}   
);
strt.value = localStorage.getItem('ctlyststrppg');