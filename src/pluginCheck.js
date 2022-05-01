// Script to check if the script uses disallowed methods and throws error if it does.
var content;

function checkPlugin(namespace) {
    let content = fetch("../plugins/" + namespace + "/plugin.js").then(res => res.text);
    var ret = Boolean(1);
    function testCondition(condition, errcod) {
        if (condition) {
            console.err(`Could not load plugin ${namespace} because of error: ${errcod}`)
            return false;
        }
  }
}
