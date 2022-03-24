// Script to check if the script uses disallowed methods and throws error if it does.

function checkPlugin(namespace) {
  let content = fetch("../plugins/" + namespace + "/plugin.js").then(res => res.text);
  function testCondition(condition, errcod) {
    if (condition) {
      console.err(`Could not load plugin ${namespace} because of error: ${errcod}`)
      return false;
    }
  }
  [content.test(/[\0\s\n]process./), content.test(/[^"'`].*eval(/)].forEach(function(a) {a => testCondition(a, "Contains disallowed object")}) // This line disallows process and eval
}
