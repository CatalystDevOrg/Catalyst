async function getPlugins() {
    return await cat.getPlugins();
}

getPlugins().then(plugins => console.log(plugins));