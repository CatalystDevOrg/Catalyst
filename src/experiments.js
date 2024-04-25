let experiments = {
    defaults: {
        forcedDarkMode: {
            enable: false
        }
    }
}

let experimentalFeatures = experiments.defaults;


if (localStorage.getItem('experiments')) {
    let experimentalFeatures = localStorage.getItem('experiments')
}