// add startup code here



// dont touch this, it makes the loading screen work
setTimeout(() => {
    byId('loading').classList.add('opacity-0');
    setTimeout(() => {
        byId('loading').style.display = 'none';
    }, 500);
}, 1000);