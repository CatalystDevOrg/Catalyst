// add startup code here
// dont touch this, it makes the loading screen work
setTimeout(() => {
    document.getElementById('loading').classList.add('opacity-0');
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 50);
}, 200);

