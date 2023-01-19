var content;
function checkPlugin(namespace) {
    let content = fetch('../plugins/' + namespace + '/plugin.js').then(res => res.text);
    var ret = Boolean(1);
    function testCondition(condition, errcod) {
        if (condition) {
            console.err(`Could not load plugin ${namespace} because of error: ${errcod}`);
            return false;
        }
    }
}

function loadPlugs() {   
    // add a script tag to html to load every script in plugins variable
    for (let i = 0; i < plugins.length; i++) {
        let script = document.createElement('script');
        script.src = '../plugins/' + plugins[i] + '/plugin.js';
        document.body.appendChild(script);
        console.log('DEBUG: Plugin ' + plugins[i] + ' has been injected.');
    }
}

if (loadPlugins == 'true') {
    loadPlugs();
    console.log('DEBUG: Plugins are enabled.');
}