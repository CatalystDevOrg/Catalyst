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

if (localStorage.getItem('ctlystLogging') === 'true') {
console.log(localStorage.getItem('ctlystBlurDisabled'))
}

toggleBlur();

const ctlystPreferenceLogging = document.querySelector('#pref-logging');

ctlystPreferenceLogging.addEventListener('change', () => {
    if (ctlystPreferenceLogging.checked) {
        localStorage.setItem('ctlystLogging', true);
        alert("Restart the browser to apply changes.");
    } else {
        localStorage.setItem('ctlystLogging', false);
        alert("Restart the browser to apply changes.");
    }
    }
);

// if ctlystLogging is set to true, set the blur checkbox to checked
if (localStorage.getItem('ctlystLogging') === 'true') {
    let enableLogging = true
    ctlystPreferenceLogging.checked = true;
}

// if ctlystLogging is set to false, set the blur checkbox to unchecked
if (localStorage.getItem('ctlystLogging') === 'false') {
    let enableLogging = false
    ctlystPreferenceLogging.checked = false;
}
