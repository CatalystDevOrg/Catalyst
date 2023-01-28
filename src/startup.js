// add startup code here
// dont touch this, it makes the loading screen work
setTimeout(() => {
    document.getElementById('loading').classList.add('opacity-0');
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 500);
}, 1000);

if (!localStorage.getItem('home-postfix')) {
    var ctlyststrppg = './home.html';
    localStorage.setItem('home-postfix', 'true');
}

if (localStorage.getItem('bookmarks') < 1) {
    document.querySelector('#bookmarks').innerText = 'When you add bookmarks they will appear here!';
}