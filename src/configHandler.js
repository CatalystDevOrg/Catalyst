const ctlystPreferenceBlur = document.querySelector('#pref-blur');

ctlystPreferenceBlur.addEventListener('change', () => {
    if (ctlystPreferenceBlur.checked) {
        localStorage.setItem('ctlystBlurDisabled', true);
        alert("Restart the browser to apply changes.");
    } else {
        localStorage.setItem('ctlystBlurDisabled', false);
        alert("Restart the browser to apply changes.");
    }
    }
);

// if ctlystBlurDisabled is set to true, set the blur checkbox to checked
if (localStorage.getItem('ctlystBlurDisabled') === 'true') {
    ctlystPreferenceBlur.checked = true;
}

// if ctlystBlurDisabled is set to false, set the blur checkbox to unchecked
if (localStorage.getItem('ctlystBlurDisabled') === 'false') {
    ctlystPreferenceBlur.checked = false;
}

// if localStorage value ctlystBlurDisabled is true, then run a function
function toggleBlur() {
if (localStorage.getItem('ctlystBlurDisabled') === 'true') {
    const blurredElements = document.querySelectorAll('.blurred');
    blurredElements.forEach(element => {
        element.classList.remove('blurred');
        element.classList.remove('backdrop-blur-md');
        
    });
}
}

console.log(localStorage.getItem('ctlystBlurDisabled'))
toggleBlur();