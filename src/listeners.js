// dependencies
strt = document.querySelector('#pref-strt')

document.getElementById("more-btn").addEventListener("click", () => {
    document.getElementById("more-menu").classList.toggle("hidden");
    document.querySelector('#more-btn').classList.toggle("bg-blue-400")
});

strt.addEventListener('change', () => {
    localStorage.setItem('ctlyststrppg', strt.value)
}   
);
strt.value = localStorage.getItem('ctlyststrppg');

