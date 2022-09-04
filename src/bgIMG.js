document.getElementById("pref-bg").value = localStorage.getItem('bgImage')
document.body.style.backgroundImage = "url(" + bgImage + ")"

function savePref() {
    var bgImage = document.getElementById('pref-bg').value;
    localStorage.getItem('bgImage')
    localStorage.setItem('bgImage', bgImage)
    console.log("DEBUG: bgImage value saved!")
    document.body.style.backgroundImage = "url(" + bgImage + ")"
}